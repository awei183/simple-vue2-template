import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { viteMockServe } from 'vite-plugin-mock'

import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    svgLoader(),
    viteMockServe({
      mockPath: 'mock',
      watchFiles: true,
      enable: true,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: process.env.API_SERVER || 'http://localhost:8080',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
