
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


  
  BS.bs =  BScroll('.wrapper', {
  click:true,
  pullUpLoad: true,
  // scrollbar: false,
  pullDownRefresh: true
// and so on
  })



  return {BS}
}




