<template>
<div class="commentbar">
  <img class="userpublish" src="/src/assets/img/userpublish.svg" alt="" @click="publishclickInitial(0,$event)">
  <img class="userpublish userlaunch"  v-if="publishVisible" src="/src/assets/img/userlaunch.svg" alt="" @click="launchClick">
  <textarea v-if="publishVisible" class="publishBar" v-model="inputContent" @input="inputAction" ref="textareaEL" autofocus></textarea>
  </div>
</template>

<script lang='ts'>


import {defineComponent, nextTick, ref, watch} from 'vue'
export default defineComponent({
  name:'Commentbar',
  emits:{
    publishclick:(payload:{payload:number,event:Event})=>{return true},
    launchClick:()=>{return true},
    inputAction:(payload:string)=>{return true}
  },
  props:{
    publishVisible:{
      type:Boolean,
      required:true
    }
  },
  setup(props,context){
    const inputContent = ref('')
    const textareaEL = ref<HTMLElement | null>(null)

    const publishclickInitial = (payload:number,event:Event)=>{
      console.log('hahaha')
      context.emit('publishclick',{payload,event})
      
      nextTick(()=>{(textareaEL.value as HTMLElement)?.focus()})
    }
    const launchClick = ()=>{
      context.emit('launchClick')          
      inputContent.value = ''//清空留言板
      console.log('清空了',inputContent.value)
    }
    const inputAction = ()=>{
      context.emit('inputAction',inputContent.value)
    }
    return{
      publishclickInitial,launchClick,inputContent,inputAction,textareaEL
    }
  }
})
</script>

<style scoped>
  .userpublish{
  width: 2.5vw;
  position:fixed;
  left: 67vw;
  top:75vh;
  z-index: 999;
}
.userlaunch{
  transform: translateY(-100%);
  z-index: 999;
}


.publishBar{
  width: 55vw;
  height: 200px;
  position: fixed;
  top: calc(75% + 3vw);
  transform: translateY(-100%);
  left: 5vw;
  padding: 35px 3vw;
  border: rgba(253, 253, 253, 0.2) 2px solid;
  background-color:rgba(100, 100, 100, 0.4);
  color:rgb(223, 223, 223);
  font-size: 2.5vw;
  line-height: 2;
  white-space: pre-wrap;
  resize: none;
  outline:none;
  border-radius:4px ;
  z-index: 999;
}
.userpublish:hover{
  opacity: 0.5;
}
@media screen {
  @media(max-width:1000px){
    .userpublish{
      width: 6vw;
      position:fixed;
      left:94vw;
      top:78vh;
   }
   .publishBar{
     width: 82vw;
     height: 250px;
     position: fixed;
     font-size: 4vw;
     top: calc(78% + 6vw);
     transform: translateY(-100%);
   }


  }
}
</style>