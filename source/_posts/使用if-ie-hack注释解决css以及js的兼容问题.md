title: "使用if IE hack注释解决CSS以及JS的兼容问题"
id: 381
date: 2009-12-16 23:39:55
tags:
- css
- javascript
- 网络技术
categories:
- 前端开发
---
在**IE CSS hack**([更多方法](http://js8.in/382.html))当中常用到if IE 来判断浏览器的类型，解决CSS甚至于JS的**兼容**性问题，之前大家可能知道if IE来解决**CSS的兼容**性问题，其实if IE不仅仅是用于CSS hack的使用，我们在前端开发中甚至可以使用**if IE**来做JS的处理，如下面的代码：
> &lt;!--[if IE 5]&gt; &lt;script&gt;document.write("仅IE5.0与IE5.5可以识别");&lt;/script&gt; &lt;![endif]--&gt;
> 
> &lt;!--[if gte IE 5.0]&gt;&lt;script&gt;document.write("IE5.0以及IE5.0以上版本都可以识别");&lt;/script&gt;&lt;![endif]--&gt;
> 
> &lt;!--[if IE 6]&gt;&lt;script&gt;document.write("仅IE6可识别");&lt;/script&gt;&lt;![endif]--&gt;
> 
> &lt;!--[if lt IE 6]&gt;&lt;script&gt;document.write("IE6以下版本可识别");&lt;/script&gt;&lt;![endif]--&gt;
> 
> &lt;!--[if gte IE 6]&gt;&lt;script&gt;document.write("**IE6**以及IE6以上版本可识别");&lt;/script&gt;&lt;![endif]--&gt;
> 
> &lt;!--[if IE 7]&gt;&lt;script&gt;document.write("仅IE7可识别");&lt;/script&gt; &lt;![endif]--&gt;
> 
> &lt;!--[if lt IE 7]&gt;&lt;script&gt;document.write("IE7以下版本可识别");&lt;/script&gt;&lt;![endif]--&gt;
> 
> &lt;!--[if gte IE 7]&gt;&lt;script&gt;document.write("IE7以及IE7以上版本可识别");&lt;/script&gt;&lt;![endif]--&gt;
下面对**if IE**做一下详细的解释：
<!--more-->
> **lte**：就是Less than or equal to的简写，也就是小于或等于的意思。
> 
> ** lt** ：就是Less than的简写，也就是小于的意思。
> 
> ** gte**：就是Greater than or equal to的简写，也就是大于或等于的意思。
> 
> ** gt** ：就是Greater than的简写，也就是大于的意思。
> 
> ** !** ：就是不等于的意思，跟javascript里的不等于判断符相同
当然我们也可以使用if IE的注释来引入 js文件，以及**CSS hack**（[更多方法](http://js8.in/382.html)）文件，如下面的代码：
> &lt;!--[if lte IE 6]&gt;
> &lt;!-- 如果IE浏览器版本小于等于6,调用ie6.css样式表 --&gt;
> &lt;link rel="stylesheet" type="text/css" href=["http://js8.in](http://js8.in)/ie6.css" /&gt;
> &lt;![endif]--&gt;
> 
> &lt;!--[if lte **IE 6**]&gt;
> &lt;!-- 如果IE浏览器版本小于等于6,调用ie6.js样式表 --&gt;
> &lt;script type="text/javascript" src="[http://js8.in/ie6.js](http://js8.in)"&gt;&lt;/script&gt;
> &lt;![endif]--&gt;
最后，其实**if IE**的判断是可以镶嵌来写的，如下面的代码，采用了多级的判断：
> &lt;!--[if IE]&gt;
> &lt;h1&gt;您正在使用IE浏览器&lt;/h1&gt;
> &lt;!--[if IE 5]&gt;
> &lt;h2&gt;版本 5&lt;/h2&gt;
> &lt;![endif]--&gt;
> 
> &lt;!--[if IE 5.0]&gt;
> &lt;h2&gt;版本 5.0&lt;/h2&gt;
> &lt;![endif]--&gt;
> 
> &lt;!--[if IE 5.5]&gt;
> &lt;h2&gt;版本 5.5&lt;/h2&gt;
> &lt;![endif]--&gt;
> 
> &lt;!--[if IE 6]&gt;
> &lt;h2&gt;版本 6&lt;/h2&gt;
> &lt;![endif]--&gt;
> 
> &lt;!--[if IE 7]&gt;
> &lt;h2&gt;版本 7&lt;/h2&gt;
> &lt;![endif]--&gt;
> &lt;![endif]--&gt;
更多的CSS Hack方法，请继续阅读《_[主流浏览器的CSS Hack方法整理](http://js8.in/382.html)_》