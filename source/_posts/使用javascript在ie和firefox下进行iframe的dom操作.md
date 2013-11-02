title: "使用JavaScript在IE和Firefox下进行iframe的DOM操作"
id: 463
date: 2010-01-25 20:59:38
tags:
- javascript
- 网络技术
categories:
- 前端开发
---
昨天一个新来的同事关于**iframe**中进行**DOM操作**的问题，我说只要是不存在跨域的问题，是可以进行iframe 之间的DOM操作的。并且拿了以前写的两篇文章给新同事进行参考——《[用document.domain+iframe实现Ajax跨子域](http://js8.in/443.html "用document.domain+iframe实现Ajax跨子域")》、《[于Ajax在浏览器中产生前进后退的实现方法](http://js8.in/311.html "于Ajax在浏览器中产生前进后退的实现方法")》。其中关于使用iframe进行跨域的[demo](http://js8.in/mywork/crossdomain/index.html "iframe跨域演示实例")，由于更换了新域名**js8.in**，导致了[demo](http://js8.in/mywork/crossdomain/index.html)不能使用了，昨天紧急修改了一下，总算是可以使用啦~窃喜~

今天就写个完整的使用**JavaScript**进行iframe DOM操作的文章啦~跟大家讨论下IE和Firefox下**iframe DOM操作**的差异，然后写一个父窗口操作子窗口DOM，子窗口操作父窗口DOM，子窗口操作子窗口DOM的实例。经测试，断桥残雪写的iframe DOM操作实例，不仅仅只是在IE和Firefox下使用正常，而是可以**兼容所有浏览器的**。本文只是借IE和Firefox在iframe DOM操作的不同，进行分析说明JavaScript在DOM操作中两者的不同。

### IE和Firefox对iframe document对象的差异性

在IE6、IE7中，我们可以使用 **document.frames[ID].document** 来访问iframe子窗口中的**document对象**，可是这是不符合W3C标准的写法，也是IE下独有的方法，在Firefox下却不可以使用，Firefox下使用的是符合W3C标准的 **document.getElementById(ID).contentDocument **方法，今天我在写实例的时候，通过IE8进行测试，IE8也是使用的符合W3C标准的 document.getElementById(ID).contentDocument 方法。所以我们可以写一个在IE和Firefox下通用的获取iframe document对象的函数—getIFrameDOM：
> 
```javascript
function getIFrameDOM(id){
> 	return document.getElementById(id).contentDocument || document.frames[id].document;
> }```
_P.S._:如果我们要获取iframe的**window对象**，而不是document对象，可以使用document.getElementById(ID).contentWindow的方法。这样我们就可以使用子窗口中的window对象了，比如子窗口中的函数。
<!--more-->

### 在子窗口使用父窗口的函数，获取父窗口document对象

在子窗口中，我们可以通过**parent**就可以获得父窗口的window对象，如果假如我们在父窗口有一个函数为getIFrameDOM，我们可以通过parent.getIFrameDOM来调用，同理我们使用parent.document就可以在子窗口中访问父窗口的document对象了。

### 使用JavaScript进行iframe的DOM操作实例

首先，我们在父窗口中引入两个iframe子窗口，ID分别为wIframeA、wIframeB，地址分别为：a.html、b.html。
父窗口主要HTML代码如下：> 
```html"><div id="pHello" style="margin:10px auto;width:360px;height:30px;
此处可通过iframeB的JavaScript函数，来替换哦~</div>
> <iframe id="wIframeA" name="myiframeA" src="a.html" scrolling="no" frameborder="0"></iframe>
> <iframe id="wIframeB" name="myiframeB" src="b.html" scrolling="no" frameborder="0"></iframe>```
在子窗口A、B中我放了一个ID为hello的P，以方便我们进行DOM操作演示，子窗口A、B的主要HTML代码如下：> 
```html

> 
> Hello World!
> ```
**1、在iframe中，父窗口操作子窗口的DOM**

建好了父窗口跟子窗口，这样我们可以在父窗口中，通过以下iframeA()函数来把子窗口A更换P的背景颜色为红色：
> 
```javascript
function iframeA(){//给子窗口A改变ID为hello的背景色
> 	var a = getIFrameDOM("wIframeA");
> 	a.getElementById('hello').style.background = "red";
> }
> function getIFrameDOM(id){//兼容IE、Firefox的iframe DOM获取函数
> 	return document.getElementById(id).contentDocument || document.frames[id].document;
> }```
**2、在iframe中，子窗口操作父窗口的DOM**

在子窗口中，我们可以方便的进行父窗口DOM操作，只需要在DOM操作之前添加亦歌parent对象的方法就可以啦，如：在上面的子窗口B中，我们可以使用下面的代码把，父窗口中ID为“pHello”的内容给替换掉:> 
```javascript
parent.document.getElementById("pHello").innerHTML="
> 
> O(∩_∩)O哈哈~用子窗口B就可以替换你！不服吗？
> ";```
**3、在iframe中，子窗口A操作子窗口B的DOM**

既然子窗口可以操作父窗口的window对象和document对象，那么子窗口也可以操作另外的子窗口的DOM啦~断桥残雪在子窗口B中可以直接使用parent直接调用父窗口中的getIFrameDOM函数获得子窗口A的document对象，这样要修改子窗口A的内容就很简单啦，如以下的代码：
> 
```javascript
var a=parent.getIFrameDOM("wIframeA");
> a.getElementById('hello').innerHTML="<span style='color:blue;font-size:18px;background:yellow;'>看，俺子窗口B也能DOM你A！</span>";```

### 完整的实例演示

点击下面地址就可以看到断桥残雪写的完整的iframe DOM操作的演示啦：

> <center>[JS进行iframe的DOM操作演示点击查看](http://js8.in/mywork/iframe_dom "使用JavaScript进行iframe的DOM操作演示")</center>

到这里，你还会以为iframe的DOM操作很难吗？嘿嘿~我想有了父窗口操作子窗口DOM，子窗口操作父窗口DOM，子窗口操作子窗口DOM这三个实例讲解，我们就可以对iframe的DOM操作了如指掌啦~其实iframe在我们开发中还有很多灵活的用法，比如跨域、实现Ajax的前进后退，该兴趣的童鞋可以继续深入的阅读下面两篇文章：[用document.domain+iframe实现Ajax跨子域](http://js8.in/443.html "用document.domain+iframe实现Ajax跨子域")》、《[于Ajax在浏览器中产生前进后退的实现方法](http://js8.in/311.html "于Ajax在浏览器中产生前进后退的实现方法")》