/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
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
                    background: "#DFF0D8",
                    text: "#3C763D",
                    border: "#D6E9C6",
                },
                error: {
                    background: "#F2DEDE",
                    text: "#A94442",
                    border: "#EBCCD1",
                },
                info: {
                    background: "#D9EDF7",
                    text: "#31708F",
                    border: "#BCE8F1",
                },
            },
            keyframes: {
                fadeInOut: {
                    "0%, 100%": { opacity: 0 },
                    "10%, 80%": { opacity: 1 },
                },
            },
            animation: {
                fadeInOut: "fadeInOut 5.5s ease-in-out forwards",
            },
            backgroundImage: {
                'sign-in-hero': "url('/signin-hero.jpg')",
                'sign-up-hero': "url('/signup-hero.jpg')",
            }
        },
    },
    plugins: [],
};