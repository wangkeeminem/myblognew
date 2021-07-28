<template>
<!-- :commentsList="item.thread" -->
  <div
    class="commentsThreadList"
    v-for="(item, index) in commentsList"
    :id="item.publishtime"
    :key="item.publishtime"
  > 
  
    <div class="commentsList" :id="item.userid=='wangke'?'VIP':''">
      <DeleteIcon  @click="deleteClick(item._id?item._id:item.publishtime,articleId,item,$event)"/>
      <span class="userInfo"
        ><a href="javascript:;" title="userinfo"
          >{{ item.userid + "  " }}
          <span class="replytime"
            >{{ item.details.month }} {{ item.details.day }},{{
              item.details.year
            }}</span
          ></a
        ></span
      >
      <span class="reply"
        ><a
          href="javascript:;"
          title="reply"
          @click="replyClick(item.publishtime, $event)"
          >Reply</a
        ></span
      >
      <div class="content">{{ item.content }}</div>
    </div>
    <OneCommentsContent :replyClick="replyClick" :item="item.thread" >
      </OneCommentsContent>
    <!-- :commentsList="item.thread" -以上是主题部分的展示-->

  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent} from "vue";
import OneCommentsContent from './OneCommentsContent.vue'
// import  comments from '../../../types/commentslist'
// const DeleteIcon = defineAsyncComponent(()=>import('../../../components/common/delete/DeleteIcon.vue'))
import DeleteIcon from '../../../components/common/delete/DeleteIcon.vue'
import {deleteComment} from '../../../network/deleteComment'
export default defineComponent({
  name: "CommentsContent",
  components:{OneCommentsContent,DeleteIcon},
  props: {
    commentsList: {
      type: Array,
      required:false,
    },
    publishclick: {
      type: Function,
      required: false,
    },
    articleId:{
      type:String,
      required: false,
      default:''
    }
  },
  setup(props) {
    const replyClick = (payload: number, event: Event) => {
      //把代表帖子id的publishtime传给发布函数
      
      ;(props.publishclick as Function)(payload);
    };
    const deleteClick = (id:number,articleId:string, event: Event)=>{
      console.log(id,'主留言被点了');
      console.log(articleId,'这是文章的publishtime');
      if(confirm('确定要删除吗？'))
      deleteComment(id,articleId)

    }
    return {
      replyClick,deleteClick
    };
  },
});
</script>

<style scoped>
.commentsList {
  position: relative;
  width: 55vw;
  height: auto;
  left: 5vw;
  top: -30px;
  padding: 35px 3vw;
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 1px solid;
  font-size: 1vw;
  white-space: pre-wrap;
  /* overflow: hidden; */
  margin-bottom: 18px;
      -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}

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
#VIP{
  border-color: gold;
}
@media screen {
  @media (max-width: 1000px) {
    .commentsList {
      width: 84vw;
      padding: 10px 3vw;
       font-size: 2vw;
    }
    .content{
      font-size: 2vw;;
    }
  }
}
</style>