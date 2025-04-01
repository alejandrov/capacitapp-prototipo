import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/capacitapp-prototipo/', // Add this line (use your repository name)
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      injectManifest: {
        injectionPoint: undefined,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'CapacitApp',
        short_name: 'CapacitApp',
        description: 'Aplicación de capacitación y aprendizaje',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icono.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: 'icono.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icono.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icono.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});