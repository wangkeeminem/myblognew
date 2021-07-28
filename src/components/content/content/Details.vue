<template>
  <span class="details"
    >Published on
    <a href="javascript:;" title="time" class="time"
      >{{ details.day }} {{ details.month }} {{ details.year+' ' }} </a
    >by <a href="javascript:;"  title="author"  class="author"> {{ details.author }}</a></span
  >
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Details",
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
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