title: "引入CSS 的两种方式：link和@import的区别"
id: 554
date: 2010-06-19 20:37:44
tags: 
categories: 
- CSS
---

引入**css**外部文件的两种方法为在html页面通过**link**，src属性（[注意空链接时的陷阱](http://js8.in/555.html "img,Script,Link等标签为空可导致页面多余请求")！），再者是通过CSS文件本身通过**@import url()**引入，虽然这两种方式都可以加载进来CSS文件，可是link和@import也存在着细微的差别。

### 隶属上的差别

link属于XHTML标签，而@import完全是**CSS**提供的一种方式。link标签除了可以加载CSS外，还可以做很多其它的事情，比如定义RSS，定义rel连接属性等，@import就只能加载CSS了。此处注意[浏览器的link src为空时候时会导致页面加载次数增多](http://js8.in/555.html "img,Script,Link等标签为空可导致页面多余请求")。

### @import次数限制

传闻在IE6下，@import只能引入31次css文件，可是可以通过在css文件中再次import来垂直扩展，[断桥残雪](http://js8.in "专注前端开发")没有测试过，不过如果出现这样的情况，说明这个写代码的人也挺变态的。

### 加载顺序的不同

当一个页面被加载的时候（就是被浏览者浏览的时候），link引用的CSS文件会同时被加载，而@import引用的CSS 会等到页面全部被下载完再被加载。所以有时候浏览@import加载CSS的页面时开始会没有样式，然后突然样式会出现，网速慢的时候还挺明显，@import这点跟把CSS文件放在页面结尾效果相同，不过如果我们一些样式开始页面并不会出现，而是在交互时才出现的CSS样式，可以通过这个方法引入，时间上错开。例如：Ajax的html，交互时的弹出框，弹出div等
<!--more-->

### 兼容性上的差别

由于@import是CSS2.1提出的，@import只有在IE5以上的才能识别，而link标签无此问题（似乎影响不大~）。

### 使用DOM控制样式时的差别

当使用javascript控制DOM(**document.styleSheets**)去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。

<span style="color: #ff6600;">所以，无特殊情况推荐使用link来引入样式，尽量避免使用@import，而如果进行Ajax或者交互的样式，则可以通过@import引入</span>