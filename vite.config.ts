import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// https://vitejs.dev/config/
 
export default defineConfig({
  plugins: [vue()],
  build:{
    chunkSizeWarningLimit:1500,
  },
  resolve: {
  alias:{
    'src': resolve(__dirname, './src'),
    'components':resolve(__dirname, './src/components'),
    'store':resolve(__dirname, './src/store'),
    'assets':resolve(__dirname, './src/assets'),
    'views':resolve(__dirname, './src/views'),
  }},
  server:{
    host:'0.0.0.0',
    port:4000,
    open:false,
  
  }
})

