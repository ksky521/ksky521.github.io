title: "JS的Image对象可用于检测图片类型是否合法"
id: 594
date: 2010-08-29 23:42:35
tags: 
categories: 
- JavaScript
- 网络技术
---

项目中假如碰到了上传图片文件时，需要在后台加检测程序，判断图片类型是否合法，以防止一些非法的文件上传，如果对js的**Image**对象比较熟悉我们可以使用下面的方法在**前端**层次上检查下图片类型是否合法。

<pre lang="javascript">
       var img = new Image();
        img.onload = function(){
            alert('load');
        };
        img.onerror = function(){
            alert('error');
        };
        img.src = 'logo.png';
</pre>
<!--more-->
这样假如我们上传的是一张虽然文件的扩展名为png，但是实际上是php的文件，就会出现`alert`

[断桥残雪](http://js8.in)的另外两篇关于**javascript**的image对象的文章：《[IE中多帧GIF可以触发多次Image().load事件](http://js8.in/569.html)》、《[IE中Image.onload失效的问题](http://js8.in/501.html)》

[caption id="attachment_590" align="aligncenter" width="147" caption="订阅断桥残雪部落格"][![断桥残雪部落格最新的订阅地址](http://js8.in/wp-content/uploads/2010/08/logo_147x47.gif "断桥残雪部落格最新的订阅地址")](http://feed.feedsky.com/r57c)[/caption] 