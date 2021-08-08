<template>
  <div v-if="iconVisible" class="deleteicon">Edit</div>
</template>

<script lang='ts'>
import {computed, defineComponent, ref} from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name:'ReeditIcon',
  setup(){
    const store=useStore()
    const permission=computed(()=>store.state.userPermission.length).value
    const iconVisible = ref(permission>7) //如果栏目多于7个 则显示删除权限
    
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
    font-size: 1.2vw;
    bottom:22px; 
  }
  .deleteicon:hover{
    font-weight: 900;
  }
  @media screen {
    @media(max-width:1000px){
      .deleteicon{
        font-size: 15px;
      }
    }
  }
</style>