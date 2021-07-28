<template>
  <div class="article">
    <Title />
    <Details />
    <Content />
    <Tag />
  </div>

  <!-- <h2>这是summury</h2> -->
</template>

<script lang='ts'>
import { defineComponent } from "vue";
// import Title from './Title.vue'
import Title from "components/content/content/Title.vue";
import Details from "components/content/content/Details.vue";
import Content from "components/content/content/Content.vue";
import Tag from "components/content/content/Tag.vue";
export default defineComponent({
  name: "Article",
  components: {
    Title,
    Details,
    Content,
    Tag,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.article {
  width: 750px;
  position: relative;
  left: 5vw;
  top: -100px;
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;
  padding: 30px 60px;
  margin-bottom: 20px;
}
.article:hover {
  background-color: rgb(248, 248, 248);
}
</style>