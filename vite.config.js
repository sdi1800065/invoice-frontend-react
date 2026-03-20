import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../Invoice-Backend/dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/admin': {
        target: 'http://localhost:3000',
        // Only proxy XHR/fetch API calls to /admin/*, not the SPA page load
        bypass(req) {
          // Browser page navigation → let Vite serve the React SPA
          if (req.headers.accept?.includes('text/html')) {
            return '/index.html'
          }
        },
      },
      '/webhook': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
    },
  },
})
