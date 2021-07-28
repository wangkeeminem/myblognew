<template>
  <span class="tags"
    >Filed in
    <span class="taglist" v-for="(item, index) in tags" :key="item" v-show="!yourSpaceMode&&index>=1&&index<5">
      <a
        title="tagitem"
        href="javascript:;"
        class="tagitem"
        :class="isChoice[index] ? 'isChoice' : ''"
        @click="choicetag(index)"
      >
        {{ item + " " }}</a
      >
    
</span>
    <span class="taglistForUsers"  v-for="(item,index) in tagList"  :key="item" v-show="yourSpaceMode">
        <span class="tagitem">
        {{ item + " " }}</span> </span>
    
    <input class="tagitemForUsers" :placeholder="'tag'+(tagList.length+1)" v-model="tagInput" v-show="yourSpaceMode">
    <a  @click="addTags"
        href="javascript:;"
        title="addTags"
      >
        <img src="/src/assets/img/plus.svg" class="plusIcon" alt="plusicon" v-show="yourSpaceMode">       
        </a>
    <a  @click="minusTags"
        href="javascript:;"
        title="minusTags"
      >
        <img src="/src/assets/img/minus.svg" class="minusIcon" alt="minusicon" v-show="yourSpaceMode">       
        </a>
 </span>   
  
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { readMenulist, readReeditContent } from "../../../utils/sessionStorageUtils";
// tagChoice

export default defineComponent({
  name: "EditTag",
  emits:{
    addTags:(payload:string[])=>{
      return true 
    }
  },
  setup(props, context){
    const store = useStore();
    const tags = reactive(readMenulist());
    const isChoice = readReeditContent().tagChoice?ref(readReeditContent().tagChoice):store.state.tagChoice;
    const tagList = ref<string[]>([])
    const tagInput = ref('')
    const yourSpaceMode = ref(useRoute().path=='/YourEditSpace')//当前浏览模式 个人空间还是 博客文章
    console.log(useRoute().path,yourSpaceMode)
    function choicetag(index: number, event: Event) {
      console.log('点了第',index);
      store.commit("changeTagChoice", index);
      isChoice.value = computed(()=>store.state.tagChoice).value
    }
    const addTags = ()=>{
      if(tagInput.value)      
      {tagList.value.push(tagInput.value)
      context.emit('addTags',tagList.value)
      tagInput.value = ''
      }
      else{
        alert('不可以！')
      }
    }
    const minusTags = ()=>{
      tagList.value.splice(tagList.value.length-1)
    }

    return {
      tags,
      choicetag,
      isChoice,
      addTags,
      tagList,
      tagInput,
      minusTags,
      yourSpaceMode
    };
  },
});
</script>

<style scoped>
.tagitem,
.comments {
  font-size: 15px;
  /* font-family:Verdana, Geneva, Tahoma, sans-serif; */
  font-weight: 700;
  text-decoration: underline;
}
.tagitemForUsers{
  width: 30px;
  border: 2px solid #777777;
}

.tags {
  font-size: 12px;
  display: block;
  margin-top: 25px;

}
.isChoice {
  color: red;
}
.plusIcon{
  width: 20px;
  position: absolute;
  margin-left: 5px;
}
.minusIcon{
  width: 20px;
  position: absolute;
  margin-left: 30px;
}
.plusIcon:hover,.minusIcon:hover{
  transform: scale(1.2);
}
</style>