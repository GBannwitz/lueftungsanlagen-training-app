import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    mdx(),
    tsconfigPaths(), // <- wichtig: löst "@/..." aus tsconfig.json auf
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Lüftungsanlagen Training',
        short_name: 'Lueftung',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#22c55e',
        icons: [
          { src: '/assets/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/assets/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
