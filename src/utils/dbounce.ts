let timer:any = null
let funReturn:any=null
export default function dbounce(fun:Function,delay:number=300){
  if (timer) {
    clearTimeout(timer)
    console.log('取消定时器')
  }
  else
  console.log('生成定时器')
  timer= setTimeout(() => {
    // dbounce(fun,delay)
    funReturn=fun
  }, delay)
  return funReturn
}



// export function dbounce(func,delay=500)
// {
//   let timer=null
//   return ()=>{
//   timer&&clearTimeout(timer)
//   timer=setTimeout(()=>{func.apply(this),delay}
//   )
  
//   }
// }

// var resizeTimer=null;
// $(window).on('resize',function(){
//        if(resizeTimer){
//            clearTimeout(resizeTimer)
//        }
//        resizeTimer=setTimeout(function(){
//            console.log("window resize");
//        },400);
//    }
// );