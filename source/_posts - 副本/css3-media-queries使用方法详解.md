title: "CSS3 Media Queries使用方法详解"
id: 643
date: 2010-12-07 21:57:34
tags: 
categories: 
- CSS
- 网络技术
---

在css2中允许我们使用media的属性，例如使用screen和print，我也写过一篇关于[使用CSS media的print来定义打印网页](http://js8.in/351.html "使用CSS控制打印页面格式")的样式的文章，关于css2中的media文章，推荐下[w3c的](http://www.w3.org/TR/CSS2/media.html)。今天来说说CSS3的Media Queries。CSS3中不仅仅可以使用screen和print，而且支持多媒体多分辨率的样式表。

我们先来看下CSS3 Media Queries的演示实例：[http://js8.in/mywork/css3media.html](http://js8.in/mywork/css3media.html "CSS3 Media Query 演示")，来自于（[Web Designer Wall](http://www.webdesignerwall.com/tutorials/css3-media-queries/)）

### Max Width

故名思意，就是最大宽度的意思，例如下面的代码是在宽度小于600px的时候才执行的。
<pre lang="css">@media screen and (max-width: 600px) {
  .class {
    background: #ccc;
  }
}
</pre>

也可以在link标签里面使用media属性，即下面的写法：
<pre lang='html'>
<link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css" />
</pre>

### Min Width

跟Max Width相反，是最小宽度，例如当宽度大于900px的时候才运行下面的代码
<pre lang="css">@media screen and (min-width: 900px) {
  .class {
    background: #666;
  }
}
</pre>
<!--more-->
也可以在link标签里面使用media属性，即下面的写法：
<pre lang='html'>
<link rel="stylesheet" media="screen and (min-width: 900px)" href="big.css" />
</pre>

### Max和Min组合使用

例如下面的代码是当屏幕的宽度在600px~900px之间才有效的：
<pre lang="css">@media screen and (min-width: 600px) and (max-width: 900px) {
  .class {
    background: #333;
  }
}
</pre>

### Device Width

这里的意思指的是设备的最大宽度，就是屏幕的宽度，像素，例如下面的代码:
<pre lang="css">@media screen and (max-device-width: 480px) {
  .class {
    background: #000;
  }
}
</pre>

### 知道这些有啥用？

我们了解了CSS3的Media Queries的使用方法，就可以简单的使用CSS来控制不同的浏览器甚至不同的设备（例如iPhone，iPad等）使用不同的CSS文件，或者不同的css代码。

### 在IE中使用CSS3的Media Queries

在IE家族中CSS3的Media Queries只用在IE8+的浏览器才得到支持，而中国国内份额最大的IE6、IE7是不支持的，不过我们可以通过下面推荐的三篇教程方法来解决这个问题。

1.  [CSS Tricks - using jQuery to detect browser size](http://css-tricks.com/resolution-specific-stylesheets/)
2.  [The Man in Blue - using Javascript](http://www.themaninblue.com/experiment/ResolutionLayout/)
3.  [jQuery的 Media Queries 插件](http://plugins.jquery.com/project/MediaQueries)