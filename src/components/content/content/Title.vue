<template>
  <a href="javascript:;"><div class="title">{{title}}</div></a>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
  name:'Title',
  props:{
    title:{
      type:String,
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
  .title{
    font-size: 1.8vw;
    line-height: 1.8vw;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: 200;
  }
  @media screen {
    @media(max-width: 1000px){
      .title{
        font-size: 3.6vw;
        line-height: 3.6vw;
      }
    }
  }
</style>