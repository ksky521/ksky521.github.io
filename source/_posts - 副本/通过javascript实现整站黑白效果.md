title: "通过javascript实现整站黑白效果"
id: 529
date: 2010-04-22 16:23:00
tags: 
categories: 
- JavaScript
---

前天是哀悼日，急急忙忙的写了一篇关于通过CSS使网站实现**黑白效果**的文章（[悼念地震，网站变灰CSS代码](http://js8.in/528.html "哀悼地震，实现整站黑白效果")），可是这个方法使用的是IE的**滤镜**，具有一定的局限性。今天在网上看到有人推荐的一个不错的方法，试了一下，效果还是可以的，可以自定义让网页的某一部分变成灰度颜色(**黑白**)，演示效果：[http://james.padolsey.com/demos/grayscale/](http://james.padolsey.com/demos/grayscale/)。并且支持Firefox，chrome，IE6+。

使用方法：

1.  首先在网页中引入[grayscale.js](http://james.padolsey.com/demos/grayscale/grayscale.js)文件。
2.  执行grayscale函数即可。
<pre lang="javascript">grayscale(document.body);  //整站变成黑白效果
grayscale(getElementById(el));//部分变黑白效果</pre>