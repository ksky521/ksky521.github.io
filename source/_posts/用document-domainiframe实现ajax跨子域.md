title: "用document.domain+iframe实现Ajax跨子域"
id: 443
date: 2010-01-09 01:03:36
tags:
- ajax
- javascript
- 网络技术
categories:
- 前端开发
---
Ajax跨域一直是个比较麻烦的问题，例如：断桥残雪在一个项目中使用了open打开一个跟父窗口不同域名的新页面，结果子窗口就不能传值给父窗口了；再如：我在www.2fool.cn下不可以获取love.2fool.cn域名下的页面内容。**浏览器的跨域**限制是为了安全，可是当我们想要在一个域名下请求另外一个域名的内容的时候就感觉不那么爽了。

我在[WordPress天气插件](http://js8.in/wordpress-weather "wordpress来访者天气预报插件")、[滔滔API接口](http://js8.in/441.html "使用滔滔给WordPress添加博主状态")处理上都使用了**JSONP**的方法来实现的跨域。而今天我要通过使用JS的[document.domain和iframe来解决Ajax跨子域的问题]( http://js8.in/443.html "用document.domain+iframe实现Ajax跨子域")。

### 原理

通过给主页面跟请求页面设置相同的document.domain来，欺骗浏览器，达到**Ajax跨子域**的效果，此方法在IE，chrome，Firefox，Safari，Opera下测试通过。

**缺点：**无法实现不同主域名之间的通讯。并且当在一个页面中还包含有其它的iframe时，会产生安全性异常，拒绝访问。
<!--more-->

### 使用document.domain+iframe跨域实例

首先我们假设主页面地址为：[http://js8.in/mywork/crossdomain/index.html](http://js8.in/mywork/crossdomain/index.html)，我们要加载的内容是位于work.2fool.cn域名下的helloworld.txt。我们需要在主页面中设置**document.domain**为2fool.cn，然后主页面添加一个iframe，src为域名work.2fool.cn下的一个url，在iframe页面中同样设置document.domain为2fool.cn，同时**iframe**中需要添加Ajax的函数，例如引入jQuery.js。

主页index.html的主要代码如下：

```html
<button onclick="crossDomain();">开始跨域</button>
<div id="ajax"></div>
<iframe src="http://work.2fool.cn/crossdomain/iframe.html" id="iframe" style="display:none;">
</iframe>
<script type="text/javascript">
document.domain = '2fool.cn';
function crossDomain(){
    var iframe=document.getElementById('iframe').contentWindow.$;        
    iframe.get("http://work.2fool.cn/crossdomain/helloworld.txt",function(data){
        document.getElementById("ajax").innerHTML=data;
    });
}
</script>
```
iframe页面主要代码如下：

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script type="text/javascript">
document.domain = '2fool.cn';
</script>
```

### 演示Demo

演示地址：[http://js8.in/mywork/crossdomain/index.html](http://js8.in/mywork/crossdomain/index.html "使用document.domain+iframe实现Ajax跨子域的演示地址")

演示下载：[http://js8.in/mywork/crossdomain/crossdomain.zip](http://js8.in/mywork/crossdomain/crossdomain.zip)
