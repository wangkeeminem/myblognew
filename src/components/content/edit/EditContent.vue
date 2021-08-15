<template>
  
  <!-- <textarea class="content"  v-model="contentInput" ></textarea> -->
  <div class="content" id="content" ref="contentdiv" ></div>

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
  components:{  },
  setup(){
    onMounted(()=>{
      const editor = new Editor(contentdiv.value)
      // 设置编辑区域高度为 500px
    if(!yourSpaceMode.value){
      editor.config=Object.assign(editor.config,config1)//如果是博主模式 使用config1
    }
    
    if(yourSpaceMode.value){//如果是youspace模式 把本地上传服务器功能关闭 使用base64保存图片
      
      editor.config=Object.assign(editor.config,config2)//如果是用户模式 使用config2    
    }
    ;(contentdiv.value as HTMLElement).onclick= (e)=>{//修正点击后失去焦点
      // console.log(editor.$textElem.elems[0].lastElementChild,e.target)
      // editor.$textElem.elems[0]
      // ;(e.target as HTMLElement).focus()
      editor.selection.moveCursor(e.target as any,)//点击移动光标到对应点击的目标位置
      // editor.txt.append('<p></p>')
      // editor.$textElem.elems[0].children[editor.$textElem.elems.length-1].focus()   
   
    }
    

    editor.config.onchange=(html:any)=>{
      store.commit('changeContent',html)//把内容同步至vuex=》供发送时使用
    }
    editor.config.onSelectionChange = function (newSelection:any) {
    console.log("onSelectionChange", newSelection);
  /**
    {
       text:'wangeditor', // 当前选择文本
       html: '<p>wangeditor</p>', // 当前选中的html
       selection: selection, // 原生selection对象
    }
   */
  };
    // 挂载highlight插件
    editor.highlight = hljs
    editor.create()
    editor.txt.html(contentInput.value) // 重新设置编辑器内容
    onBeforeUnmount(() => {
             editor.destroy();
        });
    })




    const contentdiv = ref<HTMLElement|null>(null)
    const store = useStore()
    const contentInput =  ref(readReeditContent()?readReeditContent().content:store.state.content) //使用富文本编辑器 就不需要转化了吧
    const yourSpaceMode = ref(useRoute().path=='/YourEditSpace')//当前浏览模式 个人空间还是 博客文章
    //     const contentInput =  ref(readReeditContent()?readReeditContent().content.replace(/<br>/g,'\n').replace(/\&nbsp\;/g,' '):store.state.content) //反编译 将相关换行 空格标签编译为文本格式
//     // const contentInput =  ref(store.state.content) //反编译 将相关换行 空格标签编译为文本格式
// //  content=content.replace(/\n/g,'<br>')..replace(/<br>/g,'\n').replace(/\&nbsp\;/g,'\s')
// //         content=content.replace(/\s/g,'&nbsp;')

//     watch(contentInput,(content)=>{//同步输入内容至vuex
   
//       store.commit('changeContent',content)
//     })
    
//     const newimagename:any=inject('imagename')
//     watch(newimagename,(newimagename)=>{
  
//       contentInput.value=contentInput.value+'\n'+newimagename+'\n'//将其在一起拼接 并且显示出来
//     })
    return{
      // contentInput,
      contentdiv
    }
  }
})
</script>

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
  }
 
  .content:focus{
    border: none;
  }
 

</style>