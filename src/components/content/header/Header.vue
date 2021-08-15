<template>
  <div class="headercontainer" >

  </div>
  <div class="headercontainer2" :class="flattenContainer?'flattenContainer':''">
    <a class='title' href="javascript:;" title="KE's Blog" @click="titleclick">王克的个人博客</a>
    <Controlbar class="Controlbar2" @itemclick="itemclick" @barFlatten="barFlatten"/>
    <LoginButton v-if="loginAndRegister"/>
    <RegisterButton v-if="registerVisible&&loginAndRegister"/>
  </div>
</template>

<script lang='ts'>
import {computed, defineComponent, ref,} from 'vue'
import Controlbar from '../../common/controlbar/Controlbar.vue'
import LoginButton from 'components/common/login/LoginButton.vue'
import RegisterButton from 'components/common/register/RegisterButton.vue'
import {savechoice} from '../../../utils/sessionStorageUtils'
import {useRouter} from 'vue-router'
import { useStore } from 'vuex'
import { readUser } from '../../../utils/localStorageUtils'

export default defineComponent({
  name:'Header',
  components:{
    Controlbar,LoginButton,RegisterButton
    },
  setup(){
    const store = useStore()
    const registerVisible = computed(()=>store.state.registerVisible)
     
    const loginAndRegister = ref(false||readUser())
    const darkWord = ref('')
    const router = useRouter()
    const flattenContainer = ref(false)
    function itemclick(index:[number,string]){//接收controlbar的click事件 跳转响应路由，储存至本地index 防止重载时出错
   
      router.push(index[1]); //根据选择的index获取目录路由，跳转至响应路由
      savechoice(index[0])//为了重载时维持正确？
      store.commit('setArticleMode',false)//通过点击跳转后，回到summury模式
      } //获取选中的index,并更新主页的currentindex
      function barFlatten(payload:boolean){
        flattenContainer.value=payload
      }
      const titleclick = ()=>{
        router.go(0)
      }
      document.addEventListener('keypress',(e:KeyboardEvent)=>{
        darkWord.value+=e.key
        if(darkWord.value.match('login\\*')){
          loginAndRegister.value=true
        }
      })
    return{
      itemclick,registerVisible,barFlatten,flattenContainer,titleclick,loginAndRegister
    }
  }
})
</script>

<style scoped>
  .title{
    z-index: 100;
    color:white;
    position: absolute;
    font-size: 30px;
    left: calc(5vw + 10px);
    top: 60px;
    transform: translateY(-50%);
  }
  .title:hover{
    color:rgb(190, 190, 190);
  }
  .title::after{
    content:'\8fd9\662f\6211\7684\4e2a\4eba\535a\5ba2\ff0c\7528\6765\5199\4e00\4e9b\5305\542b\4e14\4e0d\9650\4e8e\5b66\4e60\603b\7ed3\4e4b\7c7b\7684'; 
    /* content:'这里没啥好看的 除了一堆代码和学习总结 今天被百特思高搞死';  */
    color:rgb(184, 184, 184);
    font-size: 14px;
    font-weight: 100;
    margin-left: 10px;
  }
  

  .headercontainer{
    position: relative;
    width: 100vw;
    height: 240px;
    background-color: #333333;
    
  }
  .headercontainer2{
    position: absolute;
    top: 0;
    width: 100vw;
    height: 150px;
    background-color:  #333333;
    z-index: 100;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  .Controlbar2{
    position: absolute;
    z-index: 100;
    left: 5vw;
    top: 120px;
    transform: translateY(-50%);
  }
  @media screen {
    @media (max-width:698px){
      .title{
        width: 70vw;
      }
      .title::after{
        display: block;
        margin-left: 0;
      }
      .headercontainer2.flattenContainer{
        height: 420px;
        background-color: #333333;
        z-index: 101;
        opacity: 0.5;
      }
      .headercontainer2{
        height: 160px;
        background-color: #333333;
        z-index: 101;
        overflow: hidden;
      }

    }
    
  }
</style>