title: "chrome扩展应用开发教程之开发chrome应用基础"
id: 818
date: 2011-10-21 19:55:17
tags:
- chrome
categories:
- 前端开发
---

不得不说**chrome**做的真的不错，听了貘大大关于**chrome插件**机制的讲座，就有亲手做个chrome应用的冲动，这个周末终于抽时间做了一个简单的天气预报插件，原理还是很简单的，采用了weather.com.cn的数据，因为比较熟悉这个weather.com.cn的接口，所以很快就搞定一个简单的chrome天气预报应用了。废话不多说了，开始正文。


## chrome应用开发基础知识

chrome扩展应用是由html、css和javascript组成的，所以chrome应用的门槛比较低，对于一个**前端开发**者，只要读懂了chrome的开发文档，就可以很快的上手一个chrome应用。

每个chrome扩展都应该包含下面的文件：

> 一个包括一个manifest.json文件，是个配置文件，json格式，通过manifest.json可以设置应用的icon，指定默认的background.html或者popup.html……
> 一个或多个html文件（除非这个应用是一个皮肤）
> 可选的一个或多个javascript文件
> 可选的任何需要的其他文件，例如图片

在开发应用（扩展）时，需要把这些文件都放到同一个目录下。发布应用（扩展）时，这个目录全部打包到一个应用（扩展）名是.crx的压缩文件中。如果使用[Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)，上传应用（扩展），可以自动生成.crx文件。

下图是我天气预报插件的文件列表：
[![chrome天气预报插件目录结构](/uploads/2011/10/2011-10-21_215004.png "chrome天气预报插件目录结构")](/uploads/2011/10/2011-10-21_215004.png)

## chrome应用界面控制

chrome应用会以browser action或page action的形式在chrome浏览器界面上展现出来。每个应用扩展最多可以有一个browser action或page action。当应用（扩展）的图标是否显示出来是取决于单个的页面时，应当选择page action；当其它情况时可以选择browser action。

例如gmail提醒应用使用了browser action，它在工具栏上增加一个图标：

[![gmail应用使用browser action提示](/uploads/2011/10/gmail.png "gmail应用使用browser action提示")](/uploads/2011/10/gmail.png)

这个新闻阅读应用也使用了browser action，当点击时会弹出一个气泡窗口popup.html：
[![news使用的是popup的方式](/uploads/2011/10/news.png "news使用的是popup的方式")](/uploads/2011/10/news.png)

