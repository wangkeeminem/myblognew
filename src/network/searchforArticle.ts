
import {searchResultGet} from './request'
export  function searchforArticle(content:string,page:number=0){
  console.log('提交搜索了');
  return searchResultGet({url:'/searchforArticle',data:{content,page}})
} 