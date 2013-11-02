title: "jQuery插件pager修改版-更加智能"
id: 63
date: 2009-09-24 08:29:31
tags: 
categories: 
- 网络技术
---

我的新版[**爱墙**](http://love.2fool.cn)使用了jQuery的pager插件，可是对于老外的插件我实在是不敢恭维，比较难用，并且只能设置显示页面字数为奇数，如果为偶数则比设定的页数多一！并且不能自己设置每页显示多少页码，二是默认的9个页码，很不方便~

研究了一下，自己修改了下[**Pager**插件](http://js8.in/mywork/pager/pagerDIY.rar)，本次修改添加了“上下页”、“首页”、“最后一页”自己定义样式，比如：使用“上一页”“&gt;&gt;”“next”之类的字符，并且自动设置显示不显示上下页，首页，最后一页。
[demo1](http://js8.in/mywork/pager/PagerDemo.html) [demo2](http://js8.in/mywork/pager/PagerDemo2.html)

### 比如代码
var show2={per:6,index:{n:"首页",m:"first"},pre:{n:"prev",m:"prev"},next:{n:"next",m:"next"},last:{n:"最后一页",m:"last"}};
$("#pager2").pager({ pagenumber: 1, pagecount: 15, buttonClickCallback: PageClick2,show:show2 });
<!--more-->

### 参数说明

pagenumber为当前页码
pagecount为总页数
buttonClickCallback为返回函数，参数pageclickednumber为点击后当前页码
show：是一个对象，是我添加的设置**参数**
per为默认显示多少页码，index为首页设置，index为空或者n为0为不设置，其中n为显示的名字，如“首页”、m为标示符，"first"~
依此类推……
![Snap1](http://js8.in/wp-content/uploads/2009/09/Snap11-150x54.jpg "Snap1")![Snap2](http://js8.in/wp-content/uploads/2009/09/Snap2-150x76.jpg "Snap2")