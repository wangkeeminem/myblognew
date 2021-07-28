<template>
   <button class="loginbutton" title="点我登录" @click="clickloginin" v-if="(!isloginok)&&registerVisible" :disabled="!loginClickable">登录</button>
   <button class="loginbutton1"  title="点我退出" v-if="isloginok||!registerVisible" @click="exitclick"></button>
   <Login :islogin="islogin" :setislogin="setislogin" ref="loginref"/>
</template>

<script lang='ts'>
import {computed, ComputedRef, defineComponent, ref, watch} from 'vue'
import Login from './Login.vue'
import {saveUser,readUser,clearUser} from '../../../utils/localStorageUtils'
import userInfo from '../../../types/userInfo'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { removeList } from '../../../utils/sessionStorageUtils'

export default defineComponent({
  name:'LoginButton',
  components:{Login},

  setup(props){
    const store = useStore()
    const router =useRouter()
    const registerVisible = computed(()=>store.state.registerVisible)
 
    const islogin = ref(false)
    const isloginok = ref(Boolean(readUser()))//如果localsession不存在，islogok为false  
    
    const loginClickable =computed(()=>store.state.loginClickable)//动态获取store属性 按钮可点击状态
    watch(islogin,(param)=>{
      store.commit('loginclick',!param)
 
    })//观察islogin变化，调整login的可按状态
    watch(isloginok,(param)=>{
      store.commit('loginOkStatus',!param)
    })//观察isloginok变化，isloginok OK的话，registerVisible调整为不可见false
    
    //如果注册键消失,那么登录键变化为已登录成功状态
    function clickloginin(){
      islogin.value = true
    }
    function setislogin(user:userInfo|null){//接收login界面的激发，转为登录状态
      if (user) {saveUser(user)//保存用户本地登录信息
      isloginok.value = true}//将登录OK状态转为ok
      else islogin.value = false//否则 为关闭按钮激发时间，将登录状态改为false、登录界面关闭
    }
    const exitclick = ()=>{
      clearUser()
      removeList()
      router.go(0)
    }    
    return{
      clickloginin,islogin,isloginok,setislogin,loginClickable,registerVisible,exitclick
    }
  }
})
</script>

<style scoped>
    .loginbutton{
    background-color: antiquewhite;
    border-radius: 10px ;
    width: 50px;
    height: 20px;
    position: absolute;
    right: 4vw;
    top: 60px;
    border: none;
  }
  .loginbutton:hover{
    background-color: bisque;
  }
    .loginbutton1{
    background-color: green;
    border-radius: 50% ;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5vw;
    top: 60px;
    border: none;
  }
  .loginbutton1:hover{
    background-color: rgb(0, 196, 0);
  }
  @media screen {
    @media(max-width: 698px){
      .loginbutton{
        top: 30px;
      }
    }
  }
</style>