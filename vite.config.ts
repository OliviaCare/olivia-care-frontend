import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['maia-icon.svg', 'maia-logo.svg', 'maia-logo-white.svg'],
      manifest: {
        name: 'Maia - Bienestar en la Menopausia',
        short_name: 'Maia',
        description: 'Tu compañera holística para una menopausia plena y saludable',
        theme_color: '#5f5ff6',
        icons: [
          {
            src: '/maia-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});