<template>
  <CommentBar  @publishclick="setupComment.publishclick" @launchClick="setupComment.launchClick" @inputAction="setupComment.inputAction" v-if="!yourSpaceMode&&readArticle" :publishVisible="setupComment.publishVisible"/>
  <RefreshUp :backToTop="backToTop" @uprefreshClick="uprefreshClick" v-if="deviceMode=='mobile'"/>
  <Scroll @scroll="scroll" :commentElement="commentElement" :commentsInto="commentsInto">
    <div>
      <div v-if="!readArticle">
        <div
          class="summury"
          v-for="(item, index) in articles.result"
          :key="item._id"
        >
           <DeleteIcon :id="item._id" @click="deleteClick(yourSpaceMode?item.publishTime:item._id,$event)"/>
            <ReeditIcon  @click="reediitClick(item,$event)"/>
          <Title :title="item.title" @click="titleClick(index, $event)" />
          <Details :details="item.details" />
          <Content :content="item.content" />
          <Tag :tagChoice="item.tagChoice" :commenentscount="item.comments?.length" @commentsClick="commentsClick($event,index)"/>
        </div>
        <img
          class="nexticon"
          :class="yourSpaceMode?'yourSpaceMode':''"
          v-if="yourSpaceMode||articles.result.length&&!(articles.result.length%6)"
          @click="nexticonClick"
          :src="yourSpaceMode?'/img/stop.svg':'/img/next.png'"
          alt="nexticon"
          :title="yourSpaceMode?'宇宙的尽头':'加载下一页'"
        />
      </div>

      <div v-show="readArticle">
        <div class="article" ref="commentElement">
          <Title :title="result.title" @click="articleTitleClick" />
          <Details :details="result.details" />
          <Content class="articlecontent" :content="result.content" />
          <Tag :tagChoice="result.tagChoice"  :commenentscount="result.comments?.length"/>
        </div>

        <img
          class="closeicon"
          :class="yourSpaceMode?'yourSpaceMode':''"
          @click="closeiconClick"
          src="../../../assets/img/next.png"
          alt="closeicon"
          title="收起文章"
        />
        <div class="commentsColumn" v-if="!yourSpaceMode">
        <div class="totalComments" >{{setupComment.commenentscount }} Comments</div>
        <CommentsContent
          :articleId="result._id"
          :commentsList="setupComment.commentsList"
          :publishclick="setupComment.publishclick"
        />
        </div>

      </div>
    </div>
  </Scroll>
 
</template>

<script lang='ts'>
import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  toRefs,
} from "vue";
import Title from "components/content/content/Title.vue";
import Details from "components/content/content/Details.vue";
import Content from "components/content/content/Content.vue";
import Tag from "components/content/content/Tag.vue";
import { useStore } from "vuex";
import CommentsContent from '../../../views/comments/commentsComps/CommentsContent.vue'
import DeleteIcon from 'components/common/delete/DeleteIcon.vue'
import ReeditIcon from 'components/common/reedit/ReeditIcon.vue'
import Scroll from '../../common/sroll/Scroll.vue'
import RefreshUp from "./../../common/refreshup/RefreshUp.vue"
import CommentBar from "components/common/commentbar/Commentbar.vue"

import BScroll from "@better-scroll/core";
import { useRoute, useRouter } from "vue-router";
import { commentsSetup } from "../../../utils/commentsSetup";
import {deleteArticle} from '../../../network/deleteArticle'

