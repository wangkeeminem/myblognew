<template>
  <span class="tags"
    >Filed in
    <a
      title="tagitem1"
      v-if="!yourSpaceMode"
      href="javascript:;"
      class="tagitem"
      v-for="(item, index) in taglist"
      :key="item"
      v-show="tagChoice[index]"
      @click="tagclick(index)"
      >{{ " " + item + " " }}</a>
    <a
      title="tagitem2"
      v-if="yourSpaceMode"
      href="javascript:;"
      class="tagitem"
      v-for="(item, index) in tagChoice"
      :key="item"
      @click="tagclick(index)"
      >{{ " " + item + " " }}</a>
      <span v-if="!yourSpaceMode">with </span> <a href="#" class="comments" @click="commentsClick($event)"  v-if="!yourSpaceMode"> {{commenentscount}} Comments</a>
      </span
  >
</template>

<script lang='ts'>
import { computed, defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { readMenulist, savechoice} from "../../../utils/sessionStorageUtils";

export default defineComponent({
  name: "Tag",
  props: {
    tagChoice: {
      type: Array,
      // required: true,
    },
    commenentscount:{
      type:Number,
      default:0
    }
  },
  emits:{
    commentsClick:(payload:MouseEvent)=>{return true}
  },
  setup(props,context) {
    const router = useRouter()
    const store = useStore()
    const taglist = ref(readMenulist()?readMenulist():store.state.userPermission);
    const yourSpaceMode = ref(useRoute().path=='/yourspace')
    router.afterEach((to,from,failure)=>yourSpaceMode.value=to.path=='/yourspace')
    function tagclick(index:number){
      if (yourSpaceMode.value) 
      {
      return {}}
      else{
       savechoice(index)
       store.commit('changeHeaderChoice',index)//同步至vuex
       store.commit('setArticleMode',false)//无论什么情况下，点击标签肯定都是回到summury模式
       router.push(store.state.userRouter[index])}
    }
    const commentsClick = (payload:MouseEvent)=>{
     
      context.emit('commentsClick',payload)
    }
    
    return { taglist ,tagclick,commentsClick,yourSpaceMode};
  },
});
</script>

<style scoped>
.tagitem,
.comments {
  font-size: 12px;
  /* font-family:Verdana, Geneva, Tahoma, sans-serif; */
  font-weight: 700;
  text-decoration: underline;
}
.tags {
  font-size: 12px;
  display: block;
  position: absolute;
  bottom: 25px;
  /* position: relative;
    top: 15px; */
}
</style>