title: "[转]利用跨域资源共享（CORS）实现ajax跨域调用"
id: 685
date: 2011-04-26 02:18:45
tags:
categories:
- 前端开发
---
前几天看了一篇E文说部署**CORS**的[文章](http://feedproxy.google.com/~r/remysharp/~3/b5_CQ7MoWNU/)，CORS是一中跨域的方式，于是上网找了下Nicholas C. Zakas 的文章《[Cross-domain Ajax with Cross-Origin Resource Sharing](http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/)》，并且找到了中文的翻译，感觉不错，转来分享之。

几年前，网站开发者都因为ajax的[同源策略](https://developer.mozilla.org/en/Same_origin_policy_for_JavaScript)而撞了南墙。当我们惊叹于XMLHttpRequest对象跨浏览器支持所带来的巨大进步时，我们很快发现没有一个方法可以使我们用**JavaScript实现请求跨域**访问，对此我们哀叹不已。每个人在他们自己的网站上建立代理（which was the onset of a new host of open redirect problems）来摆脱这种限制。虽然开发者利用服务器代理和其它技巧避开了这种限制，而在社区的抗议者允许ajax在本地跨域调用。许多人还没意识到当前几乎所有的浏览器（Internet Explorer 8+， Firefox 3.5+， Safari 4+和 Chrome）都可通过名为**Cross-Origin Resource Sharing**的协议支持ajax跨域调用。

### 跨域资源共享（CORS）

[Cross-Origin Resource Sharing](http://www.w3.org/TR/access-control/) (**CORS**)是W3c工作草案，它定义了在跨域访问资源时浏览器和服务器之间如何通信。CORS背后的基本思想是使用自定义的HTTP头部允许浏览器和服务器相互了解对方，从而决定请求或响应成功与否。

对一个简单的请求，没有自定义头部，要么使用GET，要么使用POST，它的主体是text/plain,请求用一个名叫Orgin的额外的头部发送。Origin头部包含请求页面的头部（协议，域名，端口），这样服务器可以很容易的决定它是否应该提供响应。

> Origin: http://www.nczonline.net

如果服务器确定请求被通过，它将发送一个Access-Control-Allow-Origin头部响应发送请求的同一个源，如果是一个公共资源，则返回“*”。如：

> Access-Control-Allow-Origin: http://www.nczonline.net
<!--more-->

如果头部丢失，或者源不匹配，那么浏览器将拒绝请求。如果一切顺利，浏览器将处理请求。注意，请求和响应都不包括cookie信息。

先前提到的所有浏览器都支持这些简单的请求。FF3.5 +，Safari 4和chrome通过使用XMLHttpRequest对象支持其使用。当尝试在不同域打开一个资源时，不需任何代码，这个行为会自动触发。如：


```javascript

var xhr = new XMLHttpRequest();
xhr.open("get", "http://www.nczonline.net/some_resource/", true);
xhr.onload = function(){  //instead of onreadystatechange
    //do something
};
xhr.send(null);
```

在IE8中也是一样，用同样的方式你需要使用[XDomainRequest object](http://msdn.microsoft.com/en-us/library/cc288060%28VS.85%29.aspx)。


```javascript

var xdr = new XDomainRequest();
xdr.open("get", "http://www.nczonline.net/some_resource/");
xdr.onload = function(){
    //do something
};
xdr.send();
```

Mozilla小组在他们关于[CORS的留言](http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/)中建议应该检查withCredentials属性的存在性，从而决定浏览器是否通过XHR支持CORS。你可以合并**XDomainRequest **对象的存在性来支持所有的浏览器：


```javascript

function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", "http://www.nczonline.net/");
if (request){
    request.onload = function(){
        //do something with request.responseText
    };
    request.send();
}
```

Firefox, Safari, 和Chrome的XMLHttpRequest对象与IE的XDomainRequest对象有着相似的充分的接口，这些模式运行的很好。常见的接口属性/方法:

*   abort()——用来终止已在进程中请求。
*   Onerror()——替代onreadystatechange方法来探测错误。
*   Onload()——替代onreadystatechange方法来探测成功。
*   responseText——用来取得响应地文本。
*   send()——用来发送请求。

### Preflighted请求

除了GET或POST，通过一种称之为**preflighted**请求的服务器透明验证机制，CORS允许使用自定义的头部和方法，以及不同主体内容类型。当你尝试使用高级选项中的一个来试着建立一个请求时，这时就建立了一个preflighted请求。该请求使用可选的方法，并发送如下头部：

*   Origin——与简单请求相同。
*   Access-Control-Request-Method——请求将要使用的方法。
*   Access-Control-Request-Headers——（可选）一个逗号分开的正被使用的自定义头部列表。

例子假定一个头部自定义为NCZ的POST请求：

> Origin: http://www.nczonline.net
> Access-Control-Request-Method: POST
> Access-Control-Request-Headers: NCZ

在请求期间，服务器能决定是否允许这类请求。服务器通过在响应中发送以下头部来与浏览器通信。

*   Access-Control-Allow-Origin——与简单请求相同。
*   Access-Control-Allow-Methods——用逗号分开的可接受的方法列表。
*   Access-Control-Allow-Headers——用逗号分开的服务器可接受的头部列表。
*   Access-Control-Max-Age——preflighted 请求应该被缓存的时间。

如：

> Access-Control-Allow-Origin: http://www.nczonline.net
> Access-Control-Allow-Methods: POST, GET
> Access-Control-Allow-Headers: NCZ
> Access-Control-Max-Age: 1728000

preflighted 请求一旦作出，结果将按响应中规定的时间缓存下来；第一次做出这样的请求，你将引发一次额外的HTTP请求。

Firefox 3.5+, Safari 4+和Chrome都支持preflighted 请求，IE8则不支持。

### Credentialed请求

默认状态下，跨域请求不提供证书（cookie、HTTP身份验证、客户端SSL证书）。你可以规定一个请求应该通过设置withCredentials属性为true来发送证书。如果服务器允许credentialed请求，那么它将用下面的头部作出响应：

如果一个**credentialed**请求被发送，这个头部不会作为响应地一部分被发送。浏览器不会将响应传递给JavaScript(responseText是一个空字符串，状态为0，onerror()被调用)。注意，服务器也能发送这个HTTP头部作为preflight响应的一部分，以此来表明该源允许发送credentialed请求。
> Access-Control-Allow-Credentials: true

<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; text-indent: 2em; padding: 0px;">IE8不支持withCredentials属性，Firefox 3.5+, Safari 4+和Chrome都支持它。

**结论**

在现代web浏览器中对跨域AJAX调用有许多可靠地支持，然而，大多数开发者仍没意识这些强大的功能力。只需在JavaScript和服务器端做一点额外的工作以保证正确的头部被发送即可使用它。在允许高级请求和credentialed请求方面，IE8的执行有些滞后，但希望它对CORS的支持将会继续改进。如果你想了解更多，我强烈建议你检查[Arun Ranganathan的示例页](http://arunranga.com/examples/access-control/)。

### 相关阅读

*   [Cross-domain XHR removed from Firefox 3](http://www.nczonline.net/blog/2008/04/27/cross-domain-xhr-removed-from-firefox-3/ "Cross-domain XHR removed from Firefox 3")
*   [Firefox 3.5/Firebug XMLHttpRequest and readystatechange bug](http://www.nczonline.net/blog/2009/07/09/firefox-35firebug-xmlhttprequest-and-readystatechange-bug/ "Firefox 3.5/Firebug XMLHttpRequest and readystatechange bug")
*   [Mentioned in Microsoft whitepaper](http://www.nczonline.net/blog/2008/07/05/mentioned-in-microsoft-whitepaper/ "Mentioned in Microsoft whitepaper")
*   [XMLHttp Requests For Ajax](http://www.nczonline.net/blog/2006/03/14/xmlhttp-requests-for-ajax/ "XMLHttp Requests For Ajax")
*   [Firebug](http://www.nczonline.net/blog/2006/03/05/firebug/ "Firebug")
*   [Web definitions: DOM, Ajax, and more](http://www.nczonline.net/blog/2009/09/29/web-definitions-dom-ajax-and-more/ "Web definitions: DOM, Ajax, and more")

**原文地址：**http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/
**转载地址：** http://www.denisdeng.com/?p=1024