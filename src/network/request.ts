
import axios from 'axios'
import loginconfig from '../types/loginconfig';
import publishconfig from '../types/publishconfig';

import registerconfig from '../types/registerconfig'
import BASE_URL from './config';
// const BASE_URL = "http://192.168.2.105:8080"
// const BASE_URL = "http://39.106.209.60:8080"
//"http://127.0.0.1:8081",
//login请求
//设置axios为form-data
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';

export const registerRequest=(config:registerconfig)=>{ 
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'post',
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}

export const loginRequest=(config:loginconfig)=>{ 
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'post',
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'loginreques2请求出错了1,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'loginrequest响应出错了2,请检查您的互联网连接');
  })
  return instance1(config)  
}

export const publishRequest=(config:publishconfig)=>{ 
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'post',
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'request2请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'request2响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}

//进行文章请求函数
export const articleRequest = (config:{url:string,data:{"page":number}}) => {
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'post',
    timeout:10000,
    // responseType:'text'
  })
  
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    // console.log(config);
    return config
  },err=>{
    // console.log('你好');
    // console.log(instance1,'这是instance1');
    // console.log(this,'这是this');
    console.log(err+'articlerequest请求出错了1,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    // console.log(this,'这是this');
    console.log(err+'articleresponse响应出错了2,请检查您的互联网连接');
  })
  return instance1(config)  
}

//进行留言发布函数
import comments from '../types/commentslist';
export const commentsPublish = (config:{url:string,data:{comments:comments,mode:string}}) => {
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'post',
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'request2请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'request2响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}
//文章评论功能
export const articlecommentsPublish = (config:{url:string,data:{comments:comments,mode:number}}) => {
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'post',
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'request2请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'request2响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}

//留言页请求
export const commentsGet = (config:{url:string}) => {
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'get',
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'request2请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'request2响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}
//删除博文操作：

export const deleteArticleRequest = (config:{url:string,data:{id:string}}) => {
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'post',
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'request2请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'request2响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}
export const deleteCommentRequest = (config:{url:string,data:{id:number,articleId:string}}) => {
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'post',
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'request2请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'request2响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}

//搜索文章请求
export const searchResultGet = (config:{url:string,data:{content:string,page:number}}) => {
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'post',
    timeout:10000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'request2请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'request2响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}

//视频video请求
export const getVideos = (config:{url:string}) => {
  const instance1=axios.create({
    baseURL:BASE_URL,
    method:'get',
    timeout:10000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'request2请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result
  },err=>{
    console.log(err+'request2响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}