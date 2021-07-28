
import userInfo from "../types/userInfo"
import {registerRequest} from "./request"
export function getRegister(userinfo:userInfo) {
  return registerRequest({url:'/register',data:userinfo})
}