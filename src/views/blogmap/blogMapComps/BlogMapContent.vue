<template>
  <div class="totalBlogmapPage">
    <div class="BlogmapHeader">
      <div class="title">实验基地</div>
      <div class="content">
        这里是<strong>KE</strong>的个人实验基地，会不定期放一些作品展示，欢迎小伙伴前来交流讨论！
      </div>
    </div>
  </div>
  <div class="blogmapitems">
    <BlogMapItem class="blogmapitem" />
    <BlogMapItem class="blogmapitem" />
    <BlogMapItem class="blogmapitem" />
    <BlogMapItem class="blogmapitem" />
    <BlogMapItem class="blogmapitem" />
    <BlogMapItem class="blogmapitem" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import BlogMapItem from "./BlogMapItem.vue";
export default defineComponent({
  name: "BlogMapContent",
  components: { BlogMapItem },
  // setup(){

  //   return{

  //   }
  // }
});
</script>

<style scoped>
.BlogmapHeader {
  position: relative;
  width: 55vw;
  left: 5vw;
  top: -70px;
  padding: 30px 3vw;
  height: 100px;
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.title {
  font-size: 1.8vw;
  line-height: 1.8vw;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: 200;
}
.content {
  position: static;
  white-space: pre-wrap;
  height: 150px;
  font-size: 1.2vw;
  line-height: 2;
  font-weight: 100;
  margin-top: 25px;
}

::-webkit-scrollbar-button {
  display: none;
  border-radius: 4px 4px;
}
::-webkit-scrollbar {
  background-color: rgb(223, 223, 223);
  box-sizing: content-box;
  border-radius: 4px 4px;
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(235, 235, 235);
  border-radius: 4px 4px;
  height: 20px;
  width: 20px;
  border-radius: 4px 4px;
  opacity: 0.2;
}
::-webkit-scrollbar:horizontal {
  display: none;
}
.blogmapitems {
  display: flex;
  width: 61vw;
  flex-wrap: wrap;
  justify-content: space-between;
}
.blogmapitem {
  margin-bottom: 20px;
}
.hidden {
  width: 100vw;
  height: 100vh;
}
@media screen {
  @media (max-width: 1000px) {
    .BlogmapHeader {
      width: 84vw;
      height: 160px;
    }
    .blogmapitems {
      display: flex;
      width: 90vw;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>