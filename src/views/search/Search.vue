<template>

  <Summary :articles="articles" @nexticonClick="nexticonClick"/>

</template>

<script lang='ts'>
import { computed, defineComponent} from "vue";
import Summary from "../../components/content/content/Summary.vue";

import {reactive, ref, watch } from "vue";
import { getlogin } from "../../network/login"; //首页登录校验账号
import { readUser } from "../../utils/localStorageUtils";
import {readSearchContent, saveMenulist,saveRouterlist} from "../../utils/sessionStorageUtils";
import { useStore } from "vuex";
import { PublishInfo } from "../../types/publishInfo";
import {searchforArticle} from '../../network/searchforArticle'
export default defineComponent({
  name: "Search",
  components: { Summary },
  setup() {
   
     const store = useStore();
     const userinfo = readUser();
     const articles = reactive<{ result: PublishInfo[] }>({ result: [] });
     const currentpage = ref(0);
  if (userinfo)
    getlogin(userinfo).then((res) => {
      //以local信息校验登录
      store.commit("checkUserPermission", res.data.title); //把界面栏目依据权限更新
      store.commit("checkUserRouter", res.data.router); //把界面栏目依据权限更新
      saveMenulist(res.data.title);
      saveRouterlist(res.data.router);
    });
    const searchInput = computed(()=>store.state.searchContent)
    watch(searchInput,()=>{
      if(searchInput.value.length<2) return null
      
        searchforArticle(searchInput.value).then(res=>{//搜索内容变更时裸奔一次，获取page1的内容 实现search页面实时更新
      if (res.data.searchResult.length==0) return alert('没有搜到相关内容')
      articles.result =res.data.searchResult  
      store.commit('setSearchCount',res.data.searchResult.length)//将请求到的搜索数量存入
  })
   })
    searchforArticle(readSearchContent()).then(res=>{//重载时使用本地会话存储先裸奔一次，获取page1的内容 后刷新
    if (res.data.searchResult.length==0) return alert('没有搜到相关内容')
    articles.result =res.data.searchResult  
     store.commit('setSearchCount',res.data.searchResult.length)//将请求到的搜索数量存入
  })   

    watch(currentpage, (currentpage) => {
     
      searchforArticle(readSearchContent(),currentpage).then(res=>{//后面点击触发 加载 本地会话存储搜索的更多页面
      if (res.data.searchResult.length==0) return alert('没有更多内容了')
 
      articles.result=articles.result.concat(res.data.searchResult as PublishInfo[])      //与新请求的列表连接起来
       store.commit('setSearchCount',res.data.searchResult.length)//将请求到的搜索数量存入
    })
  });

  const nexticonClick = () => {
    currentpage.value += 1;
    // setTimeout(()=>{getBSandRefresh()},1000)
  };
 
  return {
    articles,
    nexticonClick,
  };
  },
});
</script>

<style scoped>

</style>