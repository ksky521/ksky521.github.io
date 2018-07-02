title: "Hybrid APP开发：JSSDK"
date: 2017-05-26 19:28:35
tags:
- hybrid
- javascript
- 架构
categories:
- 前端开发
---

> 拖稿了好久的「Hybrid APP开发系列」又更新了~ 
> 今天继续写JSSDK

## 为什么会有JSSDK
我之前文章介绍了通过 JSBridge 实现页面和NA的相互调用，并且介绍了模板本地包的开发和后台维护系统。今天介绍的是JSSDK，通过 JSSDK 可以实现：

1. 抹平JSBridge的平台实现差异
2. 对齐端能力，内部消化版本差异
3. sdk封装后的代码更加符合前端习惯
4. 权限控制、鉴权、对外开放，实现生态建设

> 关于sdk的代码级别的设计，可以参考文章：《JSSDK设计指南》

如果做过微信页面开发的，应该都知道`wx.js`，这就是微信的JSSDK，在微信内需要调用微信的端能力就需要引入这个js。

## JSSDK的设计
JSSDK的设计包括两部分：

1. 随着每个NA客户端版本内置的js，称为：`inject.js`，他的主要作用是封装JSBridge逻辑，通过随版更新实现减少端能力的版本分裂，降低整个sdk的代码复杂性。`inject.js`是一段js代码，当客户端加载一个页面的时候，由客户端在适当的时机注入到webview内执行，执行后的代码就会有给webview增加js方法，例如微信的`_WeixinJSBridge`，类比chrome开发插件当中的`content_scripts`，可以在`document_start` 、`document_end`等时机进行执行。
2. 云端JS，即实际暴漏给开发者使用的js，称为：`jssdk.js`，这个是真正开发者使用的sdk文件，通过`script`外链引入，例如`wx.js`，这个js文件通过和`inject.js`进行交换，完成端能力的调用、鉴权和客户端事件监听等操作

![](/uploads/2017/04/12.png)

<!--more-->
￼
### inject.js 和 jssdk.js工作机制
￼
![](/uploads/2017/04/13.jpg)

`inject.js`是客户端和`jssdk`的「翻译官」，他接受页面`jssdk`的方法调用，将调用的命令解析成客户端可以理解的「语言」（JSBridge）然后传给客户端，同时当客户端有事件/回调响应的时候，也通过`inject.js`进行分发/回调。

## 举例：NA分享能力

例如，客户端实现了一个分享面板的UI组件，开放给web页面可以调用，这时候需要调用NA的端能力，JS需要将分享的：icon_url、title、content、link、type甚至订制的NA面板信息等传给NA，NA开始弹出这个面板，用户进入NA层进行交互；

当用户分享成功、失败、取消等事件发生的时候，需要回调JS代码，用户由回到了web页面，NA回调了JS callback，JS实现后续的逻辑。

![](/uploads/2017/04/14.jpg)
￼

jsbridge为：`demoapp://share/dialog?title=三水清&link=http://js8.in&icon_url=xxx&content=我发现一个很有用的前端公众号`

`inject.js`代码封装如下：

```js
;(function (window, document) {
  
  function invoke (module, action, args, callback) {
    let scheme = `demoapp://${module}/${action}?`
    if (isFunction(args)) {
      callback = args
      args = null
    }
    // 处理下参数
    if (isString(args)) {
      scheme += args
    } else if (isObject(args)) {
      each(args, (k, v) => {
        if (isObject(v) || isArray(v)) {
          v = JSON.stringify(v)
        }
        scheme += `${k}=${v}`
      })
    }
    // callback独立传，方便全局函数名命名
    if (isFunction(callback)) {
      var funcName = '_jsbridge_cb_' + getId()
      window[funcName] = function () {
        callback.apply(window, ([]).slice.call(arguments, 0))
      }
      scheme += (!~scheme.indexOf('?') ? '&' : '?') + `callback=${funcName}`
    }

    if (os.ios && versionCompare(os.version, '9.0') >= 0) {
      window.location.href = scheme
    } else {
      var $node = document.createElement('iframe')
      $node.style.display = 'none'
      $node.src = scheme
      var body = document.body || document.getElementsByTagName('body')[0]
      body.appendChild($node)
      setTimeout(function () {
        body.removeChild($node)
        $node = null
      }, 10)
    }
  }
  var $ = {
    share: function (opts, callback) {
      var defaultOpts = {
        url: location.href,
        title: '三水清',
        content: '最好的前端公众号',
        icon_url: 'http://baidu.com/icon.png'
      }
      opts = Object.assign(defaultOpts, opts)
      invoke('share', 'dialog', opts, callback)
    }
  }
  window._InjectJS_ = $
}(window, document))

```
`jssdk.in`代码示例：
```js
window.jssdk = {
    share: _InjectJS_.share
}
```

页面调用：
```js
jssdk.share({url: 'http://js8.in'}, (err, data) => {
  if (!err) {
    if (data.errno === 1) {
      alert('失败')
    }else if (data.errno === 2) {
      alert('取消')
    }else {
      alert(data.media) // 分享的平台id，比如webxin_timeline
    }
  }
})
```

这样`jssdk`调用`inject.js`写法，看似多此一举，实则很巧妙，试想一下下面的场景：
1. 客户端某个版本分享能力升级，需要做兼容
2. 某版本分享能力有bug，会引起crash，不能在此版本调用
3. 分享成功之后的回调需要做鉴权，防止恶意刷分享行为
4. JSBridge有scheme调起换成jsinterface的调起（参考本系列JSBridge文章）

如果这些代码都写在`jssdk.js`，那么随着版本的积累，代码会越来越臃肿，并且所有版本的端能力都集中在`jssdk.js`，很不利于管理，历史的包袱也甩不掉。

## inject.js的注入时机
因为`inject.js`的设计机制，所以我们希望`inject.js`能够越早注入越好，这样我们在页面head使用`jssdk.js` 就不会找不到对象了！


我们知道安卓WebView中可以通过`webview.loadUrl("javascript:xxx”)`的方式来调用js里面的代码，那么，我们也可以利用`webview.loadUrl("javascript:xxx”);`的方式来加载注入一段 js 代码 。

安卓WebView 需要通过`webView.setWebViewClient(new MyWebClient());`的方式来监听网页加载的各个周期方法回调，那么我们只需要在`onPageFinished(WebView view, String url)` 中注入提前设置好的js 即可

在iOS中也有对应的时间点：`webViewDidFinishLoad`和`didCreateJavaScriptContext`


我们能够找到的注入时机有限，为了保证jssdk代码在调用的时候，已经注入成功`inject.js`，我们只能实现类似`DOMContentLoaded`这样的`ready`方法回调，使用jssdk的时候，全部写在`jssdk.ready()`内（类似`$(document).ready`），当页面`inject.js`注入成功则抛出`ready`事件，然后积累的事件栈依次出栈执行。

## 总结
本文介绍了hybrid开发中为webview实现一个jssdk，介绍了`inject.js`的注入时机，`inject.js`除了端能力的调用，还可以和客户端实现授权（如：微信的接入授权需要申请appid和token），同时还可以针对所有的调起指令和回调进行安全校验，屏蔽非法的调用和回调，本文只实现了最简单的调用，这些高级的设计后面文章有机会再介绍，今天敲完收工搬家过节 😆