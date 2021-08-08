<template>
    <div class="wrapper" ref="wrapper">
  <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import {computed, defineComponent, inject, onBeforeUpdate, onMounted, Ref, ref, watch} from 'vue'

import BScroll from 'better-scroll'
import ObserveDom from "@better-scroll/observe-dom";
import { useStore } from 'vuex';

import {debounce} from './../../../utils/debounce'
import { useRoute } from 'vue-router';
import router from '../../../router';

export default defineComponent({
  name:'Scroll',
  emits:{
    scroll:(payload:Ref)=>{return true}
  },
  props:{
    commentElement:{
      type:Object,
      default:{}
    },
    commentsInto:{
      type:Boolean,
      default:false
    }
  },
  setup(props,context){
    const store = useStore()
    const scrollUp = inject('scrollUp',Function,true)//函数 用于判断显示 页面刷新还是回到顶部 该判断仅在浏览summury下有效
    const oldPosition = ref(0)
    onMounted(()=>{
    
    //初始化bs
    BScroll.use(ObserveDom);
    const scroll =ref( 
      new BScroll('.wrapper', 
      {
      probeType: 3,
      pullUpLoad: true,
      observeDOM: true,
      click: true,

    })
    )
    context.emit('scroll',scroll)//把scroll发送到Summury
    scroll.value.on('pullingUp',()=>{
      // scroll.value.refresh()
    }) 

    scroll.value.on('scroll',debounce((position:{x:number,y:number})=>{//d如果是summury，则将记录上传至vuex
    scrollUp(position.y)//该判断仅在浏览summury 文章下均有效
    
    if(computed(()=>store.state.articleMode).value==false)
    {      
      store.commit('setscrollPosition',position.y)
    }//如果是true，则记录
    }))
    watch(computed(()=>props.commentsInto),()=>{
      console.log('commentsInto变了吗');
        setTimeout(()=>{           
        console.log('clientHeight是：',(props.commentElement as HTMLElement).offsetHeight)
        scroll.value.scrollToElement(props.commentElement as HTMLElement,200,0,(props.commentElement as HTMLElement).offsetHeight)
           },300) 
    })
    watch( computed(()=>store.state.articleMode),(newmode,oldmode)=>{
      // watch(props.commentElement,()=>{console.log('当前commentElement变化了')})
      if (newmode)//如果是old转到文章模式 跳至顶部 并记录当前位置？
       {
        console.log(props.commentElement);  
        scroll.value.scrollTo(0,0)
               
       }
      else{//如果是跳至summury模式，跳转到oldposition 
      console.log('gaga');
          // console.log('300ms后将要跳转到',oldPosition.value);
          setTimeout(() => {
            scroll.value.scrollTo(0,oldPosition.value) 
          }, 300);
              
        }
    }) 
    
    watch(computed(()=>store.state.headerChoice),()=>{
        setTimeout(() => {
            scroll.value.refresh()
          }, 300);
    })
    router.afterEach(()=>{
      setTimeout(() => {
        scroll.value.refresh()
        console.log('router跳转后刷新了')
      }, 600);
    }
    )
      })
   onBeforeUpdate(()=>{
      if(computed(()=>store.state.articleMode).value==true)//此时数据已经转换到了文章页，监听之前vuex中的位置 并赋值      
         {oldPosition.value=store.state.scrollPosition
        //  console.log(store.state.scrollPosition,'有更新') 
         }
    })

    return{  
    }
  }
})
</script>

<style scoped>
  .wrapper{
    height: 70vh;   
  }
</style>