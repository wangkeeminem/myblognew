<template>

  <Summary :articles="articles" @nexticonClick="nexticonClick"/>

</template>

<script lang='ts'>
import {defineComponent} from "vue";
import Summary from "../../components/content/content/Summary.vue";
import summuryViewSetup from "../../utils/summuryViewSetup";
export default defineComponent({
  name: "Other",
  components: { Summary },
  setup() {
    return summuryViewSetup('/other')
  },
});
</script>

<style scoped>

</style>