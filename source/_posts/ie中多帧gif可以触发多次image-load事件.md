title: "IE中多帧GIF可以触发多次Image().load事件"
id: 569
date: 2010-07-06 20:47:59
tags:
- javascript
categories:
- 前端开发
---
昨天同事负责一个首页广告，广告采用的是**多帧GIF**动画，在HTML演示页面中采用的是jpg，运用Image对象的**load事件**来加上广告，这样就避免了广告播放出来而图片还没有加载完成的尴尬局面，但是却遇到了一个超级郁闷的事情，那就是在IE中load事件不停的执行，找了很多原因，最后在google上找到了：原来是多帧GIF引起的Image().load事件重复触发的问题。又一次长见识了！而且还有人发帖说可以通过这个bug来模拟js的多线程~

解决方法：
> 
```javascript
var img=new Image();
> img.load=function(){
>     //do something
>    img.load=null;//重新赋值为null
> }
> img.src='××.gif';```