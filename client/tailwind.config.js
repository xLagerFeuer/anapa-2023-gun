import colors from "tailwindcss/colors.js";
import svgr from "vite-plugin-svgr"

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
                "primary": {light: "#9CA3AF", dark: "#374151", base: "#D1D5DB"},
                "bg": {primary: "#323232", navbar: "#1C1D17", tab: "#3C3C42"}
            }
        },
    },
    plugins: [require('flowbite/plugin')],
}