import publishInfo from "../../../types/publishInfo";
import { savechoice, saveReeditContent, saveReeditImages } from "../../../utils/sessionStorageUtils";
import imageList from "../../../types/imagelist";
import { removeOneArticle } from "../../../utils/indexedDBArticle";
export default defineComponent({
  name: "Summary",
  components: {
    Title,
    Details,
    Content,
    Tag,
    Scroll,
    RefreshUp,
    CommentsContent,
    DeleteIcon,
    ReeditIcon,
    CommentBar
  },
  props: {
    articles: {
      type: Object,
      required: true,
    },
    // Totalcomments:{
    //   type:Object,
    //   default:{}
    // }
  },
  emits: {
    nexticonClick: () => {
      return true;
    },
    myspaceScrollHeight: (payload:number)=>{
      return true
    }
  },

  setup(props, context) {
    onMounted(()=>{
     
      console.log('Mounted时刷新了：',SCROLL);
        (SCROLL.scroll as BScroll).refresh()     
    })
    onUpdated(()=>{   
      console.log('update时刷新了：',SCROLL);
        (SCROLL.scroll as BScroll).refresh()     
    })
    const store = useStore();
    const router = useRouter();
    const readArticle = computed(() => store.state.articleMode); //是否为文章阅读mode
    const articleChoice = reactive({
      result: { title: "", details: {}, content: "", tagChoice: [],publishTime:0,comments:[],_id:''},
    });

    const backToTop = ref(false);
    const SCROLL = reactive({ scroll: {} });
    const setupComment = reactive({setupComment:{} as any})

    const yourSpaceMode = ref(useRoute().path=='/yourspace')//当前浏览模式 个人空间还是 博客文章

    function nexticonClick() {
      context.emit("nexticonClick");
    }
    function titleClick(index: number|string|symbol, event: MouseEvent|null) {

      //当为点击事件而非coment点击事件触发时，将element指定为null
      //点击summury title获取选择的文章的index  摘要模式下，点击title需要记录当前高度
      const tagChoice = props.articles.result[index].tagChoice; //获取文章的tag，header显示跳转
      articleChoice.result = props.articles.result[index]; //获取文章内容
      const titles: number[] = [];

      for (let index in tagChoice) {
        if (tagChoice[index] == true) {
          titles.push(parseInt(index));
        }
      }
      const titleOne = titles[Math.floor(Math.random() * titles.length)];
      if (!yourSpaceMode)//如果是博客文章模式 才会跳转标签
      store.commit("changeHeaderChoice", titleOne); //点击标题 header跳转相应标签
      store.commit("setArticleMode", true); //点击标题 进入文章阅读模式

      setupComment.setupComment = commentsSetup({     
      result:props.articles.result[index].comments?.sort((a:any,b:any)=>b.publishtime-a.publishtime)
      // result:[]  进行排序
      },articleChoice.result.publishTime)//以文章的publishtime作为锚点发送给服务器去寻址
     
    }
    function articleTitleClick(event: MouseEventInit) {
      //文章模式下 跳转 不需要记录位置鼠标点击 需要页面回到原有高度
      store.commit("setArticleMode", false); //文章mode收起,返回为summury模式
    }
    function closeiconClick() {
      store.commit("setArticleMode", false);
    } //文章mode收起图标

    const scrollUp = (positionY: number) => {
      if (-positionY > 1000) {
        backToTop.value = true;
      } else backToTop.value = false;
      //传给yourspace高度数据
      context.emit('myspaceScrollHeight',positionY)
    };
    provide("scrollUp", scrollUp);

    function scroll(scroll: BScroll) {
      //接收scroll发射而来的scroll对象
      SCROLL.scroll = scroll;
    }
    const uprefreshClick = () => {
      if (backToTop.value == false) {
        // router.go(0);
        (SCROLL.scroll as BScroll).refresh();
      } //点的是刷新
      else (SCROLL.scroll as BScroll).scrollTo(0, 0, 600); //点的是回到顶部
    };

     const deleteClick = (deleteId:string|number,event:Event)=>{
      console.log(deleteId,'被点了'); 
      if (!yourSpaceMode.value)//如果不是spaceMode 发送网络请求删除
      {if(confirm('确定要删除吗？'))
      deleteArticle(deleteId as string)}
      else{
        // const index = deleteId.toString()
        if(confirm('确定要删除吗？'))
        removeOneArticle(deleteId as number).then(res=>console.log(res)).catch((rej)=>alert(rej))//以key值去删除
        // console.log(console.log('将要删除的是',deleteId))
      }
      
     } 
    //  ,payload:MouseEvent
    const commentsInto = ref(false)
    const commentElement= ref<HTMLElement|null>(null)
    let COMMENTELEMENT = reactive({commentElement:commentElement.value as HTMLElement})//用于指定跳转时高度的相关元素
     const commentsClick=(payload:MouseEvent,index:number|string|symbol)=>{//点击comment进行跳转
      
       commentsInto.value = !commentsInto.value
       titleClick(index, null);
     }
     const reediitClick = (item:publishInfo,event:Event)=>{

       savechoice(7)
       const reeditImageList:imageList = {} 
       item.content.match(/<img src.*?>/g)?.forEach((val,index,array)=>{
         reeditImageList['editimage'+index] = val//保存页面展示 与实际img标签的键值对
         item.content=item.content.replace(val,'editimage'+index)//页面展示更替
       })
       item.editArticleId = item._id//把原有的_id 给editArticleId _id在传给服务器时需被舍弃
       saveReeditImages(reeditImageList)//保存待编辑图片标签页信息
       router.push('/Myspace').then(()=>{//点击编辑 跳到编辑页 将值保存到会话页面
       saveReeditContent(item)
       }).then(()=>router.go(0))//刷新一下加载（此时已到编辑页）
       
     }
    //切换设备模式
    const deviceMode = computed(()=>store.state.deviceMode)
    
    

    return {
      nexticonClick,
      titleClick,
      articleTitleClick,
      closeiconClick,
      readArticle,
      ...toRefs(articleChoice),
      backToTop,
      uprefreshClick,
      scroll,
      ...toRefs(setupComment),
      deleteClick,
      commentsClick,
      // commentElement,
      ...toRefs(COMMENTELEMENT),
      commentsInto,
      reediitClick,
      deviceMode,
      yourSpaceMode
    };
  },
});
</script>

