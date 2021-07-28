<template>
  <span class="details"
    >Published on
    <a href="#" title="time" class="time">{{ day }} {{ month }} {{ year }} </a> by
    <a href="#" title="author" class="author"> {{ author }}</a></span
  >
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, watch } from "vue";
import monthTable from "../../../utils/monthTable";
import { readUser } from "../../../utils/localStorageUtils";
import { useStore } from "vuex";
export default defineComponent({
  name: "EditDetails",
  setup() {
    const store = useStore();
    const date = new Date();
    const day = ref(date.getDate());
    const month = ref(monthTable[date.getMonth()]);
    const year = ref(date.getFullYear());
    const author = ref(readUser().username);
    // console.log(author);
    const details = reactive({ day, month, year, author });
    store.commit("changeDetails", details);
    //这里detail是依据环境而改变的,每次组件加载都应该是最新状态(除了author)
    //不需要实时监控
    return {
      day,
      month,
      year,
      author,
      details,
    };
  },
});
</script>

<style scoped>
.time,
.author {
  font-size: 12px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: 100;
  text-decoration: underline;
}
.details {
  font-size: 12px;
}
</style>