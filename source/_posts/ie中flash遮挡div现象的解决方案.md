title: "IE中flash遮挡div现象的解决方案"
id: 622
date: 2010-09-08 01:58:05
tags:
- 网络技术
categories:
- 乱七八糟
---
今天开始给网站首页的广告管理系统添加**flash**广告代码，结果出现IE中（包括IE6+）弹窗广告要flash遮挡的问题，后来想到了常用的iframe方法（参见《[解决IE6 select z-index无效，遮挡div的bug](http://js8.in/553.html "解决IE6 select z-index无效，遮挡div的bug - 断桥残雪部落格")》），最终成功了flash遮挡DIV的bug，但是在IE中还出现了浮动的DIV变化位置后，flash出现div碎片的拖尾现象。继续寻找解决方案。最后终于找了原来flash有个参数wmode可以设置，于是代码变成了这样：
> &lt;embed src="s.swf" quality="high" **<span style="color: #ff0000;">wmode="Opaque" </span>**width="150" height="240"&gt;&lt;/embed&gt;
于是IE中Flash遮挡**DIV**的问题成功解决了，看图：

[![flash遮挡div问题的解决方案](/uploads/2010/09/flash-div-300x144.jpg "flash遮挡div问题的解决方案")](/uploads/2010/09/flash-div.jpg)

[![断桥残雪部落格最新的订阅地址](/uploads/2010/08/logo_147x47.gif "断桥残雪部落格最新的订阅地址")](http://feed.feedsky.com/r57c)