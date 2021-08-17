import BASE_URL from "../../../network/config"

const config1={
  // height: 0.6*visualViewport.height,
  height: 500,
  
  zIndex: 0,
  placeholder: '请输入您的内容',
  focus:true,
  showFullScreen: false,
  onchangeTimeout: 300, // 修改触发为 500ms
  pasteFilterStyle: false,//关闭对粘贴行为的样式过滤
  uploadImgServer:BASE_URL+'/uploadImg',//配置 server 接口地址



//   menus:[
//     'bold',
//     'head',
//     'link',
//     'italic',
//     'underline'
// ]
    // 配置菜单栏，设置不需要的菜单
    excludeMenus:[
      'fontSize',
      'fontName',
       'underline',
       'strikeThrough',
       'foreColor',

     ]
}
const config2={//针对yourspace的情况
  height: 0.6*visualViewport.height,
  zIndex:999,
  placeholder: '请输入您的内容',
  focus:true,
  showFullScreen: false,
  onchangeTimeout: 300, // 修改触发为 500ms
  pasteFilterStyle: false,//关闭对粘贴行为的样式过滤
  // uploadImgServer:BASE_URL+'/uploadImg'//针对yourspace的情况 不配置 server 接口地址
  uploadImgShowBase64:true//针对yourspace的情况  使用base64保存图片
//   menus:[
//     'bold',
//     'head',
//     'link',
//     'italic',
//     'underline'
// ]
    // 配置菜单栏，设置不需要的菜单
  // excludeMenus:[
  //     'emoticon',
  //     'video'
  // ]
}
export  {config1,config2}