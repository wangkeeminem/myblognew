export default function dbounce(fun:Function,delay:number=300){
  let timer:any=null
   return function(...args:any[]){
  console.log('执行了1');
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    // fun.apply(this:any, args)
    dbounce(fun,delay)
  }, delay)
 }
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