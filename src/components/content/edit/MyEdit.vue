<template>
<Scroll @scroll="scroll">
  <div class="MyEdit">
    <DeleteIcon @click="editCancelClick"/>
    <EditTitle />
    <EditDetails/>
    <EditContent />
    <EditTag  @addTags="addTags"/>
    <div class="publish" :class="published?'published':''" @click="publish">
      <img class='launchicon' src="../../../../src/assets/img/publishicon.png" alt="">
      </div>
    <input class='imageinput' type="file" @change='imageinput'>
    
  </div>
</Scroll>

</template>

<script lang='ts'>

import {defineComponent,onMounted,onUpdated,provide,reactive,ref} from 'vue'
import EditTitle from 'components/content/edit/EditTitle.vue'
import EditDetails from 'components/content/edit/EditDetails.vue'
import EditContent from 'components/content/edit/EditContent.vue'
import EditTag from 'components/content/edit/EditTag.vue'
import DeleteIcon from 'components/common/delete/DeleteIcon.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import {getpublishRequest} from '../../../network/publish'
import imageList from '../../../types/imagelist'
import {saveImageList,readImageList,removeImageList, readReeditContent, removeReeditContent, readReeditImages, readMenulist}  from '../../../utils/sessionStorageUtils'
import Scroll from '../../common/sroll/Scroll.vue'
import { readUser } from '../../../utils/localStorageUtils'

import BScroll from '@better-scroll/core'

import {openAndAddArticle, openAndReadAllArticles} from '../../../utils/indexedDBArticle'

// import   { Md5 } from 'ts-md5'
export default defineComponent({
  name:'MyEdit',
  components:{
    EditTitle,EditDetails,EditContent,EditTag,Scroll,DeleteIcon
  },

  setup(){
    const store = useStore()
    const router = useRouter()
    const published = ref(false)
    const imagesrc = ref('')
    const initimagelist:imageList={}
    const imagelist = reactive(initimagelist)
    const imagename = ref('')
    // const hostMode = ref(readMenulist().length>7)//如果栏目大于7个 为host博客文章发表模式 会显示选择文章tag 
    const yourSpaceMode = ref(useRoute().path=='/YourEditSpace')//当前浏览模式 个人空间还是 博客文章
    const userChoiceTags = ref<string[]>([])
//图片输入的处理
    function imageinput(event:Event){//有图片输入时  添加图片图标在edit总页面
      const reader = new FileReader()
      
      imagename.value = (event.target as any).files[0].name.replace(/\s/g,'heheh')+new Date().toLocaleTimeString()//传入的图片的名字 需要把空格的影响替换掉 可以作为图片的占位坑 为防止重名替换混乱 加个时间戳 处理以下空格？

      
      // store.commit('contentAddImage',imagename)//更新vuex内容
      reader.readAsDataURL((event.target as any).files[0])
      
      reader.onload=()=>{
        if (reader.result){
        imagesrc.value = reader.result as string//传入的图片的地址 到时候作为src的值

        // imagelist[imagename.value]=imagesrc.value//image name的hash与src键值对 image name使用md5加密
        imagelist[imagename.value]=`<img src="${imagesrc.value}"  alt="${imagename.value}" style="width:100%;margin:10px auto;object-fit:scale-down">`//生成图片名称和响应图片模板的键值对
        saveImageList(imagelist)
        alert('图片加载完毕')
        
         //图片的模板字符
        }
      }
    }
    provide('imagename',imagename)//将image的名字传给editcontent组件


//发表文章
    function publish(){//点击发表文章
      if(!readUser())return alert('你还没有登录哦，请登录后再发表吧')
      if(confirm('确认发表吗?')){
        const title = store.state.title?store.state.title:readReeditContent().title
        const details = store.state.details
        const publishTime =Date.now()
        let content = store.state.content? store.state.content:readReeditContent().content
        content=content.replace(/\n/g,'<br>')//处理回车  将占位图片字符串替换成html图片标签 进行回车键的转换 这里面会有文件名被替换的风险。。需要在文件拖入时处理一下啊文件名 一定不要放在循环里面！！
        content=content.replace(/\s/g,'&nbsp;')//处理空格 将占位图片字符串替换成html图片标签 进行空格键的转换  这里面会有文件名被替换的风险。。主要是空格影响！！！！
        // console.log(content.length,'这是content');
        if(readImageList()){
        for(let i in readImageList()){
          //文件名md5 hash化  并且将其与base64数据对应
          content=content.replace(new RegExp(i,'g'),readImageList()[i])//将占位图片字符串替换成html图片标签
          // console.log(content.match(new RegExp(i,'g')));
          // console.log(i.length);          
        }}
        if(readReeditImages()){
        for(let i in readReeditImages()){
          //文件名md5 hash化  并且将其与base64数据对应
          content=content.replace(new RegExp(i,'g'),readReeditImages()[i])//将编辑部分的占位图片字符串替换成html图片标签
          // console.log(content.match(new RegExp(i,'g')));
          // console.log(i.length);          
        }}
        const editArticleId = readReeditContent()?readReeditContent().editArticleId:''//如果有编辑内容 id赋给它 否则为空值
        const imagePathList = readReeditContent()?readReeditContent().imagePathList:[]//如果有编辑内容 图片list赋给它

        const tagChoice = store.state.tagChoice?store.state.tagChoice:readReeditContent().title//如果vuex修改 就是它，否则 还是原来编辑的内容
        const newArticle = {title,details,content,tagChoice,publishTime,editArticleId,imagePathList}
        if(!yourSpaceMode.value)//如果不是个人空间模式
        getpublishRequest(newArticle).then(res=>{
        // console.log(res.data.articles); 
        published.value = true                 
        store.commit('initialEdit')  //移除vuex数据
        removeImageList()//移除本地化存储图片列表
        removeReeditContent()//移除编辑内容
        setTimeout(() => {
          router.push('/home').then(()=>{router.go(0)})//跳到主页          
        }, 5000); 
        })    
        else {//如果是用户个人空间模式
          console.log('将写自己的文章',newArticle)
          newArticle.tagChoice= userChoiceTags.value//更改tag
          openAndAddArticle(newArticle).then(res=>{
          published.value = true                 
          store.commit('initialEdit')  //移除vuex数据
          removeImageList()//移除本地化存储图片列表
          removeReeditContent()//移除编辑内容
          setTimeout(() => {
            router.push('/yourspace').then(()=>{router.go(0)})//跳到个人空间页并刷新获取         
          }, 5000);  
          })//存储文章                    
        }
      }
    }
    const SCROLL = reactive({scrool:{}})
    function scroll(payload:BScroll){
      SCROLL.scrool = payload
    }
    onMounted(()=>{
      (SCROLL.scrool as BScroll).refresh() 
    })
    onUpdated(()=>{
      (SCROLL.scrool as BScroll).refresh() 
    })
    

    const editCancelClick = ()=>{
       removeReeditContent()//释放编辑内容
       removeImageList()//释放保存图片内容
       router.go(0)//刷个新
 }
    const addTags = (payload:string[])=>{
       userChoiceTags.value=payload
    }

    return{
      publish,published,imageinput,imagesrc,imagename,scroll,editCancelClick,addTags
    }
  }
})
</script>

