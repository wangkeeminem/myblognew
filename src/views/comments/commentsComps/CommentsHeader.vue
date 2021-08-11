<template>
  <Scroll class="commentscroll" @scroll="scroll">
  
  <div class="totalCommentsPage" :style="{'opacity':publishVisible?'0.1':''}">
  <div class="CommentsHeader">
    <div class="title">留言</div>
    <div class="content">这里是<strong>KE</strong>的个人博客<br />本博客使用Vue3.0+TypeScript开发,项目构建平台为Vite，后台开发使用Node.js<br />页面设计参考大神<a
        href="https://www.laruence.com/"
        ><strong> PHP鸟哥惠新宸 @Laruence</strong></a><br><br>有什么想说的，就在这里说说看吧，不限话题，尽量不要水贴哦！
    <br></div>  
  </div>
 <div class="totalComments">{{commenentscount}} Comments</div>
  <CommentsContent :commentsList="commentsList" :publishclick="publishclick" ref="reftest"/>
  </div>
   </Scroll>

   <Commentbar @publishclick="publishclick" @launchClick="launchClick" @inputAction="inputAction"  :publishVisible="publishVisible" :inputContent="inputContent"/>

   <RefreshUp class="refreshUp" v-if="deviceMode=='mobile'" @click="clickRefresh"/>
</template>




<script lang='ts'>
import {  computed, defineAsyncComponent, defineComponent, onMounted, ref, } from "vue";
// import CommentsContent from './CommentsContent.vue'
const CommentsContent=defineAsyncComponent(()=>import('./CommentsContent.vue'))
import Scroll from '../../../components/common/sroll/Scroll.vue'
import RefreshUp from '../../../components/common/refreshup/RefreshUp.vue'
import Commentbar from 'components/common/commentbar/Commentbar.vue'

import {commentsSetup} from '../../../utils/commentsSetup'
import comments from "../../../types/commentslist";

import { useStore } from "vuex";


export default defineComponent({
  name: "CommentsHeader",
  components:{CommentsContent,Scroll,RefreshUp,Commentbar},
  props:{
     Totalcomments:{
      type:Object,
      required:true
    }
  },
  setup(props) {


    const Totalcomments=computed(()=>props.Totalcomments);

    const store = useStore()
    const deviceMode = computed(()=>store.state.deviceMode)
    return {deviceMode,...commentsSetup( Totalcomments.value as {result:comments[]},'comments')}//封装的一个发送留言的函数 只要引入Totalcomments就可以展示了
    // return commentsSetup(props.Totalcomments as {result:comments[]},'comments')//封装的一个发送留言的函数 只要引入Totalcomments就可以展示了
    
  },
});
</script>

<style scoped>
.CommentsHeader {
  position: relative;
  width: 55vw;
  left: 5vw;
  top: -70px;
  padding: 30px 3vw;
  /* height: 260px; */
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;
      -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.title {
  font-size: 1.8vw;
  line-height: 1.8vw;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: 400;
}
.content {
  position: static;
  white-space: pre-wrap;
  /* height: 150px; */
  font-size: 1.2vw;
  line-height: 1.5;
  font-weight: 100;
  margin-top: 25px;
}
.totalComments{
  position: relative;
  width: 55vw;
  left: 5vw;
  top: -50px;
  padding: 15px 3vw;
  font-size: 1.2vw;
  font-weight: 900;
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;
      -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}



  ::-webkit-scrollbar-button{
    display: none;
    border-radius: 4px 4px;
  }
  ::-webkit-scrollbar{
    background-color: rgb(223, 223, 223);
    box-sizing: content-box;
    border-radius: 4px 4px;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb{
    background-color:rgb(235, 235, 235);
    border-radius: 4px 4px;
    height: 20px;
    width: 20px;
    border-radius: 4px 4px;
    opacity: 0.2;
  }
   ::-webkit-scrollbar:horizontal{
     display: none;
   }
  .totalCommentsPage{
    padding-bottom: 100px;
  }

@media screen {
  @media(max-width:1000px){
    .CommentsHeader,.totalComments{
      width: 84vw;

    }
    .title {
    font-size: 25px
  }
    .CommentsHeader{
      height: auto;
    
    }

   .content{
     font-size: 3vw;
   }

  }
}
</style>