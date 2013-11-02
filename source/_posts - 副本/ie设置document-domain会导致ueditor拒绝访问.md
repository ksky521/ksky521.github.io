title: "ie设置document.domain会导致ueditor拒绝访问"
id: 1059
date: 2012-09-19 18:53:13
tags:
- ueditor
- javascript
categories:
- 前端开发
---

使用百度的**ueditor**富文本编辑器在ie中如果页面设置了`document.domain`，则会导致编辑器初始化失败，错误信息是拒绝访问，可见是**跨域**问题导致的。
解决的方法就是在render方法中设置src为一个代理页面，或者javascript伪协议，例如：
```javascript
container.firstChild.src = "javascript:void((function(){document.open();document.domain='"
+document.domain
+"';document.write('');document.close()})())";
```
弹出的dialog则需要在`\dialogs\internal.js` 里也加上:
```javascript
document.domain = '根域';
```
至于flash上传问题，需要放个`crossdomain.xml`文件，具体内容你懂得了……
