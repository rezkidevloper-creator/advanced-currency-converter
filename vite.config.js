import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/advanced-currency-converter/', // مهم للنشر على GitHub Pages
  plugins: [react()],
  server: {
    proxy: {
      // proxy for CoinGecko to avoid CORS issues during development
      '/api/crypto': {
        target: 'https://api.coingecko.com/api/v3',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/crypto/, '')
      },
      // proxy for open.er-api just in case (optional)
      '/api/fiat': {
        target: 'https://open.er-api.com/v6',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/fiat/, '')
      }
    }
  }
})

