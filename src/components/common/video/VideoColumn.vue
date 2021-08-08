<template>
<div class="videoColumn" >
  <div v-for="(item,index) in videoInfoList" @click="getIntoVideo(index,item.videoPath,$event)" :key="item">
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
   
    
    const getIntoVideo =(index:number,videoPath:string,event:MouseEvent)=>{     
      // router.push('/video?videoId=')//点击跳转进具体video路由
      const videoInfoListCurrent = JSON.stringify(videoInfoList.value)
      // console.log(videoPath)
      router.push({params:{index,videoPath,videoInfoListCurrent },name:'video'})//点击跳转进具体video路由,将当前选中的index、视频path和视频list传过去
      
    }
    const videoInfoList = ref<videoInfo[]>()
    getVideoInfo().then((res)=>{ videoInfoList.value=res.data.videos}) 

    
    return{
      getIntoVideo,videoInfoList
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