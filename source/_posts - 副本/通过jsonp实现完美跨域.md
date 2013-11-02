title: "通过JSONP实现完美跨域"
id: 548
date: 2010-06-11 20:17:47
tags: 
categories: 
- Ajax
- JavaScript
---

以前我经常在博客说**JSONP**，例如我的[WordPress天气插件](http://js8.in/wordpress-weather "WordPress天气预报插件")就是通过JSONP来调用的天气数据，今天就说说通过JSONP实现**跨域**的应用~

### 什么是JSONP

JSONP即JSON with Padding。由于同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源。如果要进行跨域请求，我们可以通过使用 html的script标记来进行跨域请求，并在响应中返回要执行的script代码，其中可以直接使用JSON传递javascript对象。这种跨域的通讯方式称为JSONP。

对于上面的解释，我们可以简单这样理解：JSONP就是可以通过**JavaScript**文件进行跨域通讯的方式，例如：现在各大网站风靡的搜索提示，[搜狗云输入法](http://js8.in/314.html "搜狗云输入法解析")
注意：**JSONP**服务器端代码需要充分做好**安全**措施。
<!--more-->

### 最简单的JSONP

> <pre lang="javascript">var JSONP = document.createElement("script") ;
> //FF:onload IE:onreadystatechange
> JSONP.onload = JSONP.onreadystatechange = function(){
> 	//onreadystatechange，仅IE
> 	if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
> 		alert($("#demo").html());
> 		JSONP.onload = JSONP.onreadystatechange = null//请内存，防止IE memory leaks
> 	}
> }
> JSONP.type = "text/javascript";
> JSONP.src = "http://a.pojaaimg.cn/2010/js/jquery.js";
> //在head之后添加js文件
> document.getElementsByTagName("head")[0].appendChild(JSONP);</pre>
简单解释：我们通过创建script，然后指定它的src等属性，然后插入到head执行
<span style="color: #ff6600;"> 建议</span>：onload、onreadystatechange 写在src赋值之前，防止载入js太快而没有给onload、onreadystatechange 赋值（[Image对象在IE下具有此类现象](http://js8.in/501.html "IE中image onload失效")）

### JSONP实例

我们可以首先定义一个函数来执行JSONP返回的数据，然后通过JSONP的src传此函数给后台，进行处理，返回可执行的函数。例如下面代码：
> <pre lang="javascript">function jsonpHandle(a){
>     alert(a);
> }
> var JSONP = document.createElement("script") ;
> JSONP.type = "text/javascript";
> JSONP.src = "http://js8.in/jsonp.php?callback=jsonpHandle";
> //在head之后添加js文件
> document.getElementsByTagName("head")[0].appendChild(JSONP);</pre>
后台jsonp.php的代码：
> <pre lang="php">echo $_GET["callback"]."('hello,world')";</pre>