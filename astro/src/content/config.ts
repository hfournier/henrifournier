import { z, defineCollection } from "astro:content"

const blogCollection = defineCollection({
	type: "content", // v2.5.0 and later
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).optional(),
		image: z.string().optional()
	})
})

const workCollection = defineCollection({
	type: "content", // v2.5.0 and later
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			description: z.string(),
			link: z.string().url(),
			image: image(),
			imageAlt: z.string(),
			services: z.array(z.string()).optional(),
			tags: z.array(z.string()).optional()
		})
})

export const collections = {
	blog: blogCollection,
	work: workCollection
}
