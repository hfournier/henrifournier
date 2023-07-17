import sanityClient from '@sanity/client';
import { env } from '$env/dynamic/private';

const client = sanityClient({
	projectId: env.SANITY_PROJECT_ID,
	dataset: env.SANITY_DATASET,
	apiVersion: '2022-10-17', // use current UTC date - see "specifying API version"!
	token: env.SANITY_BLOG_VIEWER_TOKEN,
	useCdn: true
});

export default client;
