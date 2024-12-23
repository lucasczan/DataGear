import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				blue: {
					500: "#2188FF",
					700: "#17192D",
					900: "#023B78",
				},
				gray: {
					150: "#E3EAEF",
					600: "#77818C",
				},
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	plugins: [],
} satisfies Config;
