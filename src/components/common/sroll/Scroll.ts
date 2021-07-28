
import BScroll from 'better-scroll'
import ObserveDom from "@better-scroll/observe-dom";
import { reactive } from 'vue';
// BScroll.use(ObserveDom);
let BS:any
setTimeout(() => {
   BS = reactive({bs:BScroll('.wrapper')})
}, 1000);
// 


export default function Scroll(){

  // if (BS){BS.bs.off}
  
  
  // onMounted(()=>{
  
  // console.log('myedit组件创建了?');
  
  BS.bs =  BScroll('.wrapper', {
  click:true,
  pullUpLoad: true,
  // scrollbar: false,
  pullDownRefresh: true
// and so on
  })
  console.log('调用了bs ts');
  console.log(BS);
  // console.log('bs是',BS);
  // BS.bs.on("scroll", (position:any) => {
  //   // console.log(position);
  // }); //监听滑动事件
  // setTimeout(() => {
  //   BS.bs.refresh()
  // }, 1000); 
  
//   }
// )//以上为scroll设置
  return {BS}
}




// export  function Scroll1(BS:BScroll){ 
//   onMounted(()=>{
  
//   console.log('myedit组件创建了?');
//   BScroll.use(ObserveDom);
//   BS = new BScroll('.wrapper', {
//   click:true,
//   pullUpLoad: true,
//   scrollbar: true,
//   pullDownRefresh: true
// // and so on
//   })
//   console.log('调用了bs ts');
//   BS.on("scroll", (position:any) => {
//     console.log(position);
//   }); //监听滑动事件
//   setTimeout(() => {
//     BS.refresh()
//   }, 1000); 
//   }
  
//   )//以上为scroll设置
//   return {BS}
// }