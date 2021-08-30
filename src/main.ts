import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-plus'
import store from './store'

// import 'element-plus/lib/theme-chalk/index.css'//注意这里要引css文件！
createApp(App).use(router).use(store).mount('#app')


//注册serviceWorker并处理兼容性问题：
// if('serviceWorker' in navigator){
//   window.addEventListener('load',()=>{//全局加载后注册
//     navigator.serviceWorker.register('/service-worker.js')
//     .then(()=>{
//       console.log('sw注册成功了')
//     })
//     .catch(()=>{
//       console.log('sw注册失败了')
//     })
//   })
// }