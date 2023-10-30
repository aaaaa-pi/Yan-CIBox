import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),  
    ElementPlus({
      useSource: true,
    }),
  ],
  resolve: {
    alias:{
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3200/',
        changeOrigin: true,
        rewrite: path => {
          return path.replace(/^\/api/,'')
        }
      },
      '/jenkins': {
        target: 'http://localhost:3200',
        changeOrigin: true
      }
    }
  }
})
