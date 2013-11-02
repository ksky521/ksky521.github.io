title: "jQuery插件--wBox发布"
id: 502
date: 2010-03-08 21:56:44
tags: 
categories: 
- JavaScript
---

经过大约一周的时间，wBox终于跟大家见面啦，这是[断桥残雪](http://js8.in)写的第一个jQuery插件，开发时间比较急促，所以有不足之处希望大家指出。

**[wBox](http://code.google.com/p/follow5api/downloads/list)**——轻量级的弹出窗口**jQuery插件**，基于jQuery1.4开发，主要实现弹出框的效果，并且加入了很多有趣的功能，比如可img灯箱效果，callback函数，显示隐藏层，Ajax页面，iframe嵌入页面……

1.  背景透明度可以根据实际情况进行调节，甚至不设置背景
2.  可以根据需要添加wBox标题
3.  支持设置窗口位置，默认为在中心显示
4.  支持callback函数
5.  支持html内容自定义
6.  img灯箱看图功能
7.  支持在wBox显示#ID的内容
8.  支持Ajax页面内容
9.  支持设置背景，不设置背景
10.  支持wBox拖拽功能
11.  ESC键，或者在背景上双击即可关闭wBox
12.  .wBoxClose的内容click可以关闭wBox，无论是组装的html，还是隐藏的html，甚至于iframe的内容中的.wBoxClose
下面简单介绍下wBox的使用方法：

### 最简单的使用方法

1.  首先[下载wBox](http://code.google.com/p/follow5api/downloads/list "下载wbox")文件，然后将wBox中的
2.  引入wbox.js文件
3.  引入wbox.css文件
4.  <span style="color: #ff6600;">**注意**</span>：wBox源代码文件夹中的图片要跟js，css放在相同的目录下,loading.gif要跟你页面放在同一个目录
html代码如下：
<pre lang="html">[这是一个隐藏wBox](#nosee)
<div id="nosee" style="display:none">这里是个隐藏的id为nosee的DIV</div>
[这是一个image wBox](http://js8.in/wbox/001.jpg)</pre>
js代码如下：
<pre lang="javascript">$(".wBox").wBox();</pre>
这样就建立了一个最简单的wBox.
<div id="nosee" style="display:none">这里是个隐藏的id为nosee的DIV</div>
<!--more-->

[这是一个隐藏wBox](#nosee)  [这是一个image wBox](http://js8.in/wbox/001.jpg)

### 设置名字的wBox

<pre lang="javascript">$("#wbox1").wBox({
title: "Test Title Name",
html: "点击弹出设置名字的wBox"
});</pre>

### 背景为透明的wBox

<pre lang="javascript">$("#wbox2").wBox({opacity:0,html:'点击弹出背景为透明的wBox'});</pre>

### 弹出无背景wBox

<pre lang="javascript">$("#wbox3").wBox({overlay:false,html:'点击弹出无背景wBox'});</pre>

### href为图片的进行wBox

<pre lang="javascript">$('.wbox').wBox();</pre>

### 隐藏id为#info的层

代码：
<pre lang="javascript">$('.wbox').wBox();</pre>

### 可拖拽的#wBoxUL层

<pre lang="javascript">$('#drag').wBox({drag:true,title:'wBox功能简介部分的层'});</pre>

### img灯箱连看

<pre lang="javascript">$("#imgA").wBox({images:['001.jpg','002.jpg','003.jpg','004.jpg','005.jpg'],isImage:true});</pre>

### iframe页面嵌入百度

<pre lang="javascript">$("#isFrame").wBox({isFrame:true,iframeWH:{width:800,height:400}});</pre>

### 本地iframe 自使用高度

<pre lang="javascript">$("#isFrame2").wBox({isFrame:true});</pre>

### 设置位置为left300 top 100

<pre lang="javascript">$('#setPos').wBox({setPos:true,left:300,top:100,html:'设置位置为left300 top 100'});</pre>

### Ajax加载内容

<pre lang="javascript">$("#ajax").wBox();</pre>

### 没有标题的弹出框

<pre lang="javascript">$("#noTitle").wBox({noTitle:true});</pre>

### 利用callback添加地图的wBox

<pre lang="javascript">var maplet=null;
oo=false;
var callback=function(){
maplet = new Maplet('myMap');
maplet.centerAndZoom(new MPoint('HEUIDVZVVHUEEU'),8);
maplet.addControl(new MStandardControl({view: {pan:false,ruler: false}})); 
}
$("#map").wBox({
title:'<span style="font-size:14px">普加地图</span>--<span style="font-size:12px">可拖拽</span>',
html:"<div id='myMap' style='width:500px;height:400px;'></div>",
callBack:callback,drag:true});</pre>
加载地图-利用callback函数

[查看演示](http://js8.in/wbox/)