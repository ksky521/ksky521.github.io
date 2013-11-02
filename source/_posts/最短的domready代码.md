title: "最短的DOMReady代码"
id: 682
date: 2011-03-20 17:39:31
tags:
- javascript
- web前端开发
categories:
- 前端开发
---
自己的[js框架YQ](http://js8.in/677.html "一个轻量级的js框架")还没有添加**DOMReady**代码，今天看到国外js牛人Dustin Diaz的[文章](http://dustindiaz.com/smallest-domready-ever)，得到了一份最短的DOMReady代码，分享出来：

```javascript

function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
```

Dustin Diaz放弃了使用IE的`document.documentElement.doScroll('left')`（这也是多数框架的方法，[详细介绍](http://javascript.nwbox.com/IEContentLoaded/)）。使用了setTimeout来定时检测`document.readyState`，`document.readyState`有以下五种状态：
<!--more-->
> 0: (Uninitialized) the send( ) method has not yet been invoked. 
> 1: (Loading) the send( ) method has been invoked, request in progress. 
> 2: (Loaded) the send( ) method has completed, entire response received. 
> 3: (Interactive) the response is being parsed. 
> 4: (Completed) the response has been parsed, is ready for harvesting. 
> 
> 0 － （未初始化）还没有调用send()方法
> 1 － （载入）已调用send()方法，正在发送请求
> 2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
> 3 － （交互）正在解析响应内容
> 4 － （完成）响应内容解析完成，可以在客户端调用了

Dustin Diaz选择了正则匹配Interactive状态，而jQuery等框架清一色的匹配loaded或者completed。为了兼容IE的setTimeout，把第三个参数放到了第一个function参数里面，这样就形成了兼容IE6+，Chrome, Safari, Firefox 3.6+的DOMReady代码了。

本人在IE6+，Firefox3.6.15和chrom下测试，是完全正确的。

PS：YQ还有很多地方需要优化，比如事件委托，DOM操作，但是还是比较适合根据实际项目需要进行扩展的。有空继续完善……