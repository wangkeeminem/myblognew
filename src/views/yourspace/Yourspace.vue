<template>
  <YourSpaceHeader :headerOpacity="headerOpacity" :userName="userName" v-if="headerOpacity>0&&userName"/>
  <YourSpaceHeader :headerOpacity="headerOpacity" :userName="userName" v-if="!(headerOpacity>0&&userName)"/>
  <br>
  <Summary :articles="articles"  @myspaceScrollHeight="myspaceScrollUp" v-if="userName"/>
</template>

<script lang='ts'>
import {defineComponent, reactive, ref} from "vue";
import Summary from "../../components/content/content/Summary.vue";
import YourSpaceHeader from './yourSpaceHeader/YourSpaceHeader.vue';
import { readUser } from "../../utils/localStorageUtils";
import publishInfo from "../../types/publishInfo";
import { openAndReadAllArticles } from "../../utils/indexedDBArticle";

export default defineComponent({
  name: "Yourspace",
  components: { Summary,YourSpaceHeader},
  setup() {
    const headerOpacity=ref(1)//设置header透明度，根据滚动而改变透明度 只对移动段有效

   const articles = reactive<{ result: publishInfo[] }>({ result: [] });//新建article响应数据
   openAndReadAllArticles().then(res=>
   {if (res) {    
       articles.result= (res as any)

       articles.result.sort((a:any,b:any)=>b.publishTime-a.publishTime)

   }}
   )//从数据库获取数据 保存到变量中
 

  
  const myspaceScrollUp = (height:number)=>{
      headerOpacity.value = (height+220)/220 //220为移动端header头部的高度 
    }
   if(!readUser()) alert('您需要登录之后才能使用此功能')
   const userName = ref(readUser()?readUser().username:'');
    return {myspaceScrollUp,userName,headerOpacity,articles}
  },
});
</script>

<style scoped>

</style>