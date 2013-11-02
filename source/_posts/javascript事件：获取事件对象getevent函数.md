title: "javascript事件：获取事件对象getEvent函数"
id: 703
date: 2011-07-13 04:11:59
tags:
- javascript
categories:
- 前端开发
---
在**javascript**开发中我们会经常获取页面中的事件对象，然后来处理这些事件，例如下面的**getEvent**函数就是获取javascript下的页面事件对象。

```javascript

function getEvent(event){
	return event || window.event;
}
```
我们使用getEvent的时候可以这样调用。

```javascript

function foo(event){
	var evt = getEvent(event);
	alert(evt);
}
```
并且把foo函数绑定到一个onclick事件上。
但是常用的是foo函数不会有参数，或者第一个参数没有传入，我们可以通过`arguments[0]`来获取第一个参数。
在IE中event是一个全局变量，即`window.event`，而在Firefox等浏览器，事件会作为第一个参数传入foo函数，所以getEvent可以改为：

```javascript

function getEvent(event){
	return arguments[0] || window.event;
}
```
这时在一些版本的浏览器，例如Firefox 中会出现获取不到event对象的问题，其实我们可以看成事件的触发是下面的方式：

```javascript

function onclick(event) {
    foo();
}
```
这样，第一个函数是onclick，即event会默认作为第一个参数传入，而foo函数没有将event作为参数传入，这样严重限制了getEvent的灵活性，所以我们需要修改下**getEvent**函数。
<!--more-->
我们知道`arguments.callee`是函数本身，在匿名函数中可以作为递归使用，那么`arguments.callee.caller`指的是调用本函数的上一级函数的函数。
例如getEvent的caller为foo，foo的caller为onclick，依次类推……

所以我们的getEvent函数最终可以这样来写：

```javascript

function getEvent(){
	if(window.event){
		return window.event;
	}
	var f = arguments.callee.caller;
	do{
		var e = f.arguments[0];
		if(e && (e.constructor === Event || e.constructor===MouseEvent || e.constructor===KeyboardEvent)){
			return e;
		}
	}while(f=f.caller);
}
```