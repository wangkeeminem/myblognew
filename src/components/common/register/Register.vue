<template>
  <div
    class="register"
    v-if="isregister && !registerok"
    :class="pwdwrong ? 'pwdwrong' : ''"
  >
    <div class="closeicons" @click="closeclick">
      <div class="closeicon"></div>
      <div class="closeicon1"></div>
    </div>
    <input
      type="text"
      class="id"
      placeholder="用户名/ID"
      @keyup.enter="enterdown1"
      v-model="useridinput"
       autocomplete='off'
      :style="{color:uidwarn?'red':''}"
    />
      <!--  -->

    <input
      :type="eyeopen ? 'text' : 'password'"
      placeholder="密码/Password"
      @keyup.enter="enterdown1"
      v-model="pwdinput1"
    />
    <input
      :type="eyeopen ? 'text' : 'password'"
      placeholder="再次确认/Confirm"
      @keyup.enter="enterdown2"
      v-model="pwdinput2"
    />
    <div class="eye" :class="eyeopen ? 'eyeopen' : ''" @click="eyeclick"></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref} from "vue";
import {getRegister} from '../../../network/register'
import { useStore } from 'vuex'
import   { Md5 } from 'ts-md5'
export default defineComponent({
  name: "Register",
  props: {
    isregister: {
      type: Boolean,
      default: false,
    }, //是否登录状态
    setisregister: {
      type: Function,
      required: true,
    }, //是否登录成功状态
  },
  setup(props,context) {
    
    const store = useStore()
    const eyeopen = ref(false); //密码可见
    const pwdfocus = ref(false); //密码框聚焦
    const registerok = ref(false); //登录状态ok
    const pwdwrong = ref(false); //密码错误

    const useridinput = ref(""); //输入的用户名
    const uidwarn = ref(false)
    const pwdinput1 = ref(""); //输入的密码1
    const pwdinput2 = ref(""); //输入的密码2

    
    
    function eyeclick() {
      //密码可见开启
      eyeopen.value = !eyeopen.value;
    }
    //
    function enterdown1(event: Event) {
      //正常输入 回车下一行
      const nextinput = (event.currentTarget as HTMLElement).nextElementSibling; //获取下一个input
      pwdfocus.value = true;
      (nextinput as HTMLElement).focus(); //将焦点聚在input
    }
    function enterdown2(event: Event) {
      //最后一行输入，回车提交
      event.preventDefault()
      pwdfocus.value = true; //输完密码登录
      const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      const pPattern = /^[a-zA-Z]\w{5,17}$/;
      if (!uPattern.test(useridinput.value)) {
        return alert('账号请输入4到16位字符\n支持数字、字母、下划线、减号')
      }
      if (pwdinput1.value == pwdinput2.value) {
          if (!pPattern.test(pwdinput1.value)) {
        return alert('密码以字母开头，长度在6~18之间\n只能包含字母、数字和下划线')
      }
        const username= useridinput.value
        const password = Md5.hashStr(Md5.hashStr(pwdinput2.value)) //将密码两层MD5加密
        const lastlogintime = new Date().getTime()
        const registertime = new Date().getTime()
        getRegister({username,password,lastlogintime,registertime}).then((res)=>{
          if(res.data.message=='Register Sucessed'){
            registerok.value=true
            store.commit('checkUserPermission',res.data.title)//把界面栏目依据权限更新
            store.commit('checkUserRouter',res.data.router)//把界面栏目依据权限更新
            props.setisregister({username,password,lastlogintime})   //进入isregister状态，将用户 密码 登录时间传入本地存储
          }
          if(res.data.message=='用户名已存在'){
            // (event.currentTarget as HTMLElement).blur()//失去焦点，显示出placeholder内容
            useridinput.value='用户名已存在';
            uidwarn.value = true
            setTimeout(() => {
              useridinput.value=''
              uidwarn.value = false
            }, 2000);
            //用户名已存在
          }
          
          })//向服务器发出登录请求
        return false
      } //获取第二个palceholder的值
      else {
        ////更改palceholder的值
        (event.currentTarget as HTMLElement).attributes[2].value =
          "两次密码不一致";
        (event.currentTarget as HTMLElement).blur()//失去焦点，显示出placeholder内容
        pwdwrong.value = true
        pwdinput2.value = "";
        setTimeout(()=>pwdwrong.value = false,200)
      }

      return false
    }
    //手动关闭登录窗口
    function closeclick() {
      props.setisregister(); //以不输入参数的方式进入isregister状态 关闭弹出框
    }
    return {
      eyeopen,
      eyeclick,
      enterdown1,
      pwdfocus,
      enterdown2,
      registerok,
      pwdwrong,
      useridinput,
      pwdinput1,
      pwdinput2,
      closeclick,
      uidwarn,

    };
  },
});
</script>

<style scoped>
.register {
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
  justify-content: space-evenly;
  flex-direction: column;
}
.pwdwrong {
  background-color: rgba(167, 32, 32, 0.5);
}
input {
  width: 200px;
  height: 30px;
  border-radius: 4px;
  border: solid rgba(197, 127, 127, 0.01) 3px;
  outline: none;
  text-align: center;
  margin: 0 auto;
}
input::-webkit-input-placeholder {
  color: grey;
  text-align: center;
}
input:focus::-webkit-input-placeholder {
  color: white;
  text-align: center;
}
.eye {
  background-image: url("/src/assets/img/eyeclose.png");
  background-size: contain;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 16px;
  top: 90px;
}
.eyeopen {
  background-image: url("/src/assets/img/eye.png");
}
.closeicon {
  position: absolute;
  border-left: 3px solid rgb(255, 255, 255);
  border-top: 3px solid rgb(255, 255, 255);
  width: 5px;
  height: 5px;
  transform: translateY(100%) rotateZ(45deg);
}
.closeicon1 {
  position: absolute;
  border-left: 3px solid rgb(255, 255, 255);
  border-top: 3px solid rgb(255, 255, 255);
  width: 5px;
  height: 5px;
  transform: rotateZ(-135deg);
}
.closeicons {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 7px;
  height: 7px;
}
.closeicons:hover {
  transform-origin: center center;
  transform: rotateZ(60deg) scale(1.5);
  transition: all 500ms;
}
</style>