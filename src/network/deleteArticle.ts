

import {deleteArticleRequest} from './request'

export function deleteArticle(id:string) {
  return deleteArticleRequest({url:'/deleteArticle',data:{id:id}})
}