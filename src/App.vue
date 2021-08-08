<template>  
<div class="view-content" :class="deviceMode" :id="videoMode?'videoMode':''"> 
  <div class="device-mode" :class="deviceMode"  @click="changeMode"  :title="'点我切换为'+(deviceMode=='computer'?'手机':'电脑')+'模式'">
  <img src="/src/assets/img/phone.svg" class="mobile-mode " :style="{right:isLogout?'100px':''}" :class="deviceMode=='mobile'?'isshow':'ishidden'" alt="device-mode">
  <img src="/src/assets/img/computer.svg" class="computer-mode"  :style="{right:isLogout?'100px':''}"  :class="deviceMode=='computer'?'isshow':'ishidden'"  alt="device-mode"></div>
  <Header />
  <Aside/>
   <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view></div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Header from './components/content/header/Header.vue'

import Aside from './components/content/aside/Aside.vue'
import { useStore } from 'vuex'
import { readUser } from './utils/localStorageUtils'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
   Header,Aside
  }, 
  setup(){
    const store=useStore()
    const videoMode = ref(false)
    store.commit('setDeviceMode',innerWidth>690?'computer':'mobile')
    const deviceMode = computed(()=>store.state.deviceMode)
    const changeMode = ()=>{
      store.commit('setDeviceMode',deviceMode.value=='computer'?'mobile':'computer')
       console.log(deviceMode);      
    }
    useRouter().afterEach((to,from,failure)=>{
      videoMode.value=(to.path.includes('video'))
      console.log('这是videoMode',videoMode.value)
    })
    const isLogout = ref(!readUser())//是否已登录
    console.log(isLogout)
    return {changeMode,deviceMode,isLogout,videoMode}
  }
})
</script>

<style>
  .view-content.mobile{
    position: absolute;
    height: 100vh;
    overflow:hidden;
    cursor:url('/src/assets/img/thumb.cur'),auto;
    /* background-image: url('./src/assets/img/thumb.cur'); */
  }
  .view-content.computer{
   position: absolute;
    height: 100vh;
  }
  .view-content#videoMode{
    position: absolute;
    height: 100vh;
  }
  .mobile-mode{
    /* display: block; */
    width: 30px;
    height: 30px;
    position: absolute;
    /* right: calc(5vw - 5px); */
    right: 5vw;
    top: 15px;
    z-index: 999;
  }
  .computer-mode{
    /* display: block; */
    width: 30px;
    height: 30px;
    position: absolute;
    right: 5vw;
    /* right: calc(5vw - 5px); */
    top: 15px;
    z-index: 999;
  }
  
  .ishidden{
    transform:  translateX(10px) rotateZ(30deg);
    opacity: 0.2;
  }
  .device-mode.computer:hover .ishidden{
    opacity: 1;
  }
  .device-mode.computer:hover .isshow{
    opacity: 0.2;
  }
</style>
