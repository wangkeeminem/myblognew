<template>
  <div class="VideoHeader" :class="VideoColumnVisible ? '' : 'movieModeHeader'">
    <div class="title">学习视频</div>
    <div class="content"><strong>{{currentVideo?.videoTitle}}</strong></div>
  </div>
  <div class="player" :class="VideoColumnVisible ? '' : 'movieModePlayer'">
    <VideoColumn class="videoColoum" v-if="VideoColumnVisible||(!videoMode&&!videoToEnd)" />
    <VideoCanvas
      :class="VideoColumnVisible ? 'VideoColumnVisible' : ''"
      v-if="videoMode"
      :playNextVideo="playNextVideo"
      :videoPath="videoPath"
      :currentIndex="currentIndex"
      :poster="currentVideo?.titleImagePath"
    />
    <img src="/src/assets/img/start.jpg"  class="startPlayImg" alt="startPlay" v-if="!videoMode&&!videoToEnd">
    <img src="/src/assets/img/end.jpg"  class="endPlayImg" alt="endPlay"  v-if="(!VideoColumnVisible)&&videoToEnd" @click="endClick">
    
  </div>
  
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import VideoColumn from "./VideoColumn.vue";
import VideoCanvas from "components/common/video/VideoCanvas.vue";
import videoInfo from "../../../types/videoInfo";

export default defineComponent({
  name: "VideoPlayer",
  components: { VideoColumn, VideoCanvas },
  setup() {
    console.log("进入videos");
    const router = useRouter();
    const VideoColumnVisible = ref(true);//视频栏目可见
    const videoMode = ref(false);//视频模式关闭
    const videoToEnd = ref(false)

    const videoPath = ref(useRoute().params?.videoPath);//视频路径获取
    const currentIndex = ref(useRoute().params?.index);//当前视频的序号
    const videoList = ref<videoInfo[]>(
      useRoute().params.videoInfoListCurrent
        ? JSON.parse(useRoute().params.videoInfoListCurrent as string)
        : ""
    );
    
    const currentVideo = reactive(computed(()=>videoList.value[Number(currentIndex.value)]))//当前的视频
    
    if (videoPath.value) VideoColumnVisible.value = false; //如果本身带参数videoPath，将画布中的视频菜单隐藏 （针对第一次进入）
    router.beforeEach(()=>{
      videoToEnd.value = false
      videoMode.value = false;
      
    })
    
    router.afterEach((to, from, falure) => {
      if (to.params.videoPath) {       
        VideoColumnVisible.value = false; //如果带参数videoPath进来的，将画布中的视频菜单隐藏
        videoPath.value = to.params.videoPath;
        currentIndex.value = to.params.index;
        videoList.value = to.params.videoInfoListCurrent
          ? JSON.parse(to.params.videoInfoListCurrent as string)
          : "";
        videoMode.value = true;

      } else {
        VideoColumnVisible.value = true;
        
      }
    });

    const playNextVideo = () => {
      videoMode.value = false    
       const index = Number(currentIndex.value) + 1;
       const videoPath = videoList.value[index]?.videoPath;
      const videoInfoListCurrent = JSON.stringify(videoList.value)
      if(videoPath)//如果存在的话
      router
        .push({
          params: { index, videoPath, videoInfoListCurrent },
          name: "video",
        })
        .then(() => {
          
          videoMode.value = true          
        });
         //跳转到下一个视频
      else{
         videoToEnd.value = true
        //  VideoColumnVisible.value=true
        videoMode.value = false
      }
        
    };
    const endClick = ()=>{
      videoToEnd.value = false
      
      }
    return {
      VideoColumnVisible,
      playNextVideo,
      videoPath,
      videoMode,
      currentIndex,
      videoToEnd,
      endClick,
      currentVideo
    };
  },
});
</script>

<style scoped>
.VideoHeader {
  position: relative;
  width: 55vw;
  left: 5vw;
  top: -70px;
  padding: 30px 3vw;
  /* height: 100px; */
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
  height: 60px;
  font-size: 1.2vw;
  line-height: 1.5;
  font-weight: 100;
  margin-top: 25px;
}
.player {
  position: relative;
  width: 55vw;
  left: 5vw;
  top: -50px;
  padding: 30px 3vw;
  height: 55vh;
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.videoColoum {
  display: none;
}

.movieModeHeader {
  opacity: 0.1;
}
.movieModePlayer {
  background-color: rgb(0, 0, 0);
  border: none;
}

.startPlayImg{
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}
.endPlayImg{
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}

@media screen {
  @media (max-width: 1000px) {
    .VideoHeader {
      width: 84vw;
      height: auto;
    }
    .title {
      font-size: 25px;
    }
    .content {
      font-size: 3vw;
    }
    .player {
      top: -60px;
      width: 84vw;
      position: relative;
      overflow: auto;
    }
    .videoColoum {
      display: flex;
    }
    .VideoColumnVisible {
      display: none;
    }
    .startPlayImg{
      display: none;
    }

  }
}
</style>