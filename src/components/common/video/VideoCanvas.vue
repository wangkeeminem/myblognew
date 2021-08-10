<template>
  <div>
    <canvas
      class="videoCanvas"
      ref="videoCanvas"
      @dblclick="doubleClick"
      :style="{ backgroundImage: 'url(' + poster + ')' }"
      @mouseleave="canvasLeave"
      @mouseenter="canvasEnter"
    ></canvas>
    <div class="videoControllers" v-if="controllerVisible">
      <img
        class="controller"
        src="/src/assets/img/play.svg"
        alt="playvideo"
        @click="playClick"
      />
      <img
        class="controller"
        src="/src/assets/img/playnext.svg"
        alt="playvideo"
        @click="playNextClick"
      />
    </div>
    
    <div class="controlBar" >
      <div class="canvasBottom" v-show="bottomVisible">
      <input
        type="range"
        class="timeBar"
        min="0"
        :max="currentDuration"
        :value="currentTime"
        @click="changeTime"
        step="1"
      />
      <progress
        class="volumeBar"
        :value="currentVolume"
        @click="changeVolume"
      ></progress
      ><img
        class="volumeIcon"
        src="/src/assets/img/volume.svg"
        alt="volumeIcon"
      />
      </div>
    <img class="fullScreenIcon" src="/src/assets/img/fullscreen.svg" alt="maxSize"  @click="switchScreen()">  
    </div>
    <img class="closeIcon" alt="closeIcon" src="/src/assets/img/close.svg" @click="closeClick"/>
    <div class="speedItem" v-show="bottomVisible">
    <span class="speed">{{ currentSpeed.toFixed(1)}}</span
    ><progress
      class="speedBar"
      :value="currentSpeedToProgress"
      @click="changeSpeed"
    ></progress
    ><img class="speedIcon" src="/src/assets/img/speed.svg" alt="speedIcon" :style="{opacity:currentSpeed==1?'0.6':'1'}" @click="speedBackToOne" />   
    </div>
  </div>
</template>

<script lang='ts'>

import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import {
  speedToProgress,
  progressToSpeed,
} from "../../../utils/speedToProgressValue";
export default defineComponent({
  name: "VideoCanvas",
  props: {
    playNextVideo: {
      type: Function,
      required: true,
    },
    videoPath: {
      type: String,
      required: true,
    },
    currentIndex: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    switchScreen:{
      type:Function,
      required:true
    },
    closeVideo:{
      type:Function,
      required:true
    }
  },
  setup(props) {
    const controllerVisible = ref(false);
    const videoCanvas = ref<HTMLCanvasElement | null>(null);
    const video = document.createElement("video");
    const currentDuration = ref(0); //视频总长度
    const currentTime = ref(0); //视频播放时间点
    const currentVolume = ref(0.5); //默认音量为0.5
    const currentSpeed = ref(1); //默认播放速度
    const bottomVisible = ref(false)
    const timerForDisp = ref(0)//timer用来存储延时的timer定时器
    const currentSpeedToProgress = computed(() =>
      speedToProgress(currentSpeed.value)
    ); //将其播放速度转换出来为进度条比率
    onMounted(() => {
      controllerVisible.value = true
      setTimeout(()=>{controllerVisible.value=false},1000)
      const ctx = videoCanvas.value?.getContext("2d");
      const canvasEL = videoCanvas.value as HTMLCanvasElement;
      video.src = props.videoPath as string;
      (videoCanvas.value as HTMLCanvasElement).height = 480;
      (videoCanvas.value as HTMLCanvasElement).width = 640;
      document.body.appendChild(video);
      video.autoplay=true
      video.height = 0;
      video.id = props.currentIndex;
      video.preload = "none";
      video.volume = currentVolume.value;
      video.addEventListener("loadeddata", function fresh() {
        (ctx as CanvasRenderingContext2D).drawImage(
          video,
          0,
          0,
          canvasEL.width,
          canvasEL.height
        );
        currentDuration.value = video.duration;
        currentTime.value = video.currentTime;
        currentVolume.value = video.volume;
        currentSpeed.value = video.playbackRate;
        requestAnimationFrame(fresh);
      });
    }); //onMounted

    const doubleClick = () => {
      controllerVisible.value = true;//双击显示暂停 下一个
      bottomVisible.value = true//双击显示下面的控件
      video.pause();
    };
    const playClick = () => {
      video.play();
      controllerVisible.value = false;//playclick立马消失 不存在重复点击出现多计时器情况
      (timerForDisp.value as any)=setTimeout(()=>{ bottomVisible.value = false},3000)//播放后下面控件三秒消失 将timer赋给timerForDisp,以防临时有其他事件取消          
    };
    const playNextClick = () => {
      (document.getElementById(props.currentIndex) as HTMLElement).remove(); //删除当前的video元素
      props.playNextVideo();
      controllerVisible.value = false;
      (timerForDisp.value as any)=setTimeout(()=>{ bottomVisible.value = false},3000)//播放后下面控件三秒消失 将timer赋给timerForDisp,以防临时有其他事件取消
    };
    useRouter().beforeEach(() => {//监听视频跳转 点击
      //在跳转前将视频元素删除
      clearTimeout(timerForDisp.value)//将原本延时器清除
      video.pause();
      // console.log(document.getElementsByTagName('video'))
      if (document.getElementById(props.currentIndex))
        (document.getElementById(props.currentIndex) as HTMLElement).remove(); //删除当前的video元素
     
    });

    const changeTime = (event: MouseEvent) => {
      // console.log('要变一下进度',(event.target as HTMLElement).clientWidth)
      clearTimeout(timerForDisp.value)//将原本延时器清除
      const totalLenght = (event.target as HTMLElement).clientWidth;
      video.currentTime = (event.offsetX / totalLenght) * currentDuration.value; //按照点击位置占据的百分比来计算进度事件   
      ;(timerForDisp.value as any)=setTimeout(()=>{ bottomVisible.value = false},3000)//新延时器
    };
    const changeVolume = (event: MouseEvent) => {
      clearTimeout(timerForDisp.value)//将原本延时器清除
      const totalLenght = (event.target as HTMLElement).clientWidth;
      video.volume = event.offsetX / totalLenght; //以点击的位置计算百分比 算出音量
      ;(timerForDisp.value as any)=setTimeout(()=>{ bottomVisible.value = false},3000)//新延时器
    };
    const changeSpeed = (event: MouseEvent) => {
      clearTimeout(timerForDisp.value)//将原本延时器清除
      const totalLenght = (event.target as HTMLElement).clientWidth;
      video.playbackRate = progressToSpeed(event.offsetX / totalLenght); //以点击的位置计算百分比 算出音量
      ;(timerForDisp.value as any)=setTimeout(()=>{ bottomVisible.value = false},3000)//新延时器
    };
    const speedBackToOne = ()=>{
      video.playbackRate = 1//重置播放速度
    }
    const canvasLeave = (event:MouseEvent)=>{
      if(event.offsetY>(event.target as HTMLElement).clientHeight-5)//如果鼠标超出了幕布的下边界
        bottomVisible.value=true//让控件显示出来
    }
    const canvasEnter = (event:MouseEvent)=>{
        if(event.offsetY<(event.target as HTMLElement).clientHeight)//如果鼠标进入了幕布
        bottomVisible.value=false//让控件显示出来
    }
    const closeClick = ()=>{
      clearTimeout(timerForDisp.value)//将原本延时器清除
      video.pause();
      // console.log(document.getElementsByTagName('video'))
      if (document.getElementById(props.currentIndex))
        (document.getElementById(props.currentIndex) as HTMLElement).remove(); //删除当前的video元素
      props.closeVideo()//跳至选择界面      
      ;(timerForDisp.value as any)=setTimeout(()=>{ bottomVisible.value = false},3000)//新延时器      
    }
    return {
      doubleClick,
      playClick,
      controllerVisible,
      playNextClick,
      videoCanvas,
      currentDuration,
      currentTime,
      changeTime,
      changeVolume,
      currentVolume,
      currentSpeedToProgress,
      changeSpeed,
      currentSpeed,
      speedBackToOne,
      canvasLeave,
      bottomVisible,
      canvasEnter,
      closeClick
    };
  },
});
</script>

