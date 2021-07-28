<template>

  <textarea class="content"  v-model="contentInput" >PHP8 alpha2发布了，最近引入了一个新的关键字：match, 这个关键字的作用跟switch有点类似。

这个我觉得还是有点意思，match这个词也挺好看，那么它是干啥的呢？PHP8 alpha2发布了，最近引入了一个新的关键字：match, 这个关键字的作用跟switch有点类似。

这个我觉得还是有点意思，match这个词也挺好看，那么它是干啥的呢？</textarea>

</template>

<script lang='ts'>
import { computed, defineComponent, inject, ref, watch} from 'vue'
import { useStore } from 'vuex'
import { readReeditContent } from '../../../utils/sessionStorageUtils'

export default defineComponent({
  name:'EditContent',

  setup(){

    const store = useStore()
   
    const contentInput =  ref(readReeditContent()?readReeditContent().content.replace(/<br>/g,'\n').replace(/\&nbsp\;/g,' '):store.state.content) //反编译 将相关换行 空格标签编译为文本格式
//  content=content.replace(/\n/g,'<br>')..replace(/<br>/g,'\n').replace(/\&nbsp\;/g,'\s')
//         content=content.replace(/\s/g,'&nbsp;')

    watch(contentInput,(content)=>{//同步输入内容至vuex
    //  console.log('编辑框输入内容变了');
    //  console.log(content);
      store.commit('changeContent',content)
    })
    
    const newimagename:any=inject('imagename')
    watch(newimagename,(newimagename)=>{
      // console.log(newimagename,'变了');
      contentInput.value=contentInput.value+'\n'+newimagename+'\n'//将其在一起拼接 并且显示出来
    })

    return{
      contentInput
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
    height: 80vh;
    caret-color: #24238a;
    outline:rgba(110, 110, 110, 0.3) 2px solid;
    border: none;
    resize: none;
  }
  .content:focus{
    border: none;
  }

</style>