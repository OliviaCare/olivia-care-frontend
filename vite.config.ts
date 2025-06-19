import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['olivia-logo.svg', 'olivia-icon-192.png', 'olivia-icon-512.png'],
      manifest: {
        name: 'Olivia - Bienestar en la Menopausia',
        short_name: 'Olivia',
        description: 'Tu compañera holística para una menopausia plena y saludable',
        theme_color: '#5f5ff6',
        icons: [
          {
            src: '/olivia-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/olivia-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});