import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Dev server (solo para desarrollo local con Docker)
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  // Build de produccion: base '/' para que los assets
  // sean servidos desde la raiz por Apache
  base: '/',
})
