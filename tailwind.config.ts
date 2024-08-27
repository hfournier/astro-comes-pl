/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,svg}"],
	theme: {
		extend: {
			animation: {
				fadeIn: "fade-in 200ms linear forwards",
				fadeOut: "fade-out 2000ms linear forwards",
				launch: "flight 1s 1500ms ease-out forwards"
			},
			keyframes: {
				"fade-in": {
					to: { opacity: "1" }
				},
				"fade-out": {
					to: { opacity: "0" }
				},
				flight: {
					"25%": { opacity: 1 },
					"100%": { opacity: 1, transform: "scale(1) translateX(0) translateY(0)" }
				}
			}
		}
	},
	plugins: [require("@tailwindcss/typography")]
}
