<template>
  <textarea class="title" autofocus placeholder="请输入标题" v-model="titleInput"></textarea>
</template>

<script lang='ts'>


import {computed, defineComponent, ref, watch} from 'vue'
import { useStore } from 'vuex'
import { readReeditContent } from '../../../utils/sessionStorageUtils'

export default defineComponent({
  name:'EditTitle',
  props:{

  },
  setup(props){
    const store = useStore()
    // console.log(titleStore);
    const titleInput = ref(readReeditContent()?readReeditContent().title:store.state.title)//注意 这里首次创作内容并没有用到本地化存储，故刷新后不会保留 为了防止vuex的只读报错 规定input与vuex为单向赋值 而不是computed计算属性
    console.log(readReeditContent()?.title);
    watch(titleInput,(title)=>{
      store.commit('changeTitle',title)//同步至vuex
    })

    return{
      titleInput
    }
  }
})
</script>

<style scoped>
  .title{
    font-size: 30px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: 200;
    width: 100%;
    border: none;
    height: 100px;
    line-height: 100px;
    resize: none;
  }
</style>