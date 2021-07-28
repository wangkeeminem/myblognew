
import userInfo from "../types/userInfo";




export function saveUser(uesrinfo:userInfo){
  
  localStorage.setItem('uesrinfo',JSON.stringify(uesrinfo))

}//保存数据
//从缓存中读取数据
export function readUser():userInfo{
  return JSON.parse(localStorage.getItem('uesrinfo')||'0')
}

export function clearUser(){
  localStorage.clear()
}