<template>
    <div class="videoItem" :style="{backgroundImage: 'url('+videoItem.titleImagePath+')'}">
      <p class="videoTitle">{{videoItem.videoTitle}}</p>
      <!-- <img class="titleImage" :src="videoItem.titleImagePath" :alt="videoItem.videoTitle"> -->
      </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
  name:'VideoColumnItem',
  props:{
    videoItem:{
      type:Object,
      required:true
    }
  },
  setup(){
    
    return{
      
    }
  }
})
</script>

<style scoped>
  .videoItem {
  width: 22vw;
  height: 18vh;
  padding: 15px 1vw;
  margin-bottom: 10px;
  font-size: 1.2vw;
  font-weight: 900;
  line-height: 50px;
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;
  /* border: rgba(100, 100, 100, 0.2) 2px solid; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 101;
  background-size:cover;
}
.videoTitle{
  font-size: 22px;
  /* width:24vw; */
  text-overflow:ellipsis;
  overflow: hidden;
  white-space:nowrap;
  line-height: 22px;
  -webkit-text-stroke: white 1px;
}

   @media screen {
    @media (max-width: 1000px) {
    .videoItem{
      padding: 5px 1vw;
      /* width:23vmin; */
      flex: 1;
      height: 23vmin;
      margin-right:1vw;
    }
    .videoTitle{
    font-size: 14px;
    text-overflow:clip;
    overflow: hidden;
    white-space:pre-wrap;
    line-height: 14px;
    color: rgba(41, 41, 41, 0.8);
    -webkit-text-stroke: rgba(255, 255, 255, 0.623) 1px;
    height: 23vmin;
   }

  }
   }
</style>