<style scoped>
    .MyEdit{
    width: 750px;
    position: relative;
    left: 5vw;
    top:-70px;
    background-color:white;
    border:rgba(100, 100, 100, 0.2) 2px solid;
    padding: 30px 3vw;
    /* margin-bottom: 20px; */
    
  }
  .MyEdit:hover{
    background-color:rgb(248, 248, 248);
  }
  .publish{
    position: absolute;
    right: 12vw;
    bottom: 5px;

  }
  .launchicon{
    width: 40px;
    height: 60px;
  }
  .publish:hover{
    animation:shake 0.5s steps(8) alternate 10;    
  }
  @keyframes shake { 
    0% {right:12vw}
    25% {right:13vw}   
    50% {right:12vw}   
    75% {right:11vw}   
    100% {right:12vw}   
  }
  .published{
    animation:launch 5s steps(10) ; 
  }
  @keyframes launch { 
    0% {bottom:5px}
    25% {bottom:100px}   
    50% {bottom:400px}   
    75% {bottom:800px}   
    100% {bottom:1300px}   
  }
  .imageinput{
    width: 80px;
    height: 80px;
    border-radius: 30%;
    line-height:250px;
    background-image: url('/src/assets/img/openit.png');
    background-size:cover;
    position:fixed;
    float: left;
    top: 50%;
    left:900px;
    opacity: 0.7;
  }
   .wrapper{    
    height:60vh;   
    /* padding-bottom: 100vh; */
   }
   @media screen {
     @media(max-width:1000px){
       .MyEdit{
         width: 84vw;
       }
       .imageinput{
         left:81vw;
       }

     }
   }
   
</style>