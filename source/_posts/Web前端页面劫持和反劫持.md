title: "Web前端页面劫持和反劫持"
date: 2017-08-04 09:59:26
tags:
- 劫持
- 安全
categories:
- 前端开发
---


> 前几天看到一篇写js文件反劫持的文章，想起15年主导做百度搜索结果页面反劫持项目做得一些研究，整理成文章，跟大家分享。

## 常见劫持手段
按照劫持的方法不同，我将劫持分为下面两类：

* 跳转型劫持：用户输入地址A，但是跳转到地址B
* 注入型劫持：有别于跳转型型劫持，指通过在正常的网页中注入广告代码（js、iframe等），实现页面弹窗提醒或者底部广告等，又分为下面三个小类：
    * 注入js类劫持：在正常页面注入劫持的js代码实现的劫持
    * iframe类劫持：将正常页面嵌入iframe或者页面增加iframe页面
    * 篡改页面类劫持：正常页面出现多余的劫持网页标签，导致页面整体大小发生变化

### 跳转型劫持
为了获取流量，一些电商或者类似百度这样需要流量合作的网站都会有自己的联盟系统，通过给予一些奖励来获取导流，比如：百度或者电商会有渠道分成。

为了区分哪些是第三方给予导流过来的，通常会在url地址增加类似source、from之类的参数，或者进入页面之前通过「中间页」种cookie。

这样，当用户输入一个正常网址的时候，劫持方会在网络层让其跳转到带分成或者渠道号的「中间页」或者带渠道号的页面。这样用户进行下单或者搜索等行为，劫持方会得到「佣金」。

上面说的这类case还算友好，至少用户一般体验不到页面变化，还有类似跳转到**钓鱼网站的case**，也有不正当竞争的case：**用户输入baidu.com跳转到so.com或者sm.cn，而对方网站有故意做成和百度搜索差不多的样子**，那时候也帮助法务做了很多案例收集。

**题外话**：前些年，用户使用百度搜索某些医疗类query，立即用户就会收到电话推广医院，很多用户投诉，不明真相的群众也指责百度，实际这类是运营商把url的关键词卖给了医疗机构，百度只不过是躺枪。。。那时候还做了个项目是加密query。。。

### 注入型劫持
页面在传输的过程中，被网络层进行内容「再加工」，常见有：注入js、iframe、篡改页面。

#### 注入js
注入js的方式可以通过`document.write`或者直接改html代码片段等方式，给页面增加外链js，为了做到更难检测，有些运营商会捏造一个不存在的url地址，从而不被过滤或者检测。

**案例1**：运营商会用自己识别的ip或者域名做js网址，wap.zjtoolbar.10086.cn这类只有在浙江移动网络下才会被解析出来，同理ip也是

**案例2**：运营商很聪明，知道页面可以检测所有外链js的域名，比如：m.baidu.com我只允许m.baidu.com/static的外链js，其他js都会被记录反馈；为了不被检测出来，我遇见个case电信会访问一个不存在的地址，比如：m.baidu.com/static/abc.js，这个地址在运营商直接返回劫持的js代码，请求不会发到百度的服务器。

#### 被放入iframe或者iframe其他页面
这类case比较少见，但是一些擦边球的网站或者没有内容的垃圾站会用这种方式，他们一般是通过热门关键词之类做SEO，打开网站实际去了广告之类没有任何实际内容，而页面却是内嵌了一个其他网站，我们要是识别出来不被内嵌就需要检测。

#### 篡改页面内容
这类case很少见，一般是在页面底部增加js之外的div，然后展现一些非网站内容。

## 劫持检测方法
讲了常见的劫持手段有哪些，我们再来看看怎么识别上面提到的这些劫持。
￼
上图是15年8月11日这天百度某页面的劫持情况，那天数据还算不错，之前浙江移动网络劫持率高达40%+，多数劫持来自`zjtoolbar.10086.cn`这个域名，就是移动的流量提示（还专门启用个域名zjtoolbar，浙江toolbar）。。。

![](/img/posts/hijack.png)

<!--more-->
### 跳转型劫持
跳转型劫持如果用单纯靠Web页面进行检测比较困难，当时我们做检测是在手机百度（手百）内做检测，所以比较简单，用户输入搜索词（query），打开百度的页面URL，然后当页面加载结束，APP对比访问的URL是否是之前要访问的URL，如果URL不一致，则记录上报。

### 注入js类页面
1. 改写`document.write`方法
2. 遍历页面`script`标签，给外链js增加白名单，不在白名单内js外链都上报

### 检测是否被iframe嵌套
这个通过比较`parent`对象，如果页面被嵌套，则`parent!==window`，要获取我们页面的URL地址，可以使用下面的代码：
```js
function getParentUrl() {
        var url;
        if (parent !== window) {
            try {
                url = parent.location.href;
            } catch (e) {
                url = document.referrer;
            }
        }
        return url;
    }

```
### 特殊方法
前面提到类似电信捏造在白名单内的js URL和篡改页面内容的，我们用上面提到的方法检测不到这些信息，如果是在APP内，可以做的事情就比较多了，除了上面之外，还可以比较页面的`content-length`。当时手百的做法是：

> 在用户开始输入query的时候，APP访问一个空白页面，页面内只有html、title、head、body、script，而script标签内主要代码就是嗅探是否被劫持。
> 因为一般劫持不会针对某个页面，而是针对整个网站域名，所以我们的空白页面也会被劫持。
> 一旦被劫持，那么这么简单的页面结构就很容易做页面劫持分析，分析出来劫持手段就上报case

script内核心代码如下：

```js

function hiJackSniffer() {
    var files = $.toArray(D.querySelectorAll('script[src]'));
    var arr = [];
    for (var i = 0, len = files.length; i < len; i++) {
        files[i].src && arr.push(files[i].src);
    }
    if (arr.length) {
        return sendImg(arr, 1);
    }
    arr = getParentUrl();
    if (arr && arr.length) {
        //被嵌入iframe
        return sendImg([arr], 2);
    }
    if (D.documentElement.outerHTML.length > 4e3) {
        var tmp = {};
        var headjs = $.toArray(D.head.querySelectorAll('script'));
        var unknownCode = [];
        if (headjs.length) {
            unknownCode = unknownCode.concat(headjs.map(function(v) {
                return v.innerHTML;
            }).filter(function(v) {
                return !!v;
            }));
        }
        var body = $.toArray(D.body.querySelectorAll('*'));

        if (body.length > 1) {
            unknownCode = unknownCode.concat(body.map(function(v) {
                return v.outerHTML.split('\n').join('');
            }).filter(function(str) {
                if (/^<script id="b">/.test(str)) {
                    return false;
                }
                return true;
            }));
        }
        return sendImg(unknownCode, 3);
    }
    sendImg([], 0);
}

```

这样做除了可以检测到多余的js外链，还可以检测出来篡改页面内容等case。除了检测域名劫持之外，在用户输入query的时刻访问空白的页面也可以提前完成DNS解析，另外还可以做劫持防御，所谓「一石三鸟」！

## 劫持防御
最简单粗暴的就是直接上`HTTPS`，一劳永逸。再就是取证，去打官司或者警告渠道作弊者。除此之外，我们还可以继续利用空白页面做劫持检测。

手百在没有全量https时期（毕竟全站https牵扯的工作量不小），利用空白页面嗅探出当前网络环境存在劫持风险的时候，那么就通过调用客户端的接口，告诉客户端本次启动期间使用`https`，这样既可以降低劫持风险，又可以通过这个页面小流量测试https数据，将来https全量后，还可以通过空白页面将老版本的APP全量打开https。