<style scoped>
.videoCanvas {
  position: absolute;
  background-color: brown;
  left: 0;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  background-size: cover;
}
.videoControllers {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.controller {
  height: 60px;
}
.controller:hover {
  opacity: 0.6;
}
.timeBar {
  position: absolute;
  border-radius: 4px;
  background-color: rgba(102, 102, 102, 0.205);
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  bottom: 5%;
  width: 60%;
  box-shadow: 0 1px 1px rgb(77, 77, 76), inset 0 0.125em 0.125em #0d1112;
}
.timeBar:hover {
  background-color: rgba(102, 102, 102, 0.493);
}
.volumeBar {
  position: absolute;
  left: 3vw;
  height: 10px;
  width: 5vw;
  bottom: 5%;
  transform: translateY(70%);
}

.volumeIcon {
  position: absolute;
  left: 1.5vw;
  height: 20px;
  bottom: 5%;
  transform: translateY(65%);
}
.volumeBar::-webkit-progress-bar {
  background-color: #d7d7d7;
  border-radius: 4px;
}
.volumeBar::-webkit-progress-value {
  background-color: rgb(165, 164, 224);
  border-radius: 4px;
}
.speedBar {
  position: absolute;
  right: 3vw;
  height: 10px;
  width: 5vw;
  bottom: 5%;
  transform: translateY(70%);
}
.speedBar::-webkit-progress-bar {
  background-color: #d7d7d7;
  border-radius: 4px;
}
.speedBar::-webkit-progress-value {
  background-color: rgb(52, 66, 64);
  border-radius: 4px;
}
.speedIcon {
  position: absolute;
  right: 1.5vw;
  height: 20px;
  bottom: 5%;
  transform: translateY(60%);
  opacity: 0.6;
}
.speedIcon:hover {
  opacity: 0.8;
}
.speed {
  position: absolute;
  display: block;
  right: 9vw;
  height: 20px;
  bottom: 5%;
  transform: translateY(60%);
  color: tomato;
}
.fullScreenIcon{
  position: absolute;
  right: 1.5vw;
  height: 20px;
}
.fullScreenIcon:hover{
  opacity: 0.8;
}
@media screen {
  @media (max-width: 1000px) {
    .controller {
      height: 30px;
      margin: 10px;
    }
    .controller:hover {
      opacity: 1;
    }
    .controlBar {
      display: none;
    }
    .speedBar {
      left: 45vw;
      width: 50%;
      bottom: 5.5%;
      transform: translateX(-50%);
    }
    .speedIcon {
      right: 10vw;
      height: 20px;
      transform: translateY(0%);
    }
    .speed {
      right: 15vw;
      height: 20px;
      bottom: 5%;
      transform: translateY(0%);
    }
    .closeIcon{
      position: absolute;
      top: 0;
      left: 0;
      height: 15px;
    }
  }
}
</style>