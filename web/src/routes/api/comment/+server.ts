import { env } from '$env/dynamic/private';

export const POST = async ({ request, fetch }) => {
	const data = await request.json();

	try {
		const mutations = [
			{
				create: {
					_type: 'comment',
					name: data.name,
					email: data.email,
					comment: data.comment,
					status: 'pending',
					post: { _type: 'reference', _ref: data.postId }
				}
			}
		];

		const response = await fetch(
			`https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${env.SANITY_DATASET}`,
			{
				method: 'post',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${env.SANITY_BLOG_EDITOR_TOKEN}`
				},
				body: JSON.stringify({ mutations })
			}
		);

		const result = await response.json();
		return new Response(JSON.stringify(result), {
			status: response.status,
			statusText: response.statusText
		});
	} catch (error) {
		console.log('Error adding comment: ', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
};
