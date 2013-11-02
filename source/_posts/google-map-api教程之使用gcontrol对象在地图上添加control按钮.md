title: "Google Map API教程之使用GControl对象在地图上添加control按钮"
id: 564
date: 2010-06-27 19:45:25
tags:
- javascript
categories:
- 前端开发
---
今天查看我[网站的地图](http://ditu.js8.in "全国地图经纬度查询")已经被谷歌收录了5900条，而百度也开始收录了，很欣慰~再接再厉，今天写的这一篇**Google map api教程**是关于在Google地图上添加control按钮的，用到的是Google Map API的`**GControl**`对象，通过initialize的方法插入一个div到地图上，再通过`new **GControlPosition**`设置按钮的位置，最后通过Gmap的`**addControl**`方法添加这个按钮。最终效果截图如下：

[![control](/uploads/2010/06/control-300x171.jpg "control")](http://js8.in/mywork/googlemap/gcontrol.html)

### 实现方法原理分析

首先建立一个GControl的原型control，然后定义其initialize 方法：主要是建立一个div，并且制定div的onclick事件，最后通过`gmap.getContainer().appendChild(buttonDiv)`插入到地图中去。
最后定义`getDefaultPosition`的方法，通过`GControlPosition`对象设置按钮所在地图的具体位置。
<!--more-->

### Google Map API 代码


```javascript
function control() {};
control.prototype = new GControl();
control.prototype.initialize = function(gmap){
	var buttonDiv = document.createElement("div");
	buttonDiv.id = "control";
	buttonDiv.appendChild(document.createTextNode("清除标点"));
	buttonDiv.onclick = function(){
		gmap.clearOverlays();
	};
	gmap.getContainer().appendChild(buttonDiv);
	return buttonDiv;
};

control.prototype.getDefaultPosition = function(){
	return new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(510, 7));
};```
最后我们再通过`gmap.addControl(new control());`将这个按钮加入到地图中

[全国地图经纬度查询](http://ditu.js8.in) | [利用GControl对象在地图上添加control按钮实例](http://js8.in/mywork/googlemap/gcontrol.html)