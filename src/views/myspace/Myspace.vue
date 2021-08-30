<template>
  
  <h2 v-if="!editPermission">这是老大的私享空间,你能找到这儿已经很了不起了，做我徒弟吧！</h2>
  <!-- <Article/> -->
  <Suspense>
    <template #default>
      <MyEdit v-if="editPermission"/>
    </template>
        <template v-slot:callback>
       <h2>loading...编辑器首次加载较慢，请耐心等待</h2>
    </template>
  </Suspense>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent, ref} from 'vue'
import Article from 'components/content/content/Article.vue'
// import MyEdit from 'components/content/edit/MyEdit.vue'
const MyEdit = defineAsyncComponent(()=>import('components/content/edit/MyEdit.vue'))
import {readMenulist} from '../../utils/sessionStorageUtils'
export default defineComponent({
  name:'Myspace',
  components:{Article,MyEdit},
  setup(){
    const editPermission=ref(false)//默认edit不显示
    if(readMenulist())
      {editPermission.value = readMenulist().includes('博主耕田')}//如果有session信息，判断是否有博主耕田这一栏
    return{
      editPermission
    }
  }
})
</script>

<style scoped>
  
</style>