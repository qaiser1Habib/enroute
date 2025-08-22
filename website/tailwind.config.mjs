/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				body: ["Quicksand", "ui-sans-serif", "system-ui"],
			},
			colors: {
				primary: "#A2D8C3",
				secondary: "#00B0D7",
				success: "#FF6A5D",
				dark: {
					100: "#2c2d31",
					200: "#313035",
					300: "#35363A",
					400: "#494b51",
				},
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				infiniteSpin: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				shake: {
					"10%, 90%": {
						transform: "translate3d(-1px, 0, 0)",
					},
					"20%, 80%": {
						transform: "translate3d(2px, 0, 0)",
					},
					"30%, 50%, 70%": {
						transform: "translate3d(-4px, 0, 0)",
					},
					"40%, 60%": {
						transform: "translate3d(4px, 0, 0)",
					},
				},   scroll: {
               "0%": { transform: "translateX(0)" },
               "100%": { transform: "translateX(-50%)" },
            },
			},
			animation: {
				fadeIn: "fadeIn 0.5s ease-in-out forwards",
				infiniteSpin: "infiniteSpin 3s linear infinite",
				shake: "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
				scroll: "scroll 60s linear infinite",
				"scroll-reverse": "scroll 60s linear infinite reverse",
			},
		},
		container: {
			center: true,
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1200px",
			"2xl": "1320px",
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities(
				{
					".scrollbar-hide": {
						"&::-webkit-scrollbar": { display: "none" },
						"-ms-overflow-style": "none",
						"scrollbar-width": "none",
					},
					".scrollbar-webkit": {
						"&::-webkit-scrollbar": { width: "8px" },
						"&::-webkit-scrollbar-track": {
							background: "rgb(189,189,189)",
							borderRadius: "20px",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: "rgb(124 125 126)",
							borderRadius: "20px",
							border: "1px solid white",
						},
					},
				},
				["responsive", "hover"]
			);
		}),
	],
};
