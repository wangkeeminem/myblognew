<template>
  
  <BlogMapContent/>
  <div class="hidden"></div>
</template>

<script lang='ts'>
import {defineComponent} from "vue";
import BlogMapContent from './blogMapComps/BlogMapContent.vue';
import { getlogin } from "../../network/login"; //首页登录校验账号
// import {getBlogData} from '../../network/getArticleData' //文章的请求
import { readUser } from "../../utils/localStorageUtils";

import {
  saveMenulist,
  saveRouterlist,
} from "../../utils/sessionStorageUtils";

import { useStore } from "vuex";
// import { PublishInfo } from "../../types/publishInfo";
export default defineComponent({
  name: "BlogMap",
  components: { BlogMapContent },
  setup() {
   
    const store = useStore();
    const userinfo = readUser();


    if (userinfo)
      getlogin(userinfo).then((res) => {
        //以local信息校验登录
        store.commit("checkUserPermission", res.data.title); //把界面栏目依据权限更新
        store.commit("checkUserRouter", res.data.router); //把界面栏目依据权限更新
        saveMenulist(res.data.title);
        saveRouterlist(res.data.router);
      });

    // getBlogData().then(res=>{//先裸奔一次，获取page1的内容 后刷新
      
    
    // })



    return {

    };
  },
});
</script>

<style scoped>
  .hidden{
    width: 100vw;
    height: 1000vh;
    background-color:rgb(139, 189, 247);
    position: relative;
    top:-200vh;
    opacity: 0.5;
  }

</style>