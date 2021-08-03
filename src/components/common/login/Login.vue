<template>
  
  <div class="login" v-if="islogin&&!loginok" :class="pwdwrong?'pwdwrong':''">
    <div class="closeicons" @click="closeclick">
    <div class="closeicon"></div>
    <div class="closeicon1"></div></div>
    <input type="text" class="id" placeholder="用户名/ID" @keyup.enter="enterdown1"  v-model="useridinput" >
  <input :type="eyeopen?'text':'password'" 
  placeholder="密码/Password" 
  @keyup.enter="enterdown2"
  v-model="pwdinput"
  >
  <div class="eye" 
  :class="eyeopen?'eyeopen':''" @click="eyeclick">
  </div>
  </div>
  
</template>

<script lang='ts'>
import {defineComponent, onMounted, onUpdated, ref, watch} from 'vue'
// import {loginRequest} from '../../../network/login'
import {getlogin} from '../../../network/login'  
import {useStore} from 'vuex'
import   { Md5 } from 'ts-md5'
export default defineComponent({
  name:'Login',
  props:{
    islogin:{
      type:Boolean,
      default:true
    },//是否登录状态
    setislogin:{
      type:Function,
      required:true
    },//是否登录成功状态
  },
  setup(props){
     const store = useStore()

    const eyeopen = ref(false)//密码可见
    const pwdfocus = ref(false)//密码框聚焦
    const loginok = ref(false)//登录状态ok
    const pwdwrong = ref(false)//密码错误
    // const userid = 'wangke'//用户服务器用户密码
    // const password = '19901115'
    const useridinput = ref('')//输入的用户名
    const pwdinput = ref('')//输入的密码



    function eyeclick(){//密码可见开启
      eyeopen.value=!eyeopen.value
    }
    const pwd = ref(null)
    // 
    function enterdown1(event:Event){     
      const nextinput = (event.currentTarget as HTMLElement).nextElementSibling//获取下一个input
      pwdfocus.value = true;
      (nextinput as  HTMLElement).focus()//将焦点聚在input
    }
    function enterdown2(event:Event){
      pwdfocus.value = true //输完密码登录
      const username= useridinput.value
      const password = Md5.hashStr(Md5.hashStr(pwdinput.value)) //将密码两层Md5加密
      const lastlogintime = new Date().getTime()   
      getlogin({username,password,lastlogintime}).then(res=>{
  
        if(res.data.message=='OK'){
        console.log('登陆成功');
        store.commit('checkUserPermission',res.data.title)//把界面栏目依据权限更新
        store.commit('checkUserRouter',res.data.router)//把界面栏目依据权限更新
        loginok.value=true  //将登录状态转为OK,登录框消失
        props.setislogin({username,password,lastlogintime})   //进入islogin状态，将用户 密码 登录时间传入本地存储
        //关闭注册按钮         
        }
        else{
        pwdwrong.value = true
        setTimeout(()=>pwdwrong.value = false,200)
      }

      })

    }
    //手动关闭登录窗口
     function closeclick(){
       props.setislogin()//以不输入参数的方式进入islogin状态 关闭弹出框
     }
    return{
      eyeopen,eyeclick,enterdown1,pwdfocus,enterdown2,loginok,pwdwrong,pwd,useridinput,pwdinput,closeclick
    }
  }
})
</script>

<style scoped>
  .login{
    position: fixed;
    left: 50vw;
    top: 50%;
    z-index: 100;
    transform: translateX(-50%) translateY(-50%);
    width: 300px;
    height: 150px;
    background-color: rgba(100, 100, 100, 0.3);
    border-radius: 5px;
    border: 8px solid rgba(100, 100, 100, 0.01);   
    display: flex;
    justify-content:space-evenly;
    flex-direction: column;
  }
  .pwdwrong{
    background-color: rgba(167, 32, 32, 0.5);
  }
  input{   
    width:200px;
    height: 30px;
    border-radius:4px;
    border: solid rgba(197, 127, 127, 0.01) 3px;
    outline:none;
    text-align: center;
    margin:0 auto;
  }
  input::-webkit-input-placeholder{
    color:grey;
    text-align: center;
  }
  input:focus::-webkit-input-placeholder{
    color:white;
    text-align: center;
  }
  .eye{
    background-image: url('/src/assets/img/eyeclose.png');
    background-size: contain;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 16px;
    top: 95px;
  }
  .eyeopen{
    background-image: url('/src/assets/img/eye.png');

  }
  .closeicon{
    position: absolute;
    border-left: 3px solid rgb(255, 255, 255);
    border-top: 3px solid rgb(255, 255, 255);
    width: 5px;
    height: 5px;  
    transform: translateY(100%) rotateZ(45deg)  
  }
  .closeicon1{
    position: absolute;
    border-left: 3px solid rgb(255, 255, 255);
    border-top: 3px solid rgb(255, 255, 255);
    width: 5px;
    height: 5px;  
    transform: rotateZ(-135deg)
  }
  .closeicons{
    position:absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 7px;
    height: 7px;
  }
  .closeicons:hover{
    transform-origin:center center;
    transform: rotateZ(60deg) scale(1.5);
    transition: all 500ms;
  }
</style>