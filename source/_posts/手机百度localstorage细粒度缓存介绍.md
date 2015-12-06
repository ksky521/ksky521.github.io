title: 手机百度localstorage细粒度缓存介绍
date: 2015-12-06 10:31:39
tags:
- 移动前端
- 性能优化
- webapp
categories:
- 前端开发
---
## 写在前面
拖了一年多的文章，终于开始慢慢补上了。。。上周末整理了下hexo的模板，本周末写了2015年的第一篇文章。

从14年开始，手机百度就开始支持localstorage的细粒度缓存，配合inline渲染模式使用，在2G慢速网站将页面的js和css嵌入到script和style标签，然后将源码存到localstorage，第二次访问的时候从localstorage读取，提高页面访问速度。

## 细粒度localstorage方案
传统的localstorage缓存，流程图如下：
![传统的localstorage缓存](/img/posts/ls-1.png)

最大的缺点是：*需要页面渲染之后，读取localstorage缓存内容，然后二次拉取没有缓存或需要更新的资源*。

<!--more-->

还有一个方案，就是利用cookie保存一个版本号信息，server端拿到cookie就可以判断出来需要下发和更新的资源。这个方案虽然可以避免二次拉取，但是毕竟cookie的存储量有限，cookie太大就影响http上行请求速度。所以之前百度移动搜索结果页的方法就是整个页面存储一个md5的版本号，如果有一个资源更新，那么就需要整个页面的资源代码重新下发，所以往往每周上线的时候会引起页面性能数据抖动。

所以结合上面的两种方式，手百这边做的是如下的方案：
![手百细粒度方案](/img/posts/ls-2.png)

## 第一步：代码按照更新频度进行分组
上面提到的cookie方案最大的问题就是：业务代码和通用代码都“一视同仁”，这样经常频繁变化的业务代码只要发生变化，通用代码也需要更新，所以每周固定上线时间就会全部重新下发一遍代码。

为了解决这个方案的缺点，首先将需要缓存的代码进行分层：*通用* 和 *业务*。通过区分通用和业务代码，每段代码都有自己的独立版本号，业务层代码的修改就不会引起通用代码的更新，只会更新自己的版本号，下发自己的新版本。

## 第二步：利用cookie的多维度
大家都知道cookie是可以按照域名来缓存的，二级子域名可以读取主域名的cookie，这个我们称之为：*cookie的doman维度*。

cookie除了域名之外，还有一个容易被忽略的维度，就是不同的 `path` cookie也可以不同，下一级`path`是可以读取上一级`path`的cookie。这个是cookie的第二个维度：*cookie的path维度*

下面例子是同一个cookie `po_lsv`在不同domain和path的情况。

|*key*|*value*|*domain*|*path*|
|-----|-------|--------|-------|
|po_lsv| jZ-1_jA-1_cF-1_cM-1_jB-2|po.m.baidu.com|/tiny|
|po_lsv| jZ-1_jA-1_cF-1_cM-1_jB-1|po.m.baidu.com|/|
|po_lsv| jZ-1_jA-1_cF-1|m.baidu.com|/|

## 保证cookie保存足够多的信息
之前使用md5，cookie value的长度是32个长度，如果利用value足够短的长度保存足够多的cookie信息。我们的方法是使用如下约定：

1. css和js分别使用c和j来打头
2. localstorage的key和版本号使用`-`间隔，而每个版本之间使用`_`，保证cookie在encode的时候不被编码成`%xx`保证长度
3. 真实localstorage的值，使用尽量一个字母简写
4. 而版本号使用的是36进制，如果每周上线一次计算，加上cookie有效期，36进制保证版本号是一位已经足够了，不用考虑版本号重叠问题

## 自动打包工具
维护版本号是很麻烦的一个工作，如果一不留神漏了哪个，就会导致重大bug，比如页面一直reload等，所以我们使用了打包工具来完成这个过程，避免了人工的错误。

打包过程如下：
![localstorage.json](/img/posts/ls-3.png)

`localstorage.json`的格式内容如下：

```json
{
    "jA": {
        "hash": "2c79d70",
        "files": [
            "common:widget/localstorage/zepto-ajax.tpl"
        ],
        "version": 1
    },
    "jZ": {
        "hash": "5358395",
        "files": [
            "common:widget/localstorage/zepto.tpl"
        ],
        "version": 1
    }
}
```

需要缓存到localstorage的文件都统一放在localstorage文件夹，再看下需要缓存的widget经过打包工具自动生成的代码：

```html
<script data-lsid="jZ">
    __inline('/static/js/zepto.js');
</script>
```

经过打包工具release之后，变成下面的smarty模板：

```html
{%if ($_ls_nonsupport) || ($_parsedLSCookies.jZ.isUpdate )%}
    <script data-lsv="{%$_parsedLSCookies.jZ.version|escape:html%}"  data-lsid="jZ">
    var Zepto=xxx
    </script>
{%else%}
    <script>LS.exec("jZ","js");</script>
{%/if%}
```

代码执行时候，解析cookie，然后读取localstroage.json的内容，跟cookie的版本号对比，生成模板变量，赋值给模板文件。
