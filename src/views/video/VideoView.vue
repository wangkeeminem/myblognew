<template>
  <VideoPlayer/>
</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import VideoPlayer from '../../components/common/video/VideoPlayer.vue'
import videoInfo from '../../types/videoInfo'
export default defineComponent({
  name:'VideoView',
  components:{VideoPlayer},
  setup(){
    
    return{
      
    }
  }
})
</script>

<style scoped>
  
</style>