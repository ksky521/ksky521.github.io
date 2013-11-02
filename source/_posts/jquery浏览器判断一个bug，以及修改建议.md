title: "jQuery浏览器判断一个bug，以及修改建议"
id: 337
date: 2009-11-18 21:48:48
tags:
- 网络技术
categories:
- 乱七八糟
---
前几天在使用**jQuery**（1.3.2）的时候，想使用下浏览器判断$.browser，可是我在使用$.browser.safari的时候，发现一个问题：
就是chrome浏览器也走**$.browser.safari**的判断，查看了jQuery的源代码：

```javascript
var userAgent = navigator.userAgent.toLowerCase();
jQuery.browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
	safari: /webkit/.test( userAgent ),
	opera: /opera/.test( userAgent ),
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};```<!--more-->
经过同事**修改**后的代码是：
```javascript
var browserName = navigator.userAgent.toLowerCase();
mybrowser = {
	version: (browserName.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
	safari: /webkit/i.test(browserName) && !this.chrome,
	opera: /opera/i.test(browserName),
        firefox:/firefox/i.test(browserName),
	msie: /msie/i.test(browserName) && !/opera/.test(browserName),
	mozilla: /mozilla/i.test(browserName) && !/(compatible|webkit)/.test(browserName) && !this.chrome,
        chrome: /chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)
}
```
完全可以使用，并且防止了safari跟**chrome**混淆的