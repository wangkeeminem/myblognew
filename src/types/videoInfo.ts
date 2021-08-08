export default interface videoInfo{
  videoId:string,//使用nanoid(videoTitle+publishTime)的方式 简化一下名字
  videoPath:string,//进行网络访问的url地址
  titleImagePath:string,
  videoTitle:string,//使用文件名作为title
  publishTime:number,//服务器存储时的事件戳
}