title: "【PPT分享】XSS注入和防范"
id: 951
date: 2012-02-06 01:53:29
tags:
- PPT
- xss
categories:
- 前端开发
---

这是我前些日子准备的关于《[XSS注入和防范](http://qdemo.sinaapp.com/ppt/xss/)》的技术分享ppt，现在放出来，之前是做的powderpoint文件，后来网上流传[impress.js](http://bartaz.github.com/impress.js)做ppt，于是自己也整了个impress.js版本的放在了SAE上面，经过测试发现当ppt的内容较多，带有图片等，**impress.js**效果就会比较卡。不多说其他的，说说ppt的内容：

《XSS注入和防范》主要从xss是什么，xss的危害，xss的类型及其防范的措施，几个方面来讲解xss。希望对大家理解xss有所帮助，另外多说句cookie的httponly方式，在apache下面有个漏洞，当cookie超过4k的时候就会出现泄漏，所以要注意这个漏洞！（具体代码：[狂点此处](https://gist.github.com/1955a1c28324d4724b7b/7fe51f2a66c1d4a40a736540b3ad3fde02b7fb08)）

废话不多说了，上ppt地址：[【PPT分享】XSS注入和防范](http://qdemo.sinaapp.com/ppt/xss)，请使用支持chrome浏览器查看ppt页面
[![XSS注入和防范](/uploads/2012/02/02-06_152043.png "XSS注入和防范")](/uploads/2012/02/02-06_152043.png)

<!--more-->

**xss**是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。
