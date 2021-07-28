import imageList from "../types/imagelist"
import publishInfo from "../types/publishInfo"

//保存用户菜单选择
export function savechoice(currentindex:number){
  sessionStorage.setItem('headerchoice',JSON.stringify(currentindex))

}//保存数据
//从缓存中读取数据
export function readchoice():number{
  return JSON.parse(sessionStorage.getItem('headerchoice')||'0')
}


//保存用户可见菜单栏
export function saveMenulist(menulist:string[]){
  sessionStorage.setItem('menulist',JSON.stringify(menulist))
}//保存数据
//从缓存中读取数据
export function readMenulist():string[]{
  return JSON.parse(sessionStorage.getItem('menulist')||'0')
}
export function saveRouterlist(routerlist:string[]){
  sessionStorage.setItem('routerlist',JSON.stringify(routerlist))

}//保存数据
//从缓存中读取数据
export function readRouterlist():string[]{
  return JSON.parse(sessionStorage.getItem('routerlist')||'0')
}
//删除菜单list：
export function removeList(){
  sessionStorage.removeItem('menulist')
  sessionStorage.removeItem('routerlist')
}

//博客图片暂时存储
export function saveImageList(imagelist:imageList){
  sessionStorage.setItem('imagelist',JSON.stringify(imagelist))
}

export function readImageList():imageList{
  return JSON.parse(sessionStorage.getItem('imagelist')||'0')
}
//清掉图片存储数据
export function removeImageList(){
  sessionStorage.removeItem('imagelist')
}

//用户选择的页数保存
export function readHomePage():number{
  return JSON.parse(sessionStorage.getItem('homepage')||'0')
}

export function saveHomePage(homepage:number){
  sessionStorage.setItem('homepage',JSON.stringify(homepage))
}

//用户搜索内容保存
export function readSearchContent():string{
  return JSON.parse(sessionStorage.getItem('SearchContent')||'0')
}

export function saveSearchContent(SearchContent:string){
  sessionStorage.setItem('SearchContent',JSON.stringify(SearchContent))
}
//用户重新编辑内容保存
export function readReeditContent():publishInfo{
  return JSON.parse(sessionStorage.getItem('ReeditContent')||'0')
}

export function saveReeditContent(ReeditContent:publishInfo){
  sessionStorage.setItem('ReeditContent',JSON.stringify(ReeditContent))
}
//读取编辑内容中的图片
export function readReeditImages():imageList{
  return JSON.parse(sessionStorage.getItem('ReeditImages')||'0')
}
//保存编辑内容中的图片
export function saveReeditImages(ReeditImages:imageList){
  sessionStorage.setItem('ReeditImages',JSON.stringify(ReeditImages))
}
//清理会话存储中的编辑内容
export function removeReeditContent(){
  sessionStorage.removeItem('ReeditContent')
  sessionStorage.removeItem('ReeditImages')
}
