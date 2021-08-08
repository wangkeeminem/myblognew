<template>

  <img class="up" v-if="backToTop" src="/src/assets/img/up.svg" alt="" @click="uprefreshClick">
  <img class="refresh" v-if="!backToTop" src="/src/assets/img/refresh.svg" alt="" @click="uprefreshClick">

</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
  name:'RefreshUp',
  emits:{
    uprefreshClick:()=>{
      return true},
  },
  props:{
    backToTop:{
      type:Boolean
    }
  },
  setup(props,context){
    function uprefreshClick(){
      context.emit('uprefreshClick')
    }
    
    return{
      uprefreshClick
    }
  }
})
</script>

<style scoped>
  .refresh,.up{
    position: absolute;
    display: block;
    float:left;
    height: 2vw;
    width: 2vw;
    margin-left: 67vw;
    top: 85%;
    z-index: 100;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
     top: 83vh;
  }
  .refresh:hover,.up:hover{
    opacity:0.5;
    transform: scale(1.1);
    /* background-color: blue; */
  }
  .refresh:active,.up:active{
    opacity:0.8;
    transform: scale(0.9);
    /* background-color: blue; */
  }
  @media screen {
    @media(max-width:1000px){
      .refresh,.up{
        position: absolute;
        margin-left: 95vw;
        height: 5vw;
        width: 5vw;
        top: 85vh;
        z-index: 100;
      }
    }
  }
</style>