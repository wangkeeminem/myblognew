import BScroll from "better-scroll"
import { computed, nextTick, onMounted, onUpdated, reactive,  ref ,toRefs } from "vue"
import { sendComments } from "../network/sendComments"
import comments from "../types/commentslist"
import { readUser } from "./localStorageUtils"
import monthTable from "./monthTable"
import replyComments from "./replyfunction"

export  function commentsSetup(Totalcomments:{result:comments[]},mode:string|number) {//默认是留言模式 如果是文章留言 需要传入文章的publishTime
  const SCROLL = reactive({scroll:{}})
  const commentsList = reactive(Totalcomments.result)  
  const commenentscount = computed(()=>commentsList?.length)
  const publishVisible = ref(false)
  const inputContent = ref('')
  const isReplyNo = ref(0)
  function scroll(payload: BScroll){
    SCROLL.scroll = payload
  }
  
  onMounted(()=>{
    if (mode == 'comments')
    (SCROLL.scroll as BScroll).refresh()
   })//如果是留言模式 执行刷新动作
   onUpdated(()=>{
    if (mode == 'comments')
    (SCROLL.scroll as BScroll).refresh()
   })//如果是留言模式 执行刷新动作  

  const publishclick = (params:{payload:number,event:Event})=>{
    const {payload,event} = params
    
    if(readUser()){
      publishVisible.value = !publishVisible.value//进入发布栏显示模式
      isReplyNo.value = payload//通过reply模式进入时，将reply转为true
    }
    else{
      if(confirm('请大侠点击右上角的登录或者注册')){
      }
      else(alert('大侠请留步'))
    }
    
  }
  const launchClick = ()=>{//点击发送时 
    
    const userid =  readUser().username
    const publishtime = Date.now();
    const content = inputContent.value
    if(content.length<10){
      return alert('请输入至少十个字符我才会认为你是认真的哦！\n Please input at least 10 characters!Don\'t be shy！')
    }
    const date = new Date();//为了显示格式 我才搞这一出的
    const day = date.getDate();
    const month = monthTable[date.getMonth()];
    const year = date.getFullYear();
    const details = {day,month,year}
    const replyto = isReplyNo.value
    const newcomments = {replyto,userid,publishtime,content,details,thread:[],layer:0}
    if (!replyto){//留言模式 或者如果isReplyNo意外不见了的话  如果没有指定replyto who
      commentsList.unshift(newcomments)//前端页面动态加入留言 点击后页面自动加入
    }
    else//跟帖模式
    {       
      replyComments(commentsList as comments[],newcomments)    //处理跟帖 使其topto 正常   以及更新主贴信息
    }

    sendComments(newcomments,mode)//最新的newcomments发送出去 前面的运算只是用于展示，实际在服务端在进行一次运算 进行跟帖的连接动作
    publishVisible.value = false
  }
  const clickRefresh = ()=>{
    (SCROLL.scroll as BScroll).refresh()
  }
  const inputAction = (payload:string)=>{
    inputContent.value = payload
  }
//commentsList publishclick publishVisible inputContent launchClick commenentscount
  return {
    commenentscount,
    publishclick,
    publishVisible,
    launchClick,
    commentsList,
    inputContent,
    scroll,
    clickRefresh,
    inputAction
  };
}