<template>
  <div class="sideColumn" v-if="isShow">
    <SearchBar></SearchBar>
    <VideoColumn class="videoColumn"></VideoColumn>
  </div>
  <img class="videoicon" src="/src/assets/img/video.svg" alt="videoicon" @click="goToVideo" />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../../common/searchbar/SearchBar.vue'
import VideoColumn from '../../common/video/VideoColumn.vue'
export default defineComponent({
  name: 'Aside',
  components: {
    SearchBar, VideoColumn
  },
  setup() {
    const router = useRouter()
    const isShow = ref(true)
    router.afterEach((to, from, failure) => {
      isShow.value = (!to.path.includes('pace'))//应该是space 但是大小写命名冲突
      //  console.log(to.path)
    })
    const goToVideo = () => {
      router.push({ name: 'video' })
    }
    return {
      isShow, goToVideo
    }
  }
})
</script>

<style scoped>
.videoicon {
  display: none;
}
@media screen {
  @media (max-width: 1000px) {
    .videoColumn {
      display: none !important;
    }
    .videoicon {
      display: initial;
      height: 30px;
      position: fixed;
      bottom: 5px;
      right: 0;
      z-index: 999;
    }
  }
}
</style>