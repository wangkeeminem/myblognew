
import { reactive, ref, watch } from "vue";
import { getlogin } from "../network/login"; //首页登录校验账号
import {getArticleDatas} from '../network/getArticleData' //文章的请求
import { readUser } from "../utils/localStorageUtils";
import {saveMenulist,saveRouterlist} from "../utils/sessionStorageUtils";
import { useStore } from "vuex";
import { PublishInfo } from "../types/publishInfo";

export default function (url:string) {//url需要是'/'格式的
  console.log("进入"+url);
  const store = useStore();
  const userinfo = readUser();
  const articles = reactive<{ result: PublishInfo[] }>({ result: [] });
  const currentpage = ref(0);
  saveMenulist(store.state.userPermission)//先预存一个Menulist 以防止请求出错菜单有问题
  if (userinfo)
    getlogin(userinfo).then((res) => {
      //以local信息校验登录
      console.log('登陆成功');
      if (res)
      {
        // console.log(res.data.title);
        store.commit("checkUserPermission", res.data.title); //把界面栏目依据权限更新
      store.commit("checkUserRouter", res.data.router); //把界面栏目依据权限更新
      saveMenulist(res.data.title);
      saveRouterlist(res.data.router);}
      else {
        saveMenulist(store.state.userPermission)
        saveRouterlist(store.state.userRouter)//否则把vuex默认的返回给客户
      }
    })

    getArticleDatas(url).then(res=>{//先裸奔一次，获取page1的内容 后刷新
      // console.log(res,'这是请求来的result');
    articles.result =res.data.articles  
  })
  // const summuryLoaded = ()=>{ getBSandRefresh()}//summury加载后刷新
  watch(currentpage, (currentpage) => {

      getArticleDatas(url,currentpage).then(res=>{//后面点击触发 加载更多页面

      articles.result=articles.result.concat(res.data.articles as PublishInfo[])      //与新请求的列表连接起来
    })
  });

  const nexticonClick = () => {
    currentpage.value += 1;
    // setTimeout(()=>{getBSandRefresh()},1000)
  };
 
  
  return {
    articles,
    nexticonClick,
  };
}