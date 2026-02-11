/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'huma-blue': '#005b96',
                'huma-light': '#6497b1',
                'huma-accent': '#b3cde0', // Keeping accent as it's useful, but prioritizing requested ones
            },
        },
    },
    plugins: [],
}
