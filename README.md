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

