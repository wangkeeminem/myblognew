export default interface RootStateTypes {
  headerChoice:number,
  loginClickable:boolean,
  registerClickable:boolean,
  registerVisible:boolean,
  userPermission:string[],
  userRouter:string[],
  
  title:string,
  details:{day:number,month:string,year:number,author:string},
  content:string,
  tagChoice:boolean[],

  articleMode:boolean,
  scrollPosition:number,
  
  searchContent:string,
  searchCount:number,

  deviceMode:string,

  
}
