import client from '$lib/server/sanityClient';
import type { Author, Category, Post } from './model';

export const load = async () => {
	const fetchPosts = async () => {
		const res = await client.fetch<Post[]>(`
		*[
			_type == "post"
		] | 
		order(publishedAt desc)
		{ 
			author->{_id, name, title, image, slug}, 
			categories[]->{_id, title}, 
			_id, body, excerpt, publishedAt, slug, title 
		}
		`);

		return res;
	};

	const fetchAuthors = async () => {
		const res = await client.fetch<Author[]>(`
		*[
			_type == "author"
		] | 
		order(name asc)
		`);

		return res;
	};

	const fetchCategories = async () => {
		const res = await client.fetch<Category[]>(`
		*[
			_type == "category"
		] | 
		order(title asc)
		`);

		return res;
	};

	return { posts: fetchPosts(), authors: fetchAuthors(), categories: fetchCategories() };
};

export const actions = {
	filterPosts: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		let filtering: string;
		let inputToggled: string;
		let authorFilter: string = null;
		let categoryFilter: string[] = [];

		Object.keys(formData).forEach((key) => {
			if (key.startsWith('btnA-') || key.startsWith('btnC-')) {
				if (key.startsWith('btnA-')) {
					inputToggled = formData[key].toString();
					filtering = 'Authors';
				} else {
					inputToggled = key.substring(5);
					filtering = 'Categories';
				}
			}
		});

		authorFilter = formData['rb-author']?.toString();
		if (filtering === 'Authors') {
			if (authorFilter === inputToggled) {
				authorFilter = null;
			} else {
				authorFilter = inputToggled;
			}
		}

		Object.keys(formData).forEach((key) => {
			if (key.startsWith('cb-')) {
				let value = formData[key];
				if (categoryFilter.indexOf(value.toString()) === -1) {
					categoryFilter.push(value.toString());
				} else {
					categoryFilter.splice(categoryFilter.indexOf(value.toString()), 1);
				}
			}
		});

		if (filtering === 'Categories') {
			if (categoryFilter.indexOf(inputToggled) === -1) {
				categoryFilter.push(inputToggled);
			} else {
				categoryFilter.splice(categoryFilter.indexOf(inputToggled), 1);
			}
		}

		return { success: true, status: 200, authorFilter, categoryFilter };
	}
};
