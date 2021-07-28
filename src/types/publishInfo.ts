import comments from "./commentslist";

export default interface publishInfo{
  title:string,
  details:{day:number,month:string,year:number,author:string},
  content:string,
  tagChoice:boolean[]|string[],
  commentslist?:comments[],
  publishTime?:number,
  editArticleId?:string,
  imagePathList?:string[],
  _id?:string,
}
export type PublishInfo = {
  title:string,
  details:{day:number,month:string,year:number,author:string},
  content:string,
  tagChoice:boolean[]|string[], 
  commentslist?:comments[],
  publishTime?:number ,
  editArticleId?:string,
  imagePathList?:string[],
  _id?:string,
}

// class PublishInfo implements publishInfo {
//   title:string;
//   details:{day:number,month:string,year:number,author:string};
//   content:string;
//   tagChoice:boolean[];
// }

// class PublishInfo{
//   firstName:string
//   lastName:string
//   fullName:string
//   constructor(firstname:string,lastname:string){
//     this.firstName=firstname
//     this.lastName=lastname
//     this.fullName = this.firstName+this.lastName
//   }