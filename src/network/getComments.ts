



import {commentsGet} from "./request"
export function getComments() {
  return commentsGet({url:'/getcomments'})
}