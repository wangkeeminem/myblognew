1.0☞1.1更新说明：

**1.bug改善**

+ :imp:登录注册页面的密码旁边的密码可见图片不显示问题！

  使用了本地的资源http://192.168.2.105:4000/src/assets/img/eyeclose.png，css中引用图片采用了相对路径的写法，导致没有被打包！！！

依照其他图片改成了绝对路径的写法：background-image: url('/src/assets/img/eyeclose.png');



+ Alook手机浏览器刷新引起后台 SyntaxError: Unexpected token p in JSON at position 2

  浏览器报错:400响应错误

+ Alook手机浏览器进入无导航栏显示

+ Alook手机浏览器软键盘return 不自动登录（不会当作enter处理）

以上两条升级浏览器可解决，其他浏览器都没有出现这种问题，后续将增加页面不显示的处理页。



**2.使用体验优化**

+ 登录、注册关闭按钮不灵优化：关闭按钮键 加粗、放大，动画效果放慢



1.1☞1.2更新说明

+ 文章底部tag点击跳转bug修复



2.0.0 :gift:**重大升级**

+ 加入视频播放器，边栏和图标（移动端）提供入口，不增设新的导航条栏目

2.0.0☞2.1.0  **重要更新**

+ 播放器下方控件的加入、全屏显示、canvas画布的分辨率调整

2.1.0☞2.1.1 针对性改动

+ 针对volar插件进行了ts语法修正（未完全完成）
+ 重写了scroll滚动的节流逻辑，原debounce.js不再使用
+ 修正了右侧图标的尺寸，使其保持统一
+ computer状态下左右方向scroll关闭不再显示

2.1.1☞2.1.2 针对性改动

+ 美化顶部搜索框和逻辑



2.1.2☞2.2.0

正式发布版

+ 清除调试语句
+ 加入备案信息
+ 修改video移动端适配问题

下一阶段开辟新分支：编辑器markdown版本的实现



:fire:2.2.0☞**3.0.0**

1.引入wangEditorhttps://www.wangeditor.com/作为文本编辑组件，实现富文本编辑。舍弃 之前自定义编辑大量逻辑代码。

**为何选择 wangEditor**？

- 简洁、轻量级、[文档](https://www.wangeditor.com/doc/)齐全
- 万星项目 [Github Star 1w+](https://github.com/wangeditor-team/wangEditor/releases)
- npm 周下载量 1w+
- CDN 月下载量百万+（来自 [jsdelivr](https://www.jsdelivr.com/package/npm/wangeditor)）
- QQ 群及时答疑
- [开源团队](https://www.wangeditor.com/doc/#开发人员)维护，非个人单兵作战

https://github.com/wangeditor-team/wangEditor

2.更改打包文件大小设置（因引入了第三方库影响）

3.0.0☞3.0.1

+ 编辑器右键默认窗口弹出禁用 =》实现右键选择编辑区域位置
+ 编辑器菜单 编辑分离，输出模式变更
+ 去除编辑器不需要的菜单

