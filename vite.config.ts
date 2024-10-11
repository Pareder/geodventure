/// <reference types="vitest" />

import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  plugins: [react()],
})
