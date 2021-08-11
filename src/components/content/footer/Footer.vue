<template>

    <div class="footer" v-if="isfooterVisible">
      <a title="网站备案号"  class="webID" href="http://beian.miit.gov.cn/" >苏ICP备2021035085号</a>
      <div style="width:300px;margin:0 auto; padding:6px 0; ">
		 		<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32039102000295" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="/src/assets/img/policeicon.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">苏公网安备 32039102000295号</p></a>
		 	</div>
    
    </div>

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
  text-align: center;
 }
 .webID:hover{
   filter: brightness(1.1);
   font-weight: 500;
 }
 .footer{
   position:fixed;
   width: 100vw;
   height: 40px;
   background-color: black;
   bottom: 0;
   /* opacity: 0; */
}
.footer:hover{
  opacity: 0.8;
}
</style>