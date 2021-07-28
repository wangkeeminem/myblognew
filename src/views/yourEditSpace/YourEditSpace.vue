<template>
  <!-- <h2 v-if="!editPermission">你是怎么找到这儿的，你是天才吧！做我徒弟吧！</h2> -->
  <MyEdit/>
  <!-- <Article/> -->
</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import MyEdit from 'components/content/edit/MyEdit.vue'

export default defineComponent({
  name:'Myspace',
  components:{MyEdit},
  setup(){
  
    return{
      
    }
  }
})
</script>

<style scoped>
  
</style>