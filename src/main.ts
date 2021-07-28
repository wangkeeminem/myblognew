import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-plus'
import store from './store'
// import 'element-plus/lib/theme-chalk/index.css'//注意这里要引css文件！
createApp(App).use(router).use(store).mount('#app')
