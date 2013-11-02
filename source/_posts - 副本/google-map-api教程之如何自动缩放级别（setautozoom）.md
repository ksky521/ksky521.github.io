title: "Google Map API教程之如何自动缩放级别（setAutoZoom）"
id: 562
date: 2010-06-24 18:55:35
tags: 
categories: 
- JavaScript
---

最近花了两晚上的时间写了一个[google地图](http://ditu.js8.in "Google Map API应用程序")的应用程序，采用了**map api**，**weather api**，**localsearch api**，我想的是有空写一些关于**Google Map API**的文章，今天就写一个关于自动缩放地图到合适级别的方法，这里说的自动缩放，指的是地图上已经加入了很多**Gmarker**点，而这些点任何地方都有，我们为了要它们在地图上能够都显示出来，必须要个Google Map设置一个合适的缩放级别和中心点，这里用的方法是Google Map API的**GLatLngBounds**。

假设我们创建的Google Map对象为`gmap = new GMap2()`，我们添加所有**GMarker**都保存在一个名字为markers的数组里，它们的点遍布各地，我们要做的就是要这些点都在地图上显示出来，也就是自动缩放地图（set auto zoom）。

<!--more-->

首先我们`bounds = new **GLatLngBounds**();`，然后我们使用一个循环把所有的GMarker中的GLatLng对象传给bounds，即：`bounds.extend(markers[i].getLatLng())`，做完循环之后我们就可以通过以下的代码set auto zoom了：
`gmap.setCenter(bounds.getCenter(),gmap.getBoundsZoomLevel(bounds);`
结合起来就是下面的setAutoZoom的函数：
<pre lang="javascript">function setAutoZoom(gmap,markers){
	var i=markers.length,bounds = new GLatLngBounds();
	while(i--){
		bounds.extend(new GLatLng(markers[i].y,markers[i].x));
	}
	gmap.setCenter(bounds.getCenter(),gmap.getBoundsZoomLevel(bounds)); 
}</pre>

[查看Google Map Api setAutoZoom实例](http://js8.in/mywork/googlemap/setautozoom.html)