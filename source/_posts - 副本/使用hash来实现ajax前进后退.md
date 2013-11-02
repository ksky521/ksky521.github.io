title: "使用hash来实现Ajax前进后退"
id: 464
date: 2010-01-26 16:22:12
tags: 
categories: 
- Ajax
- JavaScript
- 网络技术
---

Ajax应用中容易导致浏览器的**前进后退**按钮失效，不产生前进后退功能，在本文中断桥残雪就通过改变**location.hash**值来解决Ajax过程中导致的浏览器前进后退按键失效的问题，此方法兼容IE6+，Firefox，chrome，Safari，Opera等浏览器。

在去年断桥残雪已经写了一篇[使用iframe来解决Ajax前进后退](http://js8.in/311.html "关于Ajax在浏览器中产生前进后退的实现方法")的方法，也提到了通过改变hash的方法来解决这个问题，这也是比较方便的方法，而使用iframe实现Ajax前进后退可以在不改变浏览器地址栏地址的前提下通过iframe地址的变化来“欺骗”浏览器产生前进后退，hash的方法则是直接改变浏览器地址栏地址，从而使浏览器产生前进后退。

### hash导致浏览器产生前进后退原理

浏览器URL的hash值，指的是URL地址之后的**#hash**部分，我们可以通过JavaScript的location对象的**location.hash**方法来获得或者改变，但是IE中，不能设置，好像是IE中只能通过连接来实现hash的改变，不过我们可以通过jQuery插件hashchange中的$.locationHash函数来解决这个问题。

比如一个页面的地址是：http://js8.in/#top，那么这个页面的location.hash="#top"，如果要改变这个地址的hash，可以给location.hash赋值，如：location.hash="#home"，在IE下可以使用hashchange函数中$.locationHash(hash)给hash赋值。在日常我们常见的使用hash应用中，hash值使用最多的方式是 “**返回顶部**” 功能。
<!--more-->
当hash值改变的时候，浏览器地址也就发生了相应的变化，这样浏览器就会以为地址发生了变化，从而产生前进后退按钮的变化，在这时我们可以通过浏览器后退按钮，把URL“后退”为之前的URL（只是#后的hash变化而已）。我们可以通过浏览器的这一个特点来解决Ajax应用中导致的前进后退失效问题。

### 使用hash变化来解决Ajax导致浏览器前进后退按钮失效

在这里[断桥残雪](http://js8.in "断桥残雪部落格")使用jQuery以及jQuery的**[hashchange插件](http://plugins.jquery.com/project/hashchange "jquery hashchange 插件下载地址")**来写一个hash变化来解决上述问题。当我们引入**jQuery1.4**以及[hashchange插件](http://plugins.jquery.com/project/hashchange "jquery hashchange 插件下载地址")之后，我们就可以给window绑定一个hashchange事件，用来监控浏览器的hash是否发生了变化，也就是用户是否点击了浏览器的前进后退按钮，当用户点击前进或者后退之后，除非doHash函数来根据hash处理Ajax请求。具体js代码如下：> <pre lang="javascript">function setHash(a){
> 	$.browser.msie?$.locationHash(a):location.hash=a;
> }
> $(window).hashchange(function(){
> 	doHash();
> });
> function doHash(){
> 	var h = location.hash;
>         switch (h) {
>               case "#ajax1":
>                    ajaxFn1();
>                    break;
>               case "#ajax2":
>                    ajaxFn2();
>                    break;
>               default:
>                 $("#ajax").html("哈哈，hash没有啦！");
>         }
> }
> function ajaxFn1(){
> 	$("#ajax").load("hi.txt", function(){
> 		setHash("#ajax1");
> 	});
> }
> function ajaxFn2(){
> 	$.get("hi.html", function(t){
> 		$("#ajax").html(t);
> 		setHash("#ajax2");
> 	});
> }</pre>
断桥残雪简单的做了一个**demo演示**，大家可以点击查看一下：> <center>[使用hash来实现Ajax前进后退demo演示](http://js8.in/mywork/hashchange "使用hash来实现Ajax前进后退demo")</center>
另外一种解决Ajax前进后退按钮失效问题的方法，请查看文章：《[关于Ajax在浏览器中产生前进后退的实现方法](http://js8.in/311.html "关于Ajax在浏览器中产生前进后退的实现方法")》