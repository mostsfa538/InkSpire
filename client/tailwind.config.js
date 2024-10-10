/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#fee3c3",
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
            backgroundImage: {
                'sign-in-hero': "url('/signin-hero.jpg')",
            }
        },
    },
    plugins: [],
};