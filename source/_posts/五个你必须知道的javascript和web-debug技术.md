title: 五个你必须知道的javascript和web debug技术
date: 2013-11-20 11:51:05
tags:
- debug
- javascript
categories:
- 前端技术
---
在前端开发中，调试技术是必不可少的技能，本文将介绍五种前端开发必备的调试技术。

1. Weinre移动调试
1. DOM 断点
1. debugger断点
1. native方法hook
1. 远程映射本地调试

## Weinre
在移动上面开发调试是很复杂的，所以就有了*weinre*。安装[weinre](http://people.apache.org/~pmuellr/weinre/docs/latest/)可以实现pc来调试手机页面，所以对于移动开发调试是很重要的哦~

![http://people.apache.org/~pmuellr/weinre/docs/latest/images/weinre-demo.jpg](http://people.apache.org/~pmuellr/weinre/docs/latest/images/weinre-demo.jpg)
### 安装weinre
weinre可以通过npm来安装：
```bash
npm install -g weinre
```

安装完之后，可执行下面的命令来启动：

```bash
weinre --httpPort 8080 --boundHost -all-
```

<!--more-->
这样访问自己的127.0.0.1:8080按照提示在需要调试页面中插入一段js，然后就可以调试了。操作界面类似Chrome的 DevTools，具体操作可以看下[http://people.apache.org/~pmuellr/weinre/docs/latest/Running.html](http://people.apache.org/~pmuellr/weinre/docs/latest/Running.html)教程

### 原理

通过在需要调试的页面中引入一段weinre的js，实现pc和手机的socket通信，从而实现实时调试。

### Tips

1. 如果你嫌每次都要在调试的页面引入js麻烦，可以做个书签或者chrome插件
1. 如果嫌安装麻烦，可以使用phonegap的weinre：[http://debug.phonegap.com/](http://debug.phonegap.com/)

## DOM断点
*DOM断点*是一个Firebug和chrome DevTools提供的功能，当js需要操作打了断点的DOM时，会自动暂停，类似debugger调试。

### 使用DOM断点
1. 选择你要打断点的DOM节点
1. 右键选择``Break on..``
1. 选择断点类型

![DOM断点](/uploads/2013/11/dom.png)
### Tips
* Firebug中，DOM断点可以在Script> Breakpoints里面看到
* chrome DevTools中，需要在Elements面板的DOM Breakpoints中看到

## javascript的debugger语句

需要调试js的时候，我们可以给需要调试的地方通过``debugger``打断点，代码执行到断点就会暂定，这时候通过单步调试等方式就可以调试js代码

### 使用javascript的断点
在需要打断点的地方添加``debugger``：

```javascript
if (waldo) {
debugger;
}
```

这时候打开console面板，就可以调试了

### Tips

如果你不知道怎么调试，那么尽快看下：[Chrome DevTools](https://developers.google.com/chrome-developer-tools/docs/javascript-debugging#breakpoints)中断点部分的教程

## 原生代码的hook调试

因为浏览器自己会内置一些类似``window``对象这些原生的js方法，当你知道原生代码的确有问题，但是你又不能跟踪调试的时候，你就可以用这个方法了。

### 举个例子
例如我们注意到了一个DOM的属性值发生了变化，但是我们不知道是哪里的代码导致的变化，所以我们可以给DOM元素的``setAttribute``打个断点，代码如下：
```javascript
var oldFn = Element.prototype.setAttribute;

Element.prototype.setAttribute = function (attr, value) {
    if (value === "the_droids_you_are_looking_for") {
        debugger;
    }
    oldFn.call(this, attr, value);
}
```
这样，当元素的属性发生了变化的时候，就会执行到断点，你就可以在断点的栈中找出调用的地方来~

### Tips
这种方法不保证在所有浏览器中有效，比如ios的safari 隐私模式下，我们就不可以修改``localStorage``方法

## 远程映射本地调试
当线上某个js/css出现问题，我们可以用代理的方式，将远程的文件代理到本地来实现远程映射调试。其实除了这个功能，还可以作为抓包工具，这在移动端是很重要的。推荐Mac用``charles Proxy``（[http://www.charlesproxy.com/](http://www.charlesproxy.com/)）， windows用户使用``fiddler``（[http://fiddler2.com/](http://fiddler2.com/)）

这个就不多说了，直接上国内的几篇文章：

* [http://www.cnblogs.com/tankxiao/archive/2012/02/06/2337728.html](http://www.cnblogs.com/tankxiao/archive/2012/02/06/2337728.html)
* [http://www.cnblogs.com/TankXiao/p/3063871.html](http://www.cnblogs.com/TankXiao/p/3063871.html)


原文阅读（本文没有完全翻译，有所扩展）：[http://techblog.badoo.com/blog/2013/11/18/5-advanced-javascript-and-web-debugging-techniques-you-should-know-about/](http://techblog.badoo.com/blog/2013/11/18/5-advanced-javascript-and-web-debugging-techniques-you-should-know-about/)
