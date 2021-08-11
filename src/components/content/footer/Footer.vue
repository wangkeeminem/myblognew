<template>
    <div class="footer" v-if="isfooterVisible"><a title="网站备案号"  class="webID" href="http://beian.miit.gov.cn/" >苏ICP备2021035085号</a></div>
</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import {  useRouter } from 'vue-router'
export default defineComponent({
  name:'Footer',
  setup(){
    const isfooterVisible = ref(false)
    useRouter().afterEach((to,from,failure)=>{
      isfooterVisible.value=to.path=="/home"
      isfooterVisible.value = false
    })
    addEventListener('scroll',(e)=>{
      if(document.documentElement.scrollHeight==document.documentElement.scrollTop+document.documentElement.clientHeight)
      {isfooterVisible.value=true}
      else {isfooterVisible.value=false}
    })
    return{
      isfooterVisible
    }
  }
})
</script>

<style scoped>
.webID{
  color: aliceblue;
  height: 14px;
  width: 20vw;
  line-height: 20px;
  font-size: 15px;
  display: block;
  margin-left: 50%; 
  transform: translateX(-50%);
 }
 .webID:hover{
   filter: brightness(1.1);
   font-weight: 500;
 }
 .footer{
   position:fixed;
   width: 100%;
   height: 20px;
   background-color: black;
   bottom: 0;
   /* opacity: 0; */
}
.footer:hover{
  opacity: 0.8;
}
</style>