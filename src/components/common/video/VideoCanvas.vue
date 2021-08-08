<template>
<div>
    <canvas class="videoCanvas" ref="videoCanvas" @dblclick="doubleClick" :style="{backgroundImage: 'url('+poster+')'}"></canvas>
    <div class="videoControllers" v-if="controllerVisible">
      <img  class="controller" src="/src/assets/img/play.svg" alt="playvideo" @click="playClick">
      <img  class="controller" src="/src/assets/img/playnext.svg" alt="playvideo" @click="playNextClick">     
    </div>
    </div>
</template>

<script lang='ts'>

import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import router from '../../../router'
export default defineComponent({
  name:'VideoCanvas',
  props:{
    playNextVideo:{
      type:Function,
      required:true
    },
    videoPath:{
      type:String,
      required:true
    },
    currentIndex:{
      type:String,
      required:true
    },
    poster:{
      type:String,
      required:true
    }
  },
  setup(props){
    const controllerVisible = ref(true)
    const videoCanvas = ref<HTMLCanvasElement|null>(null)
    const video = document.createElement('video')
    onMounted(()=>{
       const ctx=videoCanvas.value?.getContext('2d')
       const canvasEL = videoCanvas.value as HTMLCanvasElement
       video.src=props.videoPath as string
       
       document.body.appendChild(video);      
       video.height=0
       video.id = props.currentIndex
       video.preload='none'
       video.addEventListener('loadeddata',function fresh(){        
       (ctx as CanvasRenderingContext2D).drawImage(video,0,0,canvasEL.width,canvasEL.height)
      requestAnimationFrame(fresh) 
    
         })

  
    })//onMounted

    const doubleClick = ()=>{
      controllerVisible.value = true
      video.pause()
    
      }
    const playClick = ()=>{
      video.play()
      controllerVisible.value = false     
    }
    const playNextClick = ()=>{    
     document.getElementById(props.currentIndex)?.remove()//删除当前的video元素
     props.playNextVideo()     
     controllerVisible.value = false
    }
     useRouter().afterEach(()=>{
      // console.log('将会关掉：',props.currentIndex)
      document.getElementById(props.currentIndex)?.remove()//删除当前的video元素     
    })

    return{
      doubleClick,playClick,controllerVisible, playNextClick,videoCanvas
    }
  }
})
</script>

<style scoped>
  .videoCanvas{
    position: absolute;
    background-color: brown;
    left: 0;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    background-size:cover;
  }
  .videoControllers{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .controller{
    height: 60px;
  }
  .controller:hover{
    opacity: 0.6;
  }
  @media screen {
    @media(max-width:1000px){
    .controller{
    height: 30px;
   }
   .controller:hover{
    opacity: 1;
  }
 
  }
}
  
</style>