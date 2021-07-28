<template>
<div  v-for="(item1, index1) in item">
  <div
    :id="item1.userid=='wangke'?'VIP':''"
    :class="'thread' + item1.layer"  
    :style="currentWidth?{width:55-item1.layer+'vw',left: 5+item1.layer+'vw'}:{width:81-item1.layer+'vw',left: 8+item1.layer+'vw'}"
    v-if="item1.thread != []"
    :key="item1.publishtime"
  > 
  
  
      <span class="userInfo"
        ><a href="javascript:;" title="userinfo"
          >{{ item1.userid + "  "}}
          <span class="replytime"
            >{{ item1.details.month }} {{ item1.details.day }},{{
              item1.details.year
            }}</span
          ></a
        ></span
      >
    <span class="reply"
      ><a
        href="javascript:;"
        title="reply"
        @click="replyClick(item1.publishtime, $event)"
        >Reply</a
      ></span
    >
    <div class="content">{{ item1.content }}</div>
  </div>
  <!-- :style="currentWidth?{width:55-item1.layer+'vw',left: 5+item1.layer+'vw'}:''" -->
  <!-- :{width:81-item1.layer+'vw',left: 8+item1.layer+'vw'} -->
  
    <OneCommentsContent  :replyClick="replyClick" :item="item1.thread"></OneCommentsContent>
  
  </div>
</template>

<script lang='ts'>

import {debounce} from '../../../utils/debounce'
import {  defineComponent,  ref} from "vue";
import DeleteIcon from 'components/common/delete/DeleteIcon.vue'
export default defineComponent({
  name: "OneCommentsContent",
  props:{
    replyClick:{
      type:Function,
      required:true
    },
    item:{
      type:Array,
      // required:true
    }
  },
  components:{DeleteIcon},
  setup(props) {
    const replyClick=(publishtime:number, event:any)=>{
       props.replyClick(publishtime,event)//通过父组件 执行reply动作
    }
    
    const currentWidth = ref(innerWidth>1000)
    debounce(addEventListener('resize',(ev)=>{
      currentWidth.value=(ev.currentTarget as Window).innerWidth>1000
    }))


    
    return {replyClick,currentWidth};
  },
});
</script>

<style scoped>
.userInfo {
  font-weight: 900;
}
.reply {
  float: right;
  font-weight: 900;
}
.reply:hover {
  opacity: 0.8;
}
.replytime {
  font-weight: 100;
}
.content {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  padding-top: 10px;
  line-height: 2;
  font-size: 1.2vw;
  font-weight: 100;
  white-space: pre-wrap;
  height: auto;
}
.content:hover {
  background-color: rgb(248, 248, 248);
}

[class^=thread] {
  position: relative;
  width: 54vw;
  height: auto;
  left: 6vw;
  top: -40px;
  padding: 35px 3vw;
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 1px solid;
  font-size: 1vw;
  white-space: pre-wrap;
  overflow: hidden;
  margin-bottom: 8px;
      -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}

#VIP{
  border-color: gold;
}
@media screen {
  @media (max-width: 1000px) {
    [class^=thread] {
      width: 80vw;
      padding: 10px 3vw;
      left: 9vw;
      font-size: 2vw;
          -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    }
        .content{
      font-size: 2vw;;
    }
   
  }
}
</style>