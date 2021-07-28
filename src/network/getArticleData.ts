

import {articleRequest} from "./request"


export function getArticleDatas(url:string,page:number=0) {
  console.log('请求文章数据');
  return articleRequest({url:url,data:{page}})
}
//示例：
// export function getArticleData(page:number=0) {
//   return articleRequest({url:'/',data:{page:page}})
// }
