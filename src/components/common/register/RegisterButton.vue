<template>
   <button class="registerbutton"  title="点我注册" @click="clickregisterin" v-if="!isregisterok" :disabled="!registerClickable">注册</button>
   <button class="registerbutton1" title="点我退出"  v-if="isregisterok" @click="exitclick"></button>
   <Register :isregister="isregister" :setisregister="setisregister" ref="registerref"/>
</template>

<script lang='ts'>
import {computed, defineComponent,ref, watch} from 'vue'
import Register from "./Register.vue"
import {saveUser,readUser, clearUser} from '../../../utils/localStorageUtils'
import userInfo from '../../../types/userInfo'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { removeList } from '../../../utils/sessionStorageUtils'

export default defineComponent({
  name:'RegisterButton',
  components:{Register},
  setup(){
    const isregister = ref(false)
    const isregisterok = ref(Boolean(readUser()))//如果localsession不存在，islogok为false  
    const store = useStore()
    const router = useRouter()
    const registerClickable =computed(()=>store.state.registerClickable)//动态获取store属性 按钮可点击状态
    watch(isregister,(param)=>{
      store.commit('registerclick',!param)

    })//观察isregister变化，调整login的可按状态
    watch(isregisterok,(param)=>{
      store.commit('loginOkStatus',!param)
 //这里通过登录修改的按钮状态会造成与login小绿点不匹配的情况
    })//观察isregisterok变化，isregisterok OK的话，registerVisible调整为不可见false

    function clickregisterin(){
      isregister.value = true
      
    }
    function setisregister(user:userInfo|null){//接收register界面的激发，转为登录状态
      if (user) {saveUser(user)//保存用户本地登录信息 如果输入存在
      isregisterok.value = true
      
      }//将登录OK状态转为ok
      else {
        isregister.value = false
        }//否则 为关闭按钮激发时间，将登录状态改为false、登录界面
    } 
    const exitclick = ()=>{
      clearUser()
      removeList()      
      router.go(0)
    }   
    return{
      clickregisterin,isregister,isregisterok,setisregister,registerClickable,exitclick
    }
  }
})
</script>

<style scoped>
    .registerbutton{
    background-color: antiquewhite;
    border-radius: 10px ;
    width: 50px;
    height: 20px;
    position: absolute;
    right: 4vw;
    top: 100px;
    border: none;
  }
  .registerbutton:hover{
    background-color: bisque;
  }
    .registerbutton1{
    background-color: green;
    border-radius: 50% ;
    right: 10px;
    height: 20px;
    width: 20px;
    position: absolute;
    right: 5vw;
    top: 60px;
    border: none;
  }
  .registerbutton1:hover{
    background-color: rgb(0, 196, 0);
  }
  @media screen {
    @media(max-width: 698px){
      .registerbutton{
        top: 60px;
      }
    }
  }
</style>