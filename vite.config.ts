/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      assets: resolve('src/assets'),
      common: resolve('src/common'),
      layouts: resolve('src/layouts'),
      pages: resolve('src/pages'),
      types: resolve('src/types'),
    },
  },
  test: {
    globals: true,
  },
  plugins: [react(), svgr()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react-dom', 'react', 'react-router-dom'],
          firebase: ['firebase/auth', 'firebase/firestore'],
        },
      },
    },
  },
})
