<template>
  <SearchBar/>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import SearchBar from '../../common/searchbar/SearchBar.vue'
export default defineComponent({
  name:'Aside',
  components:{
    SearchBar
  },
  setup(){
    
    return{
      
    }
  }
})
</script>

<style scoped>

</style>