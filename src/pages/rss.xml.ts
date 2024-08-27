import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIContext } from "astro"
import { SITE_DESCRIPTION, SITE_TITLE } from "src/consts"

export async function GET(context: APIContext) {
	const collections = await getCollection("blogs")
	return rss({
		title: `${SITE_TITLE}`,
		description: `${SITE_DESCRIPTION}`,
		site: context.site as URL,
		items: collections.flat().map((collection) => ({
			title: collection.data.title,
			pubDate: collection.data.createdAt,
			description: collection.data.description,
			link: `/${collection.collection}/${collection.slug}/`
		})),
		// ex. use your stylesheet from "public/rss/styles.xsl"
		stylesheet: "/rss/styles.xsl"
	})
}
