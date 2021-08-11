<template>

  <CommentsHeader :Totalcomments=" Totalcomments" v-if="isDownload"/>

</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
// import CommentsHeader from './commentsComps/CommentsHeader.vue'
const CommentsHeader = defineAsyncComponent(() => import("./commentsComps/CommentsHeader.vue"));
import { getComments } from "../../network/getComments";
import { getlogin } from "../../network/login";
import comments from "../../types/commentslist";
import { readUser } from "../../utils/localStorageUtils";
import { saveMenulist, saveRouterlist } from "../../utils/sessionStorageUtils";

export default defineComponent({
  name: "Comments",
  components: {
    CommentsHeader},
  setup() {
   
    const userinfo = readUser()
    const store = useStore()
    
    // const articles = reactive<{ result: PublishInfo[] }>({ result: [] });
    if (userinfo)
    getlogin(userinfo).then((res) => {
      //以local信息校验登录
      store.commit("checkUserPermission", res.data.title); //把界面栏目依据权限更新
      store.commit("checkUserRouter", res.data.router); //把界面栏目依据权限更新
      saveMenulist(res.data.title);
      saveRouterlist(res.data.router);
    });

  
    const Totalcomments = reactive<{ result: comments[] }>({
      result: [],
    });
    const isDownload = ref(false)
    onMounted(()=>{
    
      getComments().then((res) => {
      
      Totalcomments.result = res.data.Totalcomments as comments[]
       isDownload.value = true
    });
    
    })


    return {
      Totalcomments,isDownload
    };
  },
});
</script>

<style scoped>
</style>