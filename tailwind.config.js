/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/frontend/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/frontend/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/frontend/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
};