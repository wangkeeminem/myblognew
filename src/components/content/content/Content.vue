<template>
  <!-- <div  class="content" ref="content"   @load="load" @loadeddata="loaded">hahahah</div> -->
  <div  class="content" :class="touched?'touched':''" ref="contentdiv" v-html="content" ></div>
</template>

<script lang='ts'>

import {computed, defineComponent, onMounted, ref} from 'vue'
import 'highlight.js/styles/monokai-sublime.css'
export default defineComponent({
  name:'Content',
  props:{
    content:{
      type:String,
      required:true
    }
  },
  setup(props){
  
    const contentdiv = ref<HTMLElement|undefined>()
    // const visible = ref(false)
    const touched = ref(false)
    onMounted(()=>{
       
      ;(contentdiv.value as HTMLElement).ontouchstart=(e)=>{
        touched.value=true
        // e.cancelBubble=true

       }
      ;(contentdiv.value as HTMLElement).ontouchmove=(e)=>{
      //  e.cancelBubble=true
      }

      ;(contentdiv.value as HTMLElement).ontouchend=(e)=>{
        touched.value=false
        // e.cancelBubble=true
      }
    })

    return{
      touched,contentdiv,
      // content,
    }
  }
})
</script>

<style>
  /* table 样式 */
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }
  
  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }
  
  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }
  
  /* ul ol 样式 */
  ul, ol {
    margin: 10px 0 10px 20px;
  }
  
  
  </style>

<style scoped>
  .content{
    position:static;
    display: block;
    white-space: pre-wrap;
    height: 200px;
    font-size: 1.2vw;
    line-height: 2;
    font-weight: 100;
    overflow: hidden;
    margin-top: 3px;
  }
  .content:hover{
    overflow: auto;
    border-top: darkgrey 1px dotted;
    border-bottom: darkgrey 1px dotted;
  }
  ::-webkit-scrollbar-button{
    display: none;
    border-radius: 4px 4px;
  }
  ::-webkit-scrollbar{
    background-color: rgb(223, 223, 223);
    box-sizing: content-box;
    border-radius: 4px 4px;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb{
    background-color:rgb(235, 235, 235);
    border-radius: 4px 4px;
    height: 20px;
    width: 20px;
    border-radius: 4px 4px;
    opacity: 0.2;
  }
   ::-webkit-scrollbar:horizontal{
     display: none;
   }
  @media screen {
    @media(max-width: 1000px){
      .content{
        font-size: 2.4vw;
        /* height:30vw; */
        /* line-height: 3.6vw; */
      }
      .touched{
      overflow: auto;
      border-top: darkgrey 1px dotted;
      border-bottom: darkgrey 1px dotted;
    }   
    }
  }
</style>