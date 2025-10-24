import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),tailwindcss()
  ],
  // setup post
  server: {
    open: true,
    port: 5174,
    host: true, 
  },
})
