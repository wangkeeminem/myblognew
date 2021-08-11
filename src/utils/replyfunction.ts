import { Ref } from '@vue/runtime-dom';
import comments from '../types/commentslist'
//参数：1.原帖内容list  2..新的回复信息 
export default function replyComments(commentsList:comments[],newcomments:comments):any{
  commentsList.forEach((item:comments,index)=>{//这是reply
  if(item.publishtime==newcomments.replyto)//遍历 如果匹配的上
  {

    newcomments.layer=item.layer+1//归于reply layer的下一层
    newcomments.topto=newcomments.layer==1?newcomments.replyto:item.topto//如果是第一层的回复 那么topto就是replyto（即主题帖的时间戳），后续所有的topto实际上都是继承他上一层的topto 即最终的主题贴
   ;(commentsList[index].thread as comments[]).unshift(newcomments)
  //  (commentsList[index].thread as comments[]).unshift({replyto,userid,publishtime,content,details,thread:[]})
  }//讲跟帖内容信息附上 并添加主贴id至replyto
  else{
    if (commentsList[index].thread) {
      replyComments(commentsList[index].thread,newcomments)//如果当前贴没有 到他的回帖中查找并匹配
    }                    
  }
  
  })         
}   