title: "JavaScript跨浏览器的添加删除事件绑定函数"
id: 408
date: 2009-12-25 18:31:13
tags:
- javascript
- 网络技术
categories:
- 前端开发
---
现在浏览器太多了也使我们前端开发人员慌了手脚，今天[刘洋](http://oncoding.cn)在写《[教程：编写放在收藏夹里的网页划词翻译工具](http://www.oncoding.cn/2009/translate-tool-bookmark/)》的时候，问起来绑定事件的函数，由于一直使用**jQuery**开发，我都差点忘记了最原始的**js添加绑定事件**的方法啦~抽空立马写两个函数，以备不时之需。

### javascript跨浏览器添加事件绑定 bind()

IE 的**事件绑定**函数是** attachEvent**；而 Firefox, Safari 是 **addEventListener**；Opera 则两种都支持。使用jQuery就可以使用简单的bind()，或者$().click()之类的函数解决，而如果不使用JavaScript框架的时候，大家可是使用下面的封装bind()函数。

```javascript
/************************************
 * 添加事件绑定
 * @param obj   : 要绑定事件的元素
 * @param type : 事件名称。不加 "on". 如 : "click" 而不是 "onclick".
 * @param fn    : 事件处理函数
 ************************************/
function bind( obj, type, fn ) {
    if ( obj.attachEvent ) {
        obj['e'+type+fn] = fn;
        obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
        obj.attachEvent( 'on'+type, obj[type+fn] );
    } else
        obj.addEventListener( type, fn, false );
}```
<!--more-->例如给document添加一个点击事件

```javascript
var fn=function() {
    alert("Hello, World!!");
};
bind(document, "click", fn);```

### 删除事件绑定 unbind()

unbind()对于上面的bind()函数

```javascript
/************************************
 * 删除事件绑定
 * @param obj : 要删除事件的元素
 * @param type : 事件名称。不加 "on". 如 : "click" 而不是 "onclick"
 * @param fn : 事件处理函数
 ************************************/
function unbind( obj, type, fn ) {
    if ( obj.detachEvent ) {
        obj.detachEvent( 'on'+type, obj[type+fn] );
        obj[type+fn] = null;
    } else
        obj.removeEventListener( type, fn, false );
}```
例如删除第一个绑定的document点击事件：

```javascript
unbind(document,"click",fn);```