另外chrome还包括了[桌面提醒](http://dev.chromium.org/developers/design-documents/desktop-notifications/api-specification)（gmail新邮件提醒），主题（chrome皮肤），应用设置页面（应用设置页面），选项卡页面（新选项卡页面）等多种界面形式，本文示例使用的是browser action和popup页面来做一个简单的应用。

### chrome应用基本架构

绝大多数chrome应用会包含一个背景页面(background page)，用来执行chrome应用扩展的主要功能。该背景页面时再manifest.json中设置的：
```javascript
"background_page": "bg.html",//默认背景页面
```

[![chrome通过background.html来实现主要功能](/uploads/2011/10/background.gif "chrome通过background.html来实现主要功能")](/uploads/2011/10/background.gif)[/caption]

上图显示了安装了应用扩展的chrome。黄色图标代表的browser action和蓝色图标代表的page action。在background.html文件里定义了browser action和javascript代码。在两个窗口里browser action都可以工作。

背景页面并不是chrome应用中唯一的页面。例如，本例天气预报插件中还包括了一个弹窗页面(popup.html)，此页面也是又html页面实现的。在应用内部还可以使用chrome.tabs.create()或者window.open()来显示内部的HTML文件。

chrome应用的弹窗界面也是可以在manifest.json中设置的：

```javascript
"browser_action": {
    "default_icon": "icon.png" ,
    "default_title": "Weather",
    "default_popup": "popup.html"
  },
```
> 值得一提的是chrome应用里面的HTML页面可以互相访问各自DOM树中的全部元素，或者互相调用其中的函数。

下图显示了一个chrome应用的弹窗的架构。弹窗的内容是由HTML文件（popup.html）定义的web页面。它不必复制背景页面(background.html)里的代码，因为它可以直接调用背景页面中的函数！

[![chrome应用的弹窗界面](/uploads/2011/10/popup.gif "chrome应用的弹窗界面")](/uploads/2011/10/popup.gif)

### 应用文件的引用

任何需要的文件都可以放到应用（扩展）中，但是怎么使用它们呢？一般的说，可以像在普通的HTML文件中那样使用相对地址来引用一个文件。下面的例子演示了如何引用images子目录下的文件myimage.png

```html
<img src="img/myimage.png" alt="">
```

<!--more-->
**manifest.json**中的文件引用也是采用了相对路径的方式，如下面的代码"
```javascript
{
"name": "My Extension",//名字
"version": "2.1",//版本
"description": "Gets information from Google.",//描述
"icons": { "128": "icon_128.png" },//icon
"background_page": "bg.html",//默认背景page
"permissions": ["http://*.google.com/", "https://*.google.com/"],//跨域请求域名
"browser_action": {
    "default_icon": "icon.png" ,//界面显示的icon
    "default_title": "Weather",//界面icon鼠标滑过的title
    "default_popup": "popup.html"//弹窗界面
  }
}
```

### chrome应用页面间的通信

前面说到了，一个应用中background页面和popup页面之间可以随意的访问相互的DOM，并且可以使用对方的函数。这是因为同一个应用所有页面是在同一个页面的同一个线程中运行的（来自貘大大的ppt），它们之间可以直接互相调用各自的函数。

可以使用 chrome.extension的方法来获取**chrome应用**中的页面，例如getViews()和getBackgroundPage()。一旦一个页面拥有了对这个应用中其它页面的引用，它就可以调用其它页面中的函数，并控制它们的DOM树。

## chrome应用数据处理

### 数据存储

开发应用肯定会用到数据的处理，chrome是高级浏览器，所以我们可以使用html5的web storage api来存储数据。

### 跨域请求数据

作为一个web前端开发者，我们知道普通网页能够使用XMLHttpRequest对象发送或者接受服务器数据， 但是它们受限于同源策略。 扩展可以不受该限制。

但是chrome应用可以做到跨域请求数据，这是chrome的内置机制保证的。任何chrome扩展只要它先获取了跨域请求许可，就可以进行跨域请求。这个获取跨域请求许可方式就是在manifest.json中配置跨域授权的域名，例如：

```javascript
"permissions": [  "http://*.weather.com.cn/" ]
```

跨域允许设置可以使用完整域名, 例如:

* "http://www.google.com/"
* "http://www.gmail.com/"

或者使用模式匹配, 例如:

> "http://*.google.com/"

这里还需要注意访问权限是根据访问协议(匹配模式里的http或者https或者其他协议名)及域名来授予的。例如某个扩展希望同时基于https和http协议访问某个域或者某些域，那么它必须分别获取基于这两种协议的访问允许(类似下面这样的声明):
```javascript
"permissions": [
  "http://www.google.com/",
  "https://www.google.com/"
]```


### 跨域的安全性

跨域必然要面对的一个问题就是安全问题，尤其是chrome应用中，如果一个chrome应用留有安全隐患，那么所有在chrome浏览的页面都有危险，所以我们编写的背景页需要注意不要成为跨域脚本的牺牲品。例如下面的代码，就很危险：
```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://api.example.com/data.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // 警告! 这里有可能执行了一段恶意脚本!
    var resp = eval("(" + xhr.responseText + ")");
    // 警告! 这样处理有可能被注入恶意脚本!
    document.getElementById("resp").innerHTML = xhr.responseText;
    ...
  }
}
xhr.send();
```
要处理这些问题，需要用到json的解析器`JSON.parse`，在高级浏览器（比如chrome）中已经集成了JSON的操作，不需要引入json.js就可以操作了，所以上面的代码可以改写成：
```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://api.example.com/data.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // 警告! 这里有可能执行了一段恶意脚本!
    var resp = JSON.parse(xhr.responseText);
    // 警告! 这样处理有可能被注入恶意脚本!
    document.getElementById("resp").innerText= xhr.responseText;
    ...
  }
}
xhr.send();
```
今天关于**chrome应用开发**的教程就先写到这里，明天继续！
