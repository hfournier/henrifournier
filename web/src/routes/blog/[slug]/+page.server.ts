import client from '$lib/server/sanityClient';
import { fail } from '@sveltejs/kit';
import type { Post } from '../model';
import type { Comment } from '../model';

export const load = async (event) => {
	const { slug } = event.params;

	const fetchPost = async (slug) => {
		const post = await client.fetch<Post>(`
		*[
			_type == "post" && 
            slug.current == "${slug}"
		][0]
		{ 
			author->{_id, name, title, bio, image, slug}, 
			categories[]->{_id, title}, 
			_id, body, excerpt, publishedAt, slug, title,
			"headings": body[length(style) == 2 && string::startsWith(style, "h")],
			"related": *[_type == "post" && 
					     slug.current != "${slug}" && 
						 count(categories[@._ref in ^.^.categories[]._ref]) > 0] | 
						 order(matchCount desc, publishedAt desc, _createdAt desc) [0..9] {
				title,
				slug,
				"matchCount": count(categories[@._ref in ^.^.categories[]._ref]),
			  },
			  "commentCount": count(*[_type == "comment" && status == "approved" && references(^._id)])
		}
		`);

		// console.log(post);
		return post;
	};

	return { post: fetchPost(slug) };
};

const fetchComments = async (slug) => {
	const comments = await client.fetch<Comment[]>(`
	*[
		_type == "comment" &&
		status == "approved" &&
		references(*[ _type == "post" && slug.current == "${slug}" ][0]._id)
	] | order(_createdAt desc)
	{
		name,
		email,
		comment,
		"createdAt": _createdAt,
		replies
	}
	`);

	return { comments };
};

export const actions = {
	showComments: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const slug = formData['btnComment']?.toString();

		const comments = await fetchComments(slug);

		return { success: true, status: 200, action: 'fetch', ...comments };
	},
	addComment: async ({ request, fetch }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			const slug = formData['btnAddComment']?.toString();

			const response = await fetch('/api/comment', {
				method: 'post',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.status === 200) {
				const comments = await fetchComments(slug);
				return { success: true, status: 200, action: 'add', ...comments };
			} else {
				const result = await response.json();
				console.log('Result: ', result);
				return fail(response.status, { action: 'add', error: result });
			}
		} catch (error) {
			console.log(error);
		}
	}
};
