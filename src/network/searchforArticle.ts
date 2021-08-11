
import {searchResultGet} from './request'
export  function searchforArticle(content:string,page:number=0){
  
  return searchResultGet({url:'/searchforArticle',data:{content,page}})
} 