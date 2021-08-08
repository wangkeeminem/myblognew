import {createRouter,createWebHistory} from 'vue-router'
const Home = () => import('../views/home/Home.vue')
// import Home  from '../views/home/Home.vue'
const Js = () => import('../views/js/Js.vue')
const Vue = () => import('../views/vue/Vue.vue')
const Other = () => import('../views/other/Other.vue')
const Fragment = () => import('../views/fragment/Fragment.vue')
const Comments = () => import('../views/comments/Comments.vue')
// import Comments from '../views/comments/Comments.vue'
const BlogMap = () => import('../views/blogmap/BlogMap.vue')
const Yourspace = () => import('../views/yourspace/Yourspace.vue')
const YourEditSpace = () => import('../views/yourEditSpace/YourEditSpace.vue')

const Myspace = () => import('../views/myspace/Myspace.vue')
const Search = () =>import ('../views/search/Search.vue')
const VideoView = ()=>import('../views/video/VideoView.vue')

const routes = [  
  {path:'/',redirect:'/home'},
  {path:'/home',component:Home},
  // {path:'/js',component:Home},
  {path:'/js',component:Js},
  {path:'/vue',component:Vue},
  {path:'/other',component:Other},
  {path:'/fragment',component:Fragment},
  {path:'/comments',component:Comments},
  {path:'/BlogMap',component:BlogMap},
  {path:'/Yourspace',component:Yourspace},
  {path:'/YourEditSpace',component:YourEditSpace},
  {path:'/Myspace',component:Myspace},
  {path:'/search',component:Search},
  {path:'/video',component:VideoView,name:'video'},

] 

const router = createRouter ({
  history:createWebHistory(),
  // history:createWebHashHistory(),
  routes,
})
export default router