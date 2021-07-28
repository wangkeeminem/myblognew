<template>
  <div v-if="iconVisible" class="deleteicon" title="点我删除">⚔</div>
</template>

<script lang='ts'>
import {computed, defineComponent, ref} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { readMenulist } from '../../../utils/sessionStorageUtils'

export default defineComponent({
  name:'DeleteIcon',
  setup(){
    const store=useStore()
    const route = useRoute()
    const permission=readMenulist().length
    const iconVisible = ref(permission>7||route.path=='/yourspace') //如果栏目多于7个或者route路径为yourspace 则显示删除权限 
    
    return{
      iconVisible
    }
  }
})
</script>

<style scoped>
  .deleteicon{
    position: absolute;
    right:2vw;
    font-size: 2vw;
    top:0px
  }
  .deleteicon:hover{
    font-weight: 900;
  }

</style>