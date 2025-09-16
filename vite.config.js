import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/blog-app/',  // ← aapke repo name ke hisab se
  plugins: [react()],
})