<style scoped>
.summury,
.article {
  width: 55vw;
  height: 280px;
  /* overflow: hidden; */
  position: relative;
  left: 5vw;
  top: -70px;
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;
  padding: 30px 3vw;
  margin-bottom: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.article {
  height: auto;
}

.article > .articlecontent {
  position: static;
  display: block;
  margin-top: 10px;
  width: 55vw;
  white-space: pre-wrap;
  height: auto;
  /* top:15px; */
  margin-bottom: 40px;
  font-size: 16px;
  line-height: 32px;
  font-weight: 100;
}

.summury:hover {
  background-color: rgb(248, 248, 248);
}
.nexticon {
  height: 40px;
  position: relative;
  left: 35.5vw;
  bottom: 50px;
  transform: rotateZ(90deg) translateY(50%);
  opacity: 0.6;
  margin-bottom: 100px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* ddddddddddddddddd  test margin top ddddddddddddddddddddddd */
}
.nexticon:hover,
.closeicon:hover {
  opacity: 0.2;
}

.closeicon {
  height: 40px;
  position: relative;
  left: 35.5vw;
  margin-top: 120px;
  bottom: 150px;
  transform: rotateZ(-90deg) translateY(-50%);
  opacity: 0.6;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.nexticon.yourSpaceMode{
  margin-bottom: 300px;
}
.closeicon.yourSpaceMode{
  margin-bottom: 300px;
}

@media screen {
  @media (max-width: 1000px) {
    .summury,
    .article {
      width: 84vw;
    }
    .nexticon {
      left: 50vw;
      transform: rotateZ(90deg) translateY(50%);
    }
    .closeicon {
      left: 50vw;
      /* transform: rotateZ(90deg) translateY(50%); */
    }
    .article > .articlecontent {
      width: 84vw;
      height: auto;
    }
  }
}

.totalComments {
  position: relative;
  width: 55vw;
  left: 5vw;
  top: -50px;
  padding: 15px 3vw;
  font-size: 1.2vw;
  font-weight: 900;
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.commentsColumn{
  position: relative;
  top: -40px;
}

@media screen {
  @media (max-width: 1000px) {
    .totalComments {
      width: 84vw;
    }
  }
}
</style>