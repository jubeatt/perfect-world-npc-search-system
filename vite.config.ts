import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/perfect-world-npc-search-system/',
  plugins: [react()],
  server: {
    host: true
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  }
})
