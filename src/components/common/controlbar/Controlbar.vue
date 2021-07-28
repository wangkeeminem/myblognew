<template>
  <div class="controlbar" :class="barFlatten?'barFlatten':'unflatten'">
    
    <div
      class="controlitem"
      :class="currentindex==index?'currentChoice':'notCurrent'"
      v-for="(item, index) in controlbardata"
      :key="index"
      @click="itemclick(index)"
    >
      <a href="javascript:;">
        <div
          class="itemtext"
          :style="{
            backgroundColor: currentindex == index ? 'black' : '',
            color: currentindex == index ? 'white' : '',
          }"
        >
          {{ item }}
        </div>
      </a>
    </div>
  </div>
</template>

<script lang='ts'>
      // :class="currentindex"
import { computed, defineComponent,  ref } from "vue";
import { useStore } from "vuex";
import {
  readMenulist,
  readRouterlist,
  readchoice
} from "../../../utils/sessionStorageUtils";
// import router from '../../../router/index'
export default defineComponent({
  name: "Controlbar",
  emits:{
    itemclick:(payload)=>{return true},
    barFlatten:(payload)=>{return true}
  },
  props: {
  },
  setup(props, context) {
    const store = useStore();
    const barFlatten = ref(false)
    const controlbardata = readMenulist()
      ? ref(readMenulist())
      : computed(() => store.state.userPermission);
    // const controlbardata = computed(()=>store.state.userPermission)
    const controlbarurl = readRouterlist()
      ? ref(readRouterlist())
      : computed(() => store.state.userRouter);
    store.commit('changeHeaderChoice',readchoice())
    const currentindex = computed(()=>store.state.headerChoice)

   
    const itemclick = function (index: number) {
      context.emit("itemclick", [index, controlbarurl.value[index]]); //事件发送给head 跳转响应路由（思路还是路由事件由上层组件管理）
      store.commit('changeHeaderChoice',index)
      barFlatten.value = !barFlatten.value
      context.emit('barFlatten',barFlatten.value)
    };
    

    return {
      controlbardata,
      itemclick,
      currentindex,
      controlbarurl,
      addEventListener,
      barFlatten
    };
  },
});
</script>

<style scoped>
.controlbar {
  display: flex;
  justify-content: space-between;
}
.itemtext {
  flex: 1;
  color: white;
  margin: 0 8px 0 8px;
  padding: 8px 10px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 300;
  border-radius: 3px;
}
.itemtext:hover {
  background-color: white;
  color: #333333;
}
@media screen {
  @media(max-width:698px){
    .controlbar.barFlatten{
      flex-direction: column;
      text-align: center;
      left: 50vw;
      transform: translateX(-50%);
    }
    .controlbar.barFlatten .itemtext{
      font-size: 20px;
      line-height: 20px;
    }

    .controlbar.unflatten {
      flex: none;
      position:absolute;
      display: block;
      text-align: center;
      left: 50vw;
      transform: translateX(-50%);
      /* display: none; */
    }

    .controlbar.unflatten .currentChoice .itemtext{
      position: relative;
      top: 0;
      font-size: 20px;
      line-height: 20px;
      color: red;
      z-index: 120;
      
    }
    .controlbar.unflatten .notCurrent .itemtext{
      position: relative;
      top: 0;
      font-size: 20px;
      line-height: 10px;
      color: red;
      display:none;
      z-index: 120;

    }
  }

}
</style>