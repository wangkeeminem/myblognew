<template>
  <div
    class="totalSearch"
    :class="visible ? 'visible' : 'unseen'"
    
  >
    <input
      type="text"
      class="searchInput"
      :class="visible ? 'visible' : 'unseen'"
      :disabled=!visible
      v-model="searchInput"
      ref="INPUT"
      @keyup.enter="searchEnter"
      placeholder="请输入关键词"
    />
    <div>
      <p class="resultCount"  :style="{color:countHidden?'transparent':''}">{{searchCount}}</p>
    <img
      class="searchIcon"
      src="/src/assets/img/search1.svg"
      alt="searchIcon"
      @click="searchIconClick"
    /></div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {  saveSearchContent } from "../../../utils/sessionStorageUtils";

export default defineComponent({
  name: "SearchBar",
  setup() {
    const store = useStore()
    const router = useRouter()
    const visible = ref(false);
    const INPUT = ref<HTMLElement|null>(null)
    const searchInput = ref('')
    const countHidden = ref(true)
    const searchIconClick = (event:MouseEvent) => {   
      console.log('点击了') ;
      visible.value = !visible.value;
      if(!searchInput.value){//如果搜索输入不为0
      console.log('点击了1',INPUT.value)
        countHidden.value = true
        return null}
      else if (!visible.value){//如果是隐藏状态的点击进入
        console.log('搜索');
        searchInput.value = searchInput.value.trim()
        if(searchInput.value.length<2)
        {
        visible.value = true
        return alert('请不要输入小于2个字符\n你确定你要搜索什么吗？')}
        countHidden.value = false
        router.push('/search')
        store.commit('setSearchContent',searchInput.value)
        store.commit('setArticleMode',false)
        saveSearchContent(searchInput.value)
        // searchforArticle(searchInput.value)//在search页提交服务器搜索       
        searchInput.value = ''
      }
      else{
        console.log('进入搜索')
        countHidden.value = false
        //check article请求 先不写
        }
    };
    const searchEnter = ()=>{
        console.log('搜索')
        searchInput.value = searchInput.value.trim()
        if(searchInput.value.length<2)return alert('请不要输入小于2个字符\n你确定你要搜索什么吗？')
        // console.log(searchInput.value);
        countHidden.value = false
         router.push('/search')
        store.commit('setSearchContent',searchInput.value)
        store.commit('setArticleMode',false)
        saveSearchContent(searchInput.value)
        // searchforArticle(searchInput.value)//在search页提交服务器搜索
        searchInput.value = ''
        visible.value = false
        return false
    }
    watch(visible,(newVal,oldVal)=>{
       if(newVal) 
       {
         ;(INPUT.value as HTMLElement).autofocus=true
       } 
       else console.log('当前的input',INPUT.value)
    })
    watch(INPUT,(newVal,oldVal)=>{
      console.log('input变了')

      console.log(newVal,oldVal)
    })
    const searchCount = computed(()=>store.state.searchCount)
    return { searchIconClick, visible ,searchInput ,INPUT,searchEnter,searchCount,countHidden};
  },
});
</script>

<style scoped>
.searchInput {
  width: 18vw;
  height: 50px;
  /* position: absolute; */
  outline-color: rgb(143, 142, 139);
  border: rgb(221, 221, 221) 1px solid;
  border-radius: 4px;
  font-size: 20px;
}
.totalSearch {
  display: flex;
  position: absolute;
  justify-content: space-around;
  width: 22vw;
  height: 50px;
  right: 5vw;
  top: 200px;
  padding: 15px 1vw;
  font-size: 1.2vw;
  font-weight: 900;
  line-height: 50px;
  background-color: white;
    border: rgba(100, 100, 100, 0.2) 2px solid;
  /* border: rgba(100, 100, 100, 0.2) 2px solid; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 101;
}
.searchIcon {
  /* position: absolute; */
  height: 45px;
  right: 1vw;
}
.searchIcon:hover{
  opacity: 0.7;
}
.resultCount{
  position: absolute;
  transform: translateY(-50%);
  top: 40%;
  right: 2.6vw;
  font-size: 1.2vw;
  line-height: 1.2vw;
}
 @media screen {
  @media (max-width: 1000px) {
    .totalSearch {
      top: 85px;
      right: 9vw;
    }
    .resultCount{
    top: 33px;
    right: 3.0vw;
  }
    
  }
} 
@media screen {
  @media (max-width: 950px) {
    .searchIcon {
      height: 30px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

    .totalSearch.visible {
      width: 85vw;
      left: 50%;
      transform: translateX(-50%);
      background-color: transparent;
      border: 1px solid rgba(100, 100, 100, 0.1);
      box-shadow: rgba(241, 241, 241, 0.2) 1px 1px;
      border-radius: 10px;
    }
    .searchInput.visible {
      width: 65vw;
      background-color: transparent;
      border: none;
      background-color: white; /* display: none; */
    }

    .totalSearch.unseen {
      width: 45px;
      left: 50%;
      transform: translateX(calc(-50% + 35vw));
      display: hidden;
      background-color: transparent;
      border:none;
    }
    .searchInput.unseen {
      width: 0vw;
      background-color: transparent;
      border: none;
      display: hidden;
      /* background-color: white; */
      background-color: transparent;
    }
    .resultCount{
      color:red;
       top: 54%;
       left: 50px;
       font-size: 4vw;
  }
  }
}


</style>