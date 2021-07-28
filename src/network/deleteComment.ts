


import {deleteCommentRequest} from './request'

export function deleteComment(id:number,articleId:string) {
  return deleteCommentRequest({url:'/deleteComment',data:{id,articleId}})
}