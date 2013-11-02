title: "iframe自适用高度代码"
id: 664
date: 2011-01-14 18:02:48
tags:
- javascript
- 网络技术
categories:
- 前端开发
---
有不少[wBox](http://js8.in/wbox-jquery "jQuery弹出框")的用户反映iframe时候不可以自动撑开高度，今天在无意中看到了司徒正美的一片关于iframe自适用高度的js代码，感觉不错，转载来了。

```javascript

var adjustIframe = function (id) {
    var iframe = document.getElementById(id)
    var idoc = iframe.contentWindow && iframe.contentWindow.document || iframe.contentDocument;
    var callback = function () {
        var iheight = Math.max(idoc.body.scrollHeight, idoc.documentElement.scrollHeight); //取得其高
        iframe.style.height = iheight + "px";
    }
    if (iframe.attachEvent) {
        iframe.attachEvent("onload", callback);
    } else {
        iframe.onload = callback
    }
}
```
<!--more-->
HTML代码如下所示：

```html"><iframe id="js_sub_web" width="80%" frameborder="0" scrolling="no" allowTransparency="true" src="http://www.cnblogs.com/rubylouvre/archive/2009/09/15/1566722.html

</iframe>
```
使用代码：

```javascript
window.onload = function(){
     adjustIframe("js_sub_web");
}
```
推荐几篇关于Iframe的文章：

1.  《[再谈Iframe的问题](http://js8.in/638.html)》
2.  《[解决IE6 select z-index无效，遮挡div的bug](http://js8.in/553.html)》
3.  《[使用JavaScript在IE和Firefox下进行iframe的DOM操作](http://js8.in/463.html)》
4.  《[用document.domain+iframe实现Ajax跨子域](http://js8.in/443.html)》
5.  《[关于Ajax在浏览器中产生前进后退的实现方法](http://js8.in/311.html)》