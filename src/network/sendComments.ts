


import comments from "../types/commentslist"

import {commentsPublish} from "./request"
import {articlecommentsPublish} from "./request"
export function sendComments(newcomments:comments,mode:string|number) {
  
  if (mode =='comments')
  return commentsPublish({url:'/publishcomment',data:{comments:newcomments,mode:mode as string}})
  else 
  return articlecommentsPublish({url:'/publisharticlecomment',
  data:{comments:newcomments,mode:mode as number}})
}