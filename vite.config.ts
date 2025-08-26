import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

// BASE für GitHub Pages (kommt aus Actions: VITE_BASE=/lueftungsanlagen-training-app/)
const base = process.env.VITE_BASE || '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    mdx(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Lüftungsanlagen Training',
        short_name: 'Lueftung',
        start_url: base,               // wichtig für Pages
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#22c55e',
        icons: [
          { src: `${base}assets/icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${base}assets/icons/icon-512.png`, sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
