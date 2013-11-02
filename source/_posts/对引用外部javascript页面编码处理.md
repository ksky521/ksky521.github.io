title: "UTF-8页面引用外部编码为GBK的JS文件编码的处理"
id: 377
date: 2009-12-11 22:13:47
tags:
- javascript
- 网络技术
categories:
- 前端开发
---
昨天写的一个根据来访者IP返回来访者所在地区的天气情况的[WordPress天气插件](http://js8.in/wordpress-weather "WordPress 天气插件")侧边栏，效果见本[博客的首页](http://js8.in "断桥残雪部落格")侧边栏“天气预报”。其中根据**IP**返回来访者城市地理位置的方法是采用了QQ的一个接口：http://fw.qq.com/ipaddress,而这个接口提供的js为GBK编码的，由于[我的博客](http://js8.in "断桥残雪部落格")是UTF-8编码的，所以再次使用返回的城市名称在我页面显示的是**乱码**，而且不能引用的。

上网找了很多关于JavaScript把**GBK编码转换为UTF-8编码**的js函数，可是都无济于事，并且如果单单为了编码问题就单独写一个js函数来处理GBK转UTF-8编码，这是很不合理的~由于本来我引用的是QQ的根据IP返回城市接口，我自己是不能够改变QQ官方的**数据编码格式**的，解决的方法唯有我在我的程序中把**GBK编码**的js强制转换为utf-8的格式，怎么转换是个比较难的方式，既然不能通过写js函数，那就只用用其他的方式了。

最后我在网上找到了一个很好的解决方法，
<!--more-->比如对于QQ的**IP返回城市**的接口的js我们使用下面的代码，可是在UTF-8页面中正常的显示**GBK编码**的js
> &lt;script type="text/javascript" src="http://fw.qq.com/ipaddres" **<span style="color: #ff0000; padding: 0px; margin: 0px;">charset="gb2312"</span>**&gt;&lt;/script&gt;
这样子我就成功的解决了在UTF-8页面中引入编码为GBK的JavaScript文件乱码问题了。而且不需要额外的写函数处理**GBK转UTF-8编码**，同样对于GBK页面引用编码为UTF-8编码的**JavaScript文件**如果出现乱码问题，可以使用下面的代码来解决
> &lt;script type="text/javascript" src="test.js" **<span style="color: #ff0000; padding: 0px; margin: 0px;">charset="utf-8"</span>**&gt;&lt;/script&gt;
此方法是对于在js文件中出现**汉字中文**，以及其他容易造成在GBK与UTF-8编码错误字符的时候使用，对于纯英文的就不需要了。如果为了保险，加上也无妨~