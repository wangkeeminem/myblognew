import publishInfo from "../types/publishInfo"

 export async function openAndAddArticle(newrticle:publishInfo){
  let DB:IDBDatabase
  const indexedDBRequest=indexedDB.open('myBlog')
  return new Promise((resolve,reject)=>{
    indexedDBRequest.onerror = (e)=>{reject('error');alert('数据库出问题了 请您试一试重启浏览器')}
    indexedDBRequest.onsuccess = (e)=>{ 
      console.log('数据库打开成功');
      DB = indexedDBRequest.result
      console.log({DB});
      addArticle(DB,newrticle).then(res=> resolve(res)).catch(rej=>reject(rej))
    }  
    indexedDBRequest.onupgradeneeded = function(event:IDBVersionChangeEvent){
    console.log('openAndAddArticle数据库更新了');
    DB = (event.target as any).result
    let articles
    if(!DB.objectStoreNames.contains('article'))
     articles=DB.createObjectStore('articles',{keyPath:"publishTime"})
    // articles.createIndex('publishTime','publishTime',{unique:true}) 
    }
  
  }) 
}
async function addArticle(db:IDBDatabase,newrticle:publishInfo){
  return new Promise((res,rej)=>{
    const addRequest = db.transaction(['articles'],'readwrite')
    .objectStore('articles')//articles 为store 可以想象为一个大数组
    .add(JSON.parse(JSON.stringify(newrticle)))
    // .add(newrticle)
  
    addRequest.onsuccess = (e)=>{console.log('存储成功了');res('成功存入')}
    addRequest.onerror = (e)=>{rej('error');alert('可能出了一些小问题,如果您尝试重启浏览器还是不行,请在留言区联系博主')}
  })
}

export async function openAndReadAllArticles(){
  let DB:IDBDatabase  
  return new Promise((resolve,reject)=>{
    const indexedDBRequest=indexedDB.open('myBlog')
    indexedDBRequest.onerror = (e)=>{reject('数据库出问题了 请您试一试重启浏览器')}
    indexedDBRequest.onsuccess = (e)=>{ 
      console.log('数据库打开成功');
      DB = indexedDBRequest.result

      readAllArticles(DB).then(res=>{resolve(res as publishInfo[])})
    }  
    indexedDBRequest.onupgradeneeded = function(event:IDBVersionChangeEvent){
      console.log('openAndReadAll数据库更新了');
      reject('数据库更新了');
    DB = (event.target as any).result
    let articles
    if(!DB.objectStoreNames.contains('article'))
    articles=DB.createObjectStore('articles',{keyPath:"publishTime"})
    // articles.createIndex('publishTime','publishTime',{unique:true}) 
    }

  })  
}

async function readAllArticles(db:IDBDatabase) {//遍历获取所有

  const articles = db.transaction('articles').objectStore('articles');
  let allArticles:publishInfo[]=[]as publishInfo[]
  return new Promise((res,rej)=>{
    const allRecords=articles.getAll()
    allRecords.onsuccess = function() {
      allArticles=allRecords.result;
      if(allArticles)
      res(allArticles)
      else rej('出错了')
  };
  })  
}

export function removeOneArticle(index:number){
  let DB:IDBDatabase  
  return new Promise((resolve,reject)=>{
    const indexedDBRequest=indexedDB.open('myBlog')
    indexedDBRequest.onerror = (e)=>{reject('数据库出问题了 请您试一试重启浏览器')}
    indexedDBRequest.onsuccess = (e)=>{ 
      console.log('数据库打开成功');
      DB = indexedDBRequest.result

      removeArticle(DB,index).then(res=>(resolve(res)))
    }  
    indexedDBRequest.onupgradeneeded = function(event:IDBVersionChangeEvent){
      console.log('removeOneArticle数据库更新了');
      reject('数据库更新了');
    DB = (event.target as any).result
    let articles
    if(!DB.objectStoreNames.contains('article'))
    articles=DB.createObjectStore('articles',{keyPath:"publishTime"})
    // const articles=DB.createObjectStore('articles',{autoIncrement:true})//还没改
    }
  })  
}

async function removeArticle(db:IDBDatabase,index:number) {//遍历获取所有 
  return new Promise((res,rej)=>{
    const deleteRequest = db.transaction('articles','readwrite').objectStore('articles').delete(index);
    deleteRequest.onsuccess = function(event) {
      console.log('删除成功');
      res('数据删除成功')
  };
  deleteRequest.onerror = function(){
    console.log('删除失败');
    rej('删除失败')
  }
})  
}












// function readOneArticle(db:IDBDatabase){ 
//   let OneArticles:publishInfo={}as publishInfo
//   const articles = db.transaction(['articles'])
//   const articelsStore = articles.objectStore('articles')
//   const articlesRequest = articelsStore.get(1)
//   articlesRequest.onerror = ()=>{alert('读取数据库失败')}
//   articlesRequest.onsuccess = ()=>{
//     console.log('读取成功');
//     if(articlesRequest.result){

//       OneArticles = JSON.parse(articlesRequest.result)

//     }
//     else{
//       alert('没有相关数据')
//     }
//   }
//   return OneArticles
// }

