export default interface comments{
  topto?:number;//主题贴的id 便于服务器进行更新单条 减小数据库处理压力
  replyto?:number;//定义为原帖主的publishtime，用来服务端寻找原帖主的publishtime并进行连接thread
  publishtime:number;
  userid:string;
  details:{day:number,month:string,year:number},
  content:string;
  thread:comments[]| [];
  layer:number
}
