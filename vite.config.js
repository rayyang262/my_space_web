import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/my_space_web/',
  server: {
    // App + assets use base `/my_space_web/` — open this path so the intro video URL resolves.
    open: '/my_space_web/',
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
    },
  },
})
