import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
import svgx from "@svgx/vite-plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgx(), react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
})
