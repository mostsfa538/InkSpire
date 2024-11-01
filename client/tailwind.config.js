/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					main: "#fee3c3",
					secondary: "#A18F7A",
				},
				secondary: "#83855e",
				tertiary: "#614941",
				success: {
					background: "#CEEAD6",
					text: "#34A853",
					border: "#FFEEBA",
				},
				warning: {
					background: "#FEEFC3",
					text: "#FBBC04",
					border: "#FFEEBA",
				},
				error: {
					background: "#FAD2CF",
					text: "#A50E0E",
					border: "#EA4335",
				},
				info: {
					background: "#D2E3FC",
					text: "#174EA6",
					border: "#4285F4",
				},
			},
			keyframes: {
				fadeInOut: {
					"0%, 100%": { opacity: 0 },
					"10%, 80%": { opacity: 1 },
				},
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				animateBackground: {
					to: { backgroundPosition: "-200% 0" },
				},
				blurIn: {
					"0%": { filter: "blur(10px)", opacity: 1 },
					"100%": { filter: "blur(0px)", opacity: 1 },
				},
				widthToFull: {
					"0%": { width: "0%" },
					"100%": { width: "100%" },
				},
				fadeInOutToTop: {
					"0%": { display: "none" },
					"10%%": { opacity: 0, transform: "translateY(0)" },
					"50%": { opacity: 1 },
					"90%": { opacity: 0, transform: "translateY(-100%)" },
					"100%": { display: "block" },
				},
			},
			animation: {
				fadeInOut: "fadeInOut 5.5s ease-in-out forwards",
				animateBackground: "animateBackground 20s linear infinite",
				blurIn: "blurIn 1s 2s ease-in-out forwards",
				fadeIn: "fadeIn 1s ease-in-out forwards",
				fadeInDelay: "fadeIn 1s 1s ease-in-out forwards",
				widthToFull: "widthToFull .5s ease-in-out forwards",
				notificationFadeInOut: "fadeInOutToTop 1.5s ease-in-out forwards",
			},
			backgroundImage: {
				"sign-in-hero": "url('/signin-hero.jpg')",
				"sign-up-hero": "url('/signup-hero.jpg')",
				"flower-pattern": "url('/pattern-flower.png')",
			},
		},
	},
	plugins: [],
};
