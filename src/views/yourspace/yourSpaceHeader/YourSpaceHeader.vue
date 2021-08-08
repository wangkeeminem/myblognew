<template>
  <div class="totalYourspacePage">
    <div class="YourspaceHeader" :style="{ opacity: headerOpacity }">
      <div class="title">个人空间</div>
      <div class="content">
        这里是<strong> {{ userName }}</strong
        >的个人空间，在个人空间里,您可以编写自己的文章，请放心服务器不会进行任何收集，一切都存放在您的本地存储中！
        <br><strong v-if="!canSeeDetails" @click="seeDetails"
          >详情请点我查看
        </strong>
        <strong v-if="canSeeDetails" @click="seeDetails">点我收回 </strong>
        <img
          v-if="canSeeDetails"
          @mousewheel="imgScroll"
          @touchstart="imgTouchStart"
          :style="{ transform: 'scale(' + scrollDistance + ')' }"
          class="seeDetails"
          src="/src/assets/img/userguide.png"
          title="seeDetails"
          alt=""
        />
        <br /><br /><a
          href="javascript:;"
          title="beginBlog"
          @click="beginBlogClick"
          ><span class="beginBlog"
            >开始记录我的个人内容<img
              class="beginBlogIcon"
              src="/src/assets/img/userpublish.svg"
              alt="beginBlog" /></span
        ></a>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>

import { computed, defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import store from "../../../store";

export default defineComponent({
  name: "YourSpaceHeader",
  props: {
    headerOpacity: {
      type: Number,
      requried: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },

  setup() {
    const router = useRouter();
    const canSeeDetails = ref(false);
    const scrollDistance = ref(1);
    const imgTouchStartTime = ref(0)
    const beginBlogClick = () => {
      router.push("/YourEditSpace");
    };
    const seeDetails = (event: Event) => {
      canSeeDetails.value = !canSeeDetails.value;
      scrollDistance.value = 1;
    };
    const imgScroll = (event: WheelEvent) => {
      scrollDistance.value -= event.deltaY / 1000;
      scrollDistance.value =
        scrollDistance.value < 0.5
          ? 0.5
          : scrollDistance.value > 2
          ? 2
          : scrollDistance.value;
      console.log(scrollDistance.value);
      event.preventDefault();
    };
    const imgTouchStart = ()=>{
      console.log('imgTouchStart')
      imgTouchStartTime.value=Date.now()
    }
    watch(imgTouchStartTime,(newval,oldval)=>{
      if(newval-oldval<500)
      scrollDistance.value=scrollDistance.value==2?1:2
      if(scrollDistance.value==2)
      store.commit('setDeviceMode','computer')
      if(scrollDistance.value==1){
       store.commit('setDeviceMode','mobile')
      }
    })

    return {
      canSeeDetails,
      beginBlogClick,
      seeDetails,
      imgScroll,
      scrollDistance,
      imgTouchStart
    };
  },
});
</script>

<style scoped>
.YourspaceHeader {
  position: relative;
  width: 55vw;
  left: 5vw;
  top: -70px;
  padding: 30px 3vw;
  /* height: 100px; */
  
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
  font-weight: 400;
}
.content {
  position: static;
  white-space: pre-wrap;
  /* height: 150px; */
  font-size: 1.2vw;
  line-height: 1.5;
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

.hidden {
  width: 100vw;
  height: 100vh;
}
.beginBlog {
  font-size: 1.8vw;
  line-height: 1.8vw;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: 400;
}
.beginBlog:hover {
  font-weight: 900;
}
.beginBlogIcon {
  height: 1.8vw;
  display: inline-block;
}
.beginBlog:hover .beginBlogIcon {
  transform: scale(1.2);
}
.seeDetails {
  position: absolute;
  margin-top: 40px;
  left:0;
  width: 100%;
  z-index: 999;
}

@media screen {
  @media (max-width: 1000px) {
    .YourspaceHeader {
      width: 84vw;
      /* height: 160px; */
    }
    .beginBlogIcon {
      height: 16px;
    }
    .beginBlog {
      font-size: 14px;
    }
    .content {
      font-size: 3vw;
    }
    .title {
      font-size: 25px;
    }
  }
}
</style>