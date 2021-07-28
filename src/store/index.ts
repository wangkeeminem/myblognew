
import { createStore } from 'vuex'
// 创建一个新的 store 实例
import RootStateTypes  from './interface'

const store = createStore<RootStateTypes>({

  state:{
    headerChoice:0,
    loginClickable:true,
    registerClickable:true,
    registerVisible:true,
    userPermission:['主页','JS基础','Vue','其它','随笔','留言','个人空间'],
    userRouter:['home','js','vue','other','fragment','comments','yourspace'],
    
    //只负责打包统一上传服务端和跨组件清除界面（confirm发表的时候）,不需与页面的实时绑定
    title:'',//需传服务端article.tag
    details:{day:1,month:'Jan',year:2021,author:'未知'},//只负责打包统一上传服务端 不需要保留
    content:'',
    tagChoice:[false,false,false,false,false,false,false,false],//需传服务端article.tag

    articleMode:false,
    scrollPosition:0,
    
    searchContent:'',
    searchCount:0,
//设备类型
    deviceMode:'',
    //定义myedit组件的复用类型  默认为用户模式
   
  },
  mutations: {
    changeHeaderChoice(state,payload){//header点击    title点击  标签点击 
      state.headerChoice = payload
    },

    registerclick(state,payload) {
      state.loginClickable=payload
    },//不可点状态
    loginclick(state,payload) {
      state.registerClickable=payload
    },//不可点状态
    loginOkStatus(state,payload) {
      state.registerVisible=payload
    },//不可点状态
    checkUserPermission(state,payload){
      state.userPermission=payload
    },
    checkUserRouter(state,payload){
      state.userRouter=payload
    },
   //更新文章的各种状态
    changeTitle(state,title){
      state.title=title
    },
    changeDetails(state,details){
      state.details=details
    },
    changeContent(state,content){
      state.content=content
    },
    // //更新内容加上图片锚点 在input动态获取
    // contentAddImage(state,imagename){
    //   state.content=state.content.concat(imagename)
    // },
    //翻转tag选择状态
    changeTagChoice(state,index){
      state.tagChoice[index]=!state.tagChoice[index]
    },

    setTagChoice(state,payload){
      state.tagChoice = payload
    },
    //初始化TagChoice
    initialEdit(state){
      state.title=''
      state.content=''
      state.tagChoice=[false,false,false,false,false,false,false,false]
    },

    setArticleMode(state,payload){
      state.articleMode=payload
    },

    setscrollPosition(state,payload){
      state.scrollPosition=payload
    },

    setSearchContent(state,payload){
      state.searchContent = payload
    },
    setSearchCount(state,payload){
      state.searchCount = payload
    },

    //设置设备类型：
    setDeviceMode(state,payload){
      state.deviceMode = payload
    }
  },
  // getters:{
  //   currentArticleUrl: state => {
  //     return state.userRouter[state.headerChoice]}
  // }
})



export default store
// 将 store 实例作为插件安装
// app.use(store)