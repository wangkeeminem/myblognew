

import userInfo from "../types/userInfo"
import {loginRequest} from "./request"
export function getlogin(userinfo:userInfo) {
  return loginRequest({url:'/login',data:userinfo})
}