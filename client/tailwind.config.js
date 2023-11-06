import colors from "tailwindcss/colors.js";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                "primary": {light: colors.blue[500], dark: colors.blue[700], base: colors.blue[600]}
            }
        },
    },
    plugins: [require('flowbite/plugin')],
}