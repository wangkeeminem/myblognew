<template>
  
  <!-- <textarea class="content"  v-model="contentInput" ></textarea> -->
  <div class="toolbar" ref="toolbar" id="toolbar"></div>
  <div class="content" id="content" ref="contentdiv" @contextmenu.prevent="" aria-selected="true"></div>
  
</template>

<script lang='ts'>
import {  defineComponent, onBeforeUnmount, onMounted, ref, } from 'vue'
import { useStore } from 'vuex'
import { readReeditContent } from '../../../utils/sessionStorageUtils'
import Editor from 'wangeditor'

// const Editor = ()=>import ('wangeditor').then(res=>res)
// const Editor =  ( )=>import ('wangeditor').then(res=>res)
import {config1,config2} from './editerConfig'

import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { useRoute } from 'vue-router'


export default defineComponent({
  name:'EditContent',
  components:{ },
  setup(){
    const contentdiv = ref<HTMLElement|null>(null)
    const toolbar = ref<HTMLElement|null>(null)
    onMounted(()=>{
      const editor = new Editor(toolbar.value,contentdiv.value)
      // 设置编辑区域高度为 500px
    
    if(!yourSpaceMode.value){
      editor.config=Object.assign(editor.config,config1)//如果是博主模式 使用config1
    }
    
    if(yourSpaceMode.value){//如果是youspace模式 把本地上传服务器功能关闭 使用base64保存图片
      
      editor.config=Object.assign(editor.config,config2)//如果是用户模式 使用config2    
    }
    ;(contentdiv.value as HTMLElement).ondblclick= (e)=>{//修正点击后失去焦点           
      editor.selection.moveCursor(e.target as any,)//点击移动光标到对应点击的目标位置     
    }
    ;(contentdiv.value as HTMLElement).ontouchstart= (e)=>{//修正点击后失去焦点 移动端适配
           
        editor.selection.moveCursor(e.target as any,)//点击移动光标到对应点击的目标位置  

     }
    editor.config.onchange=(html:string)=>{
      // console.log('有变化',html)
      store.commit('changeContent',html)//把内容同步至vuex=》供发送时使用
    }
    
    editor.config.onSelectionChange = function (newSelection:any) {
      console.log(newSelection)
  };
    // 挂载highlight插件
    editor.highlight = hljs
    editor.create()
    editor.txt.html(contentInput.value) // 重新设置编辑器内容
    onBeforeUnmount(() => {
             editor.destroy();
        });
    })




 
    const store = useStore()
    // const contentInput =  ref('') //使用富文本编辑器 就不需要转化了吧
    const contentInput =  ref(readReeditContent()?readReeditContent().content:store.state.content) //使用富文本编辑器 就不需要转化了吧
    const yourSpaceMode = ref(useRoute().path=='/YourEditSpace')//当前浏览模式 个人空间还是 博客文章

    return{
      // contentInput,
      contentdiv,
      toolbar
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
  
 
  @media screen {
    @media (max-width: 500px) {
      .w-e-panel-container{
        width: 80vw !important;
        transform: translateX(50%);
      }
    }
  }
  /* .wang-code-textarea{
    width: 30% !important;
  } */
  
  </style>
<style scoped>
  .content{
    position:relative;
    display: block;
    margin-top: 10px;
    /* top:15px; */
    font-size: 16px;
    line-height: 32px;
    font-weight: 100;
    width: 100%;
    /* height: 80vh; */
    caret-color: #24238a;
    outline:rgba(110, 110, 110, 0.3) 2px solid;
    border: none;
    resize: none;
    min-height: 500px;
    
  }

  .content:focus{
    border: none;
  }
 

</style>