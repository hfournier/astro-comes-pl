import { z, type SchemaContext } from "astro:content"

const defaultOgImage = "@assets/seo-default-opengraph-image.png"
const defaultTwitterImage = "@assets/seo-default-twitter-image.png"

export const seoSchema = ({ image }: SchemaContext) =>
	z.object({
		title: z.string().max(60, { message: "Should be 60 or fewer characters long" }).optional(),
		description: z
			.string()
			.max(160, { message: "Should be 160 or fewer characters long" })
			.optional(),
		charset: z.string().optional(),
		canonical: z.string().url().optional(),
		nofollow: z.boolean().default(false).optional(),
		noindex: z.boolean().default(false).optional(),
		openGraph: z
			.object({
				title: z.string(),
				type: z.string(),
				url: z.string().url(),
				image: z
					.preprocess((val) => (val ? val : defaultOgImage), image())
					.refine((im: ImageMetadata) => im.height >= 200 && im.width >= 200, {
						message: "The minimum allowed Open Graph image dimension is 200 x 200 pixels"
					}),
				imageAlt: z.string().optional(),
				optional: ogOptionalSchema.optional(),
				audio: ogAudioSchema.optional(),
				video: ogVideoSchema.optional(),
				article: articleSchema.optional(),
				book: bookSchema.optional(),
				musicAlbum: musicAlbumSchema.optional(),
				musicPlaylist: musicPlaylistSchema.optional(),
				musicRadioStation: musicRadioStationSchema.optional(),
				musicSong: musicSongSchema.optional(),
				profile: profileSchema.optional(),
				videoEpisode: videoEpisodeSchema.optional(),
				videoMovie: videoMovieSchema.optional(),
				videoOther: videoMovieSchema.optional(),
				videoTvShow: videoMovieSchema.optional()
			})
			.optional(),
		twitter: twitterSchema({ image }).optional()
	})

export const articleSchema = z.object({
	publishedTime: z.date().or(z.string()).optional(),
	modifiedTime: z.date().or(z.string()).optional(),
	expirationTime: z.date().or(z.string()).optional(),
	publisher: z
		.string()
		.url()
		.refine((url) => url.startsWith("https://www.facebook.com/"), {
			message: "article:publisher should link to a Facebook page"
		})
		.optional(),
	authors: z.array(z.string().url()).optional(),
	tags: z.array(z.string()).optional()
})

export const bookSchema = z.object({
	releaseDate: z.date().or(z.string()).optional(),
	authors: z.array(z.string()).optional(),
	isbn: z.string().optional(),
	tags: z.array(z.string()).optional()
})

export const musicAlbumSchema = z.object({
	songs: z
		.array(
			z.object({
				url: z.string().url(),
				disc: z.number().optional(),
				track: z.number().optional(),
				musicians: z.array(z.string().url()).optional()
			})
		)
		.optional(),
	releaseDate: z.date().or(z.string()).optional()
})

export const musicPlaylistSchema = z.object({
	songs: z
		.array(
			z.object({
				url: z.string().url(),
				disc: z.number().optional(),
				track: z.number().optional()
			})
		)
		.optional(),
	creator: z.string().url().optional()
})

export const musicRadioStationSchema = z.object({
	creator: z.string().url().optional()
})

export const musicSongSchema = z.object({
	duration: z.number().optional(),
	albums: z
		.array(
			z.object({
				url: z.string().url(),
				disc: z.number().optional(),
				track: z.number().optional()
			})
		)
		.optional(),
	musicians: z.array(z.string().url()).optional()
})

export const ogAudioSchema = z.object({
	url: z.string().url().optional(),
	mimeType: z.string().optional()
})

// determiner: z.enum(["a", "an", "the", "", "auto"])
export const ogOptionalSchema = z.object({
	description: z.string().optional(),
	determiner: z
		.union([z.literal("a"), z.literal("an"), z.literal("the"), z.literal(""), z.literal("auto")])
		.default("")
		.optional(),
	locale: z.string().default("en_US").optional(),
	localeAlternates: z.array(z.string()).optional(),
	siteName: z.string().optional()
})

export const ogVideoSchema = z.object({
	url: z.string().url().optional(),
	mimeType: z.string().optional(),
	height: z.number().optional(),
	width: z.number().optional()
})

export const profileSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	username: z.string().optional()
})

// card: z.enum(["summary", "summary_large_image", "app", "player"])
export const twitterSchema = ({ image }: SchemaContext) =>
	z
		.object({
			card: z.union([
				z.literal("summary"),
				z.literal("summary_large_image"),
				z.literal("app"),
				z.literal("player")
			]),
			site: z
				.string()
				.refine((s) => s.startsWith("@"), {
					message:
						'twitter:site must start with an "@". @username for the website used in the card footer.'
				})
				.optional(),
			creator: z
				.string()
				.refine((c) => c.startsWith("@"), {
					message:
						'twitter:creator must start with an "@". @username for the content creator / author.'
				})
				.optional(),
			title: z.string().optional(),
			description: z.string().optional(),
			image: z.preprocess((val) => (val ? val : defaultTwitterImage), image()).optional(),
			imageAlt: z.string().optional()
		})
		.superRefine((twitter, ctx) => {
			if (
				twitter.card === "summary" &&
				twitter.image &&
				(twitter.image.height! < 144 || twitter.image.width! < 144)
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					minimum: 144,
					type: "number",
					inclusive: true,
					message: `For a "${twitter.card}" twitter.card, the minimum allowed twitter.image dimension is 144 x 144 pixels`
				})
			}
			if (
				twitter.card === "summary_large_image" &&
				twitter.image &&
				(twitter.image.height! < 157 || twitter.image.width! < 300)
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					minimum: 157,
					type: "number",
					inclusive: true,
					message: `For a "${twitter.card}" twitter.card, the minimum allowed twitter.image dimension is 300 x 157 pixels`
				})
			}
		})

export const videoMovieSchema = z.object({
	releaseDate: z.date().or(z.string()).optional(),
	duration: z.number().optional(),
	actors: z
		.array(
			z.object({
				profile: z.string().url(),
				role: z.string().optional()
			})
		)
		.optional(),
	directors: z.array(z.string().url()).optional(),
	writers: z.array(z.string().url()).optional(),
	tags: z.array(z.string()).optional()
})

export const videoEpisodeSchema = videoMovieSchema.extend({
	series: z.string().url().optional()
})
