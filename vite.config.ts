import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
      {
        find: "@components",
        replacement: "./src/components",
      },
    ],
  },
})
