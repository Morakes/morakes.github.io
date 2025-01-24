import { fileURLToPath, URL } from 'node:url'
import { isProduction } from './build/env'
import { createVitePlugins } from './build/plugins'
import { defineConfig } from 'vite'
// import fs from 'node:fs'
// import path from 'node:path'

export default defineConfig({
  base: './',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    host: '0.0.0.0',
    port: 10086,
    // proxy: {
    //   '/api': {
    //     target: import.meta.env.VITE_API_BASE,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
    // https: {
    //   cert: fs.readFileSync(path.join(__dirname, './public/localhost+2.pem')),
    //   key: fs.readFileSync(path.join(__dirname, './public/localhost+2-key.pem')),
    // },
  },

  build: {
    // target: ['ios12'],
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        desktop: fileURLToPath(new URL('./desktop.html', import.meta.url)),
      },
    },
  },

  esbuild: {
    drop: isProduction() ? ['console', 'debugger'] : [],
  },

  plugins: createVitePlugins(),
})
