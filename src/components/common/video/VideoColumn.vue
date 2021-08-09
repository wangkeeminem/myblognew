<template>
<div class="videoColumn" ref="videoColumn">
  <div v-for="(item,index) in videoInfoList" :ref="currentIndex==index?'videoColumnItem':''" :class="currentIndex==index?'isSelected':''" @click="getIntoVideo(index,item.videoPath,$event)" :key="item">
<VideoColumnItem :videoItem="item"/>
</div>
</div>
</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import { useRouter } from 'vue-router'
import videoInfo from '../../../types/videoInfo'
import VideoColumnItem from './VideoColumnItem.vue'
import getVideoInfo from '../../../network/getVideoInfo'
export default defineComponent({
  name:'VideoColumn',
  components:{VideoColumnItem},
  
  setup(){
    const router = useRouter()
    const currentIndex = ref()
    const videoColumn = ref<HTMLElement|null>(null)
    const videoColumnItem = ref<HTMLElement|null>(null)
    const getIntoVideo =(index:number,videoPath:string,event:MouseEvent)=>{  
      currentIndex.value = index   //将当前所选为true
      // router.push('/video?videoId=')//点击跳转进具体video路由
      const videoInfoListCurrent = JSON.stringify(videoInfoList.value)
      // console.log(videoPath)
      router.push({params:{index,videoPath,videoInfoListCurrent },name:'video'})//点击跳转进具体video路由,将当前选中的index、视频path和视频list传过去
      
    }
    const videoInfoList = ref<videoInfo[]>()
    getVideoInfo().then((res)=>{ videoInfoList.value=res.data.videos})
 
    router.afterEach((to,from,failure)=>{     
      currentIndex.value = to.params.index
      if(videoColumn.value&&videoColumnItem.value){
      (videoColumn.value as HTMLElement).style.overflow = 'auto'
       const isSelectHeight=(videoColumnItem.value as HTMLElement).scrollHeight
       ;(videoColumn.value as HTMLElement).scrollTo({top:currentIndex.value*isSelectHeight})      
      }
     }     
    )
     
    return{
      getIntoVideo,videoInfoList,currentIndex,videoColumn,videoColumnItem
    }
  }
})
</script>

<style scoped>
.videoColumn{
  position: absolute;
  top: 300px;
  right: 5vw;
   z-index: 999;
   height: 66vh;
   overflow:hidden;
   display: flex;
   flex-direction: column;
    direction: rtl; 
}
.isSelected{
  filter: brightness(0.5);
}
.videoColumn:hover{
  overflow:auto;
}
  ::-webkit-scrollbar-button{
    display: none;
    border-radius: 4px 4px;
  }
  ::-webkit-scrollbar{
    background-color:rgb(235, 235, 235);
    
    box-sizing: content-box;
    border-radius: 4px 4px;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb{
    background-color: rgb(223, 223, 223);
    border-radius: 4px 4px;
    height: 20px;
    width: 20px;
    border-radius: 4px 4px;
    opacity: 0.2;
  }
   ::-webkit-scrollbar:horizontal{
     display: none;
   }
   @media screen {
    @media (max-width: 1000px) {
    .videoColumn{
      flex-direction: row;
      top:50px;
      left: 50%;
      transform: translateX(-50%);
      flex-wrap: wrap;
      width: 84vw;
      height: auto;
      justify-content: center;
    }
    .videoColumn:hover{
    overflow:hidden;
  }

  }
   }
</style>