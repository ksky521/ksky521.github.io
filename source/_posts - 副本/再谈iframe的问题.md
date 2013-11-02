title: "再谈Iframe的问题"
id: 638
date: 2010-11-09 19:58:18
tags: 
categories: 
- Ajax
- JavaScript
- 网络技术
---

**iframe**是可以做的事情非常多，比如[通过iframe实现跨域](http://js8.in/443.html "用document.domain+iframe实现Ajax跨子域")，使用[iframe解决IE6下select遮挡不住的问题](http://js8.in/553.html "解决IE6 select z-index无效，遮挡div的bug")，通过[iframe解决Ajax的前进后退](http://js8.in/311.html "关于Ajax在浏览器中产生前进后退的实现方法")问题，再比如通过iframe实现异步上传。在很早我就写过一篇文章说明了[Iframe在IE、firefox下的一些DOM操作](http://js8.in/463.html "使用JavaScript在IE和Firefox下进行iframe的DOM操作")。今天结合最近项目中遇见的**iframe问题**，再来谈谈iframe的一些常见问题解决方案。

### IE下iframe背景透明问题

在firefox下，iframe背景默认的是透明的，在IE下默认不是透明的，我们可以使用`allowTransparency='true' `来设置IE下的iframe为透明，另外我们使用`scrolling ='no' ``frameborder='0'`分别来实现iframe页面没有滚动条，边框宽度。

### IE6下iframe不显示的问题

不得不说**IE6**是个操蛋的浏览器，尤其是在中国！iframe有的时候在IE6中会出现不显示的问题，主要有以下几种原因，请一一排查：

1.  可能你的iframe没有设置宽高，例如在table不居中，计算不出来td的高度，会导致这种问题
2.  尝试使用下面的代码来重新载入IE6下的iframe页面：
> <pre lang="javascript">
> setTimeout(function(){
> 	document.frames['fuckIE6'].location.reload();
> },0)
> </pre>

3.  传闻iframe标签中不要把src紧跟在iframe之后，也就是`&lt;iframe src='js8.in' name='fuckIE6'&gt;&lt;/iframe&gt;`是错误的，不过我没有碰见过类似的问题，为了保险起见，还是不要写成上面的样式为妙。
<!--more-->

### iframe跨域问题

如果遇见了iframe跨子域的问题，可以尝试在父窗口和子窗口添加`document.domain="js8.in"`来解决。

### iframe DOM操作问题

iframe的DOM操作，我在《[使用JavaScript在IE和Firefox下进行iframe的DOM操作](http://js8.in/463.html "使用JavaScript在IE和Firefox下进行iframe的DOM操作")》中已经讲解的比较详细，并且有详细的[演示](http://js8.in/mywork/iframe_dom/ "使用JavaScript在IE和Firefox下进行iframe的DOM操作") ，在子窗口B操作子窗口A的时候，我使用的是通过子窗口B操作父窗口来间接操作子窗口A，也就是说通过parent来选择子窗口A然后再对其进行操作。不要使用子窗口B来创建一个DOM对象然后插入到父窗口。因为这样的操作会在IE下出错！例如下面的例子：
子窗口中的js代码：
<pre lang="javascript">
var div = document.createElement('div');
div.id="fuckIE6";
div.innerHTML="fuckIE6";
parent.document.getElementsByTagName('body')[0].appendChild(div);
</pre>
上面的代码会在IE出现问题，所以正确的方法是：
<pre lang="javascript">
var div = parent.document.createElement('div');
div.id="fuckIE6";
div.innerHTML="fuckIE6";
parent.document.getElementsByTagName('body')[0].appendChild(div);
</pre>
也就是通过父窗口创建DIV标签，然后在插入到body之后。