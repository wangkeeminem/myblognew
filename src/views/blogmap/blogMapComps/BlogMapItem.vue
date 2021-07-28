<template>
  <div class="totalBlogmapItemPage">
  <div class="BlogmapItemHeader">
    <div class="title">实验基地</div>
    <div class="content">暂未开放</div>  
  </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
  name:'BlogMapItem',
  setup(){
    
    return{
      
    }
  }
})
</script>

<style scoped>
 .BlogmapItemHeader {
  position: relative;
  width: 15vw;
  left: 5vw;
  top: -30px;
  padding: 20px 2vw;
  height: calc(15vw * 0.6);
  background-color: white;
  border: rgba(100, 100, 100, 0.2) 2px solid;
      -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
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

  ::-webkit-scrollbar-button{
    display: none;
    border-radius: 4px 4px;
  }
  ::-webkit-scrollbar{
    background-color: rgb(223, 223, 223);
    box-sizing: content-box;
    border-radius: 4px 4px;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb{
    background-color:rgb(235, 235, 235);
    border-radius: 4px 4px;
    height: 20px;
    width: 20px;
    border-radius: 4px 4px;
    opacity: 0.2;
  }
   ::-webkit-scrollbar:horizontal{
     display: none;
   }

  @media screen {
  @media(max-width:1000px){
    .BlogmapItemHeader{
      width: 35vw;
       height:30vw;
       padding: 3vw 3vw;
    }
    

  }
} 
</style>