import { defineCollection, reference, z, type SchemaContext } from "astro:content"
import { seoSchema } from "@components/seo/seo"

const authorSchema = ({ image }: SchemaContext) =>
	z.object({
		wpId: z.number(),
		name: z.string(),
		url: z.string().optional(),
		description: z.string(),
		link: z.string().url().optional(),
		slug: z.string().optional(),
		avatar_urls: z
			.object({
				24: z.string().url(),
				48: z.string().url(),
				96: z.string().url()
			})
			.optional(),
		seo: seoSchema({ image }).optional()
	})

export const blogSchema = ({ image }: SchemaContext) =>
	z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		type: z.string(),
		createdAt: z.date(),
		modifiedAt: z.date(),
		author: reference("authors").optional(),
		authorId: z.number().optional(),
		categories: z.array(reference("categories")).optional(),
		categoryIds: z.array(z.number()).optional(),
		tags: z.array(reference("tags")).optional(),
		tagIds: z.array(z.number()).optional(),
		featuredMedia: z
			.object({
				id: z.number(),
				src: image(),
				alt: z.string(),
				caption: z.string().optional()
			})
			.optional(),
		seo: seoSchema({ image }).optional()
	})

const blogTypeSchema = ({ image }: SchemaContext) =>
	z.object({
		name: z.string(),
		description: z.string(),
		collectionName: z.string(),
		slug: z.string(),
		seo: seoSchema({ image }).optional()
	})

const categorySchema = ({ image }: SchemaContext) =>
	z.object({
		wpId: z.number(),
		count: z.number(),
		name: z.string(),
		description: z.string(),
		slug: z.string().optional(),
		seo: seoSchema({ image }).optional()
	})

const pageSchema = ({ image }: SchemaContext) =>
	z.object({
		wpId: z.number(),
		name: z.string(),
		description: z.string(),
		slug: z.string(),
		featuredMedia: z
			.object({
				id: z.number(),
				src: image(),
				alt: z.string(),
				caption: z.string().optional()
			})
			.optional(),
		seo: seoSchema({ image }).optional()
	})

const tagSchema = z.object({
	wpId: z.number(),
	count: z.number(),
	name: z.string(),
	description: z.string().optional(),
	slug: z.string().optional()
})

const authorsCollection = defineCollection({
	type: "data", // v2.5.0 and later
	schema: authorSchema
})

const blogsCollection = defineCollection({
	type: "content", // v2.5.0 and later
	schema: blogSchema
})

const blogTypesCollection = defineCollection({
	type: "data", // v2.5.0 and later
	schema: blogTypeSchema
})

const categoriesCollection = defineCollection({
	type: "data", // v2.5.0 and later
	schema: categorySchema
})

const pagesCollection = defineCollection({
	type: "data", // v2.5.0 and later
	schema: pageSchema
})

const tagsCollection = defineCollection({
	type: "data", // v2.5.0 and later
	schema: tagSchema
})

export const collections = {
	authors: authorsCollection,
	blogs: blogsCollection,
	blog_types: blogTypesCollection,
	categories: categoriesCollection,
	pages: pagesCollection,
	tags: tagsCollection
}
