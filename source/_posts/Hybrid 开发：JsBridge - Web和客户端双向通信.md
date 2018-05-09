title: "Hybrid 开发：JsBridge - Web和客户端双向通信"
date: 2017-03-16 10:38:35
tags:
- hybrid
- javascript
- 架构
categories:
- 前端开发
---

> Hybrid开发中，web页面往往会跟native进行交互，而JSBridge就是web页面和native进行通信的桥梁，通过JSBridge可以实现web调用native的方法，native可以通过`webview.loadUrl`之类的方法，将`javascript:xxx`代码放在页面执行，这有点类似在浏览器地址栏直接输入：`javascript:xxx`

本文较长，先把目录列出来：

* JSBridge多种形式
    * js Interface 直接注入到window对象
    * 改写浏览器原有对象：alert/console/prompt
    * URL scheme
* 唤起APP技术
    * intent
    * localserver
    * scheme：deeplink/applink/Universal link
    * smart app banner
* JSBridge安全
* JSBridge的最佳实践
    * 协议规范
    * 回调函数
    * 预留升级/统计能力
    * 简单JSBridge调用封装

## JSBridge多种形式
web和native进行通信，方法有很多，接下来一一列举一下JSBridge的多种形式，及其利弊。

### JavaScriptInterface
JSInterface是安卓4.2-官方推荐的解决方案，原理是通过WebView提供的`addJavascriptInterface`方法给浏览器`window`注入一个命名空间，然后给Web增加一些可以操作Java的反射。

```java
// Android java代码
mWebView.addJavascriptInterface(new Class(), 'android');  

public class Class(){
  @JavascriptInterface
  public void method(){

  }
} 
// js 代码
window.android.method();
```

JSInterface在4.2之前的版本都可以，但是存在严重的安全隐患，容易被利用提权，从而调用各种Java的类和权限，甚至页面可以挂马。在我们实际产品（手机百度）开始阶段，用过这个方法，不过现在已经不使用了。

<!---more--->
### 改写浏览器原有对象
这个方法主要是通过修改原来浏览器的`window`某些方法，然后拦截固定规则的参数，然后分发给Java对应的方法去处理。这里常用的是以下四个方法：

* alert，可以被webview的`onJsAlert`监听
* confirm，可以被webview的`onJsConfirm`监听
* console.log，可以被webview的`onConsoleMessage`监听
* prompt，可以被webview的`onJsPrompt`监听

prompt简单举例说明，Web页面通过调用`prompt()`方法，安卓客户端通过监听`onJsPrompt`事件，拦截传入的参数，如果参数符合一定协议规范，那么就解析参数，扔给后续的Java去处理。这种协议规范，最好是跟iOS的协议规范一样，这样跨端调起协议是一致的，但具体实现不一样而已。比如：`hybrid://action?arg1=1` 这样的协议，而其他格式的`prompt`参数，是不会监听的，即除了`hybrid://action?arg1=1` 这样的规范协议，`prompt`还是原来的`prompt`。

这四个方法也是各有利弊，比如：

* `alert`/`console.log`是调试最常用的，如果你要看看协议是不是写错了，但是传入协议却被拦截了。。
* `confirm`和`prompt`都带返回值，`prompt`是四个里面唯一可以自定义返回值，可以做同步的交互，要比写各种回调更「顺」，但是一旦串行调用了，就要骂爹了

`prompt`是我们目前安卓用的比较多的JSBridge解决方案。

### URL scheme
这个叫法不是特别贴切，scheme是URI的一种格式，上文提到的`hybrid://action?arg1=1` 就是一个scheme协议，这里说的scheme（或者schema）泛指安卓和iOS的schema协议，因为它通用。

安卓和iOS都可以通过拦截跳页URL请求，然后解析这个scheme协议，符合约定规则的就扔个Native的方法处理。安卓和iOS分别用到拦截URL请求的方法是：

* 安卓：shouldOverrideUrlLoading方法
* iOS：UIWebView的delegate函数

## 唤起APP技术
上文介绍到的JSBridge是在APP内的Web页面跟APP进行交换，还有一种特别多的需求，就是在APP外（浏览器、微信等）调起APP自己，给APP进行导流。这时候就要用到APP的唤起技术。这里有一下几种方法：

* intent：安卓
* localserver：安卓
* Universal links：iOS 9+
* Deep link/Applink：安卓
* smart app banner：iOS

### 安卓intent
intent格式示例如下：

```txt
intent:
   HOST/URI-path // Optional host 
   #Intent; 
      package=[string]; 
      action=[string]; 
      category=[string]; 
      component=[string]; 
      scheme=[string]; 
      S.xxx=xxx
   end;
```
* 第一部分：host和path是跟url无异
* 第二部分：#intent到end是完整的intent，包含了调起的app包名，action等是常用的配置项

因为Intent不仅仅是调起APP，而是安卓客户端内部模块通信也会用，所以权限很大，一般浏览器都给封掉了，💔
### 安卓localserver
这是一个黑科技😈，早前安卓允许在本地启动一个本地server，这个server是在后台守候的，通过这个localserver都可以进行各种需求：app间通信、app调起、收集数据、基础服务。百度的moplus就是这样的一个localserver。

举例说明：启动一个本地server，端口号是：`8888`，那么在手机上，网页就可以通过：`http://127.0.0.1:8888` 访问这个server，server接收到请求就可以进行一些native的操作，对于需要回调数据的，就通过返回请求内容来执行，比如：

1. 获取个定位信息，js执行`$.get('http://127.0.0.1:8888/getGeoLocation?callback=cbname')`
2. server收到请求之后，调用native方法，获取GPS的定位信息，然后将数据通过response：`window.cbname&&cbname({xxx})`给页面返回定位数据

如果控制不好权限，因为localserver是一直后台守候的，容易被利用，比如提权获取通讯录、甚至给通讯录发短信、容易造成蠕虫攻击，感兴趣的可以搜下moplus的文章。另外安卓各种安全软件，都会清理内存和后台程序，很容易被干掉进程。浏览器也会封杀本地server调起，碰见127.0.0.1的请求就直接拦截。

### Universal links / Deep link / Applink
这三个是官方推荐的调起方法，调起协议格式也是可以统一的，比如前文提到的`hybrid://action?arg1=xxx`这类scheme协议就是。这样可以统一安卓和iOS调起和JSBridge通信。

其实简单来说，这三个出发点是想给应用做分发，但是如果用户手机没有安装这个APP，那么就调起失败，这时候直接不管不问，肯定体验不好，而且浪费了点击资源，那么做成分发吧！将调起协议做成一个调起页面，放到一个域名下，点击这个URL就可以打开这个页面，页面执行代码调起APP，如果调起失败就展现APP的介绍，做分发。

Universal links / Deep link / Applink，就是这样的一个过程，通过这个域名授权，把URL分发给APP进行处理，唯一不同的是：如果用户安装了APP，那么就不用打开这个分发页面了。

### Universal Links
iOS 9新出的一个功能，需要在App内声明一个https域名（ul.test.com），然后在该网站根目录放置apple-app-site-association文件，文件指明了转发规则，例如：

```
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": “xxx.com.baidu.SomeApp”,
        "paths": ["*"]
      }
    ]
  }
}
```

当APP安装成功之后，会下载这个文件，明确知道遇见`ul.test.com`的域名的URL时候，会把这个URL扔给你的APP，让你去解析，APP拿到这个URL就可以解析出来需要做什么事情。

Universal Link是iOS 9+的底层实现，所以在任何地方都可以直接调起APP，不受微信这类封闭APP的限制。

### Deep link / Applink
Deep link 是安卓一开始推出的，主要用于搜索调起APP，后来推出 Applink，实际是Deep link的升级版。

这里需要提到微信的APPlink，毕竟微信作为SuperApp，是很大的分发资源，微信有自己的分发方法，安卓内可以申请微信的APPlink，跟Universal link一样，也是一个域名下面的URL，符合一定规则就由微信（ios是底层系统）扔个对应的域名APP进行解析。

#### smart app banner
在页面的head中添加下面meta，在Safari浏览器中就会出现下面的banner

```html
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
```

![](http://upload-images.jianshu.io/upload_images/263551-4f807d9fa671a5f7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)

## JSBridge安全
在APP内JSBridge可以实现Web和Native的通信，但是如果APP打开一个恶意的页面，页面可以任意调用JSBridge方法，获取各种隐私的数据，就会引起安全问题。

JSBridge的安全有两个方法：通过Native进行白名单配置，通过Server云端授权。Server的云端授权这块，放到后续JSSDK的设计部分进行详细讲解。本文主要说下通过Native的方式来控制JSBridge的安全。

假设JSBridge的协议格式如下：

```
hybrid://action/method?arg1=xxx&arg2=xxx
```
可以通过下面方式进行安全设置：

1. 配置某些方法的使用范围，比如固定的Webview，固定的domain
2. 通过正则来设置细化的权限，比如：baidu.com网页可以使用`*`，hao123.com可以使用：`hybrid://hao123/*`

## JSBridge的最佳实践
介绍了这么多，什么是最佳实践的JSBridge呢？结合文章内容，要求JSBridge做到以下几点：

* 官方认可，不走「歪门邪道」
* 跨平台通用
* APP内和APP外规范通用
* 安全可靠
* 约定大于配置的原则

综合上文介绍的内容，JSBridge的最佳实践是：

1. 协议规范都使用：`hybrid://action/method?arg1=xxx&arg2=xxx`
2. iOS使用Universal Link和UIWebview的delegate
3. 安卓使用shouldOverrideUrlLoading和Applink

### 规范和约定
先贴个URL scheme的图片，理解下URL的组成部分：

![](http://img.my.csdn.net/uploads/201203/3/16423_13307557171Ru7.png)

约定我们的规范如下：
```
yourappscheme://module/action?arg1=x&arg2=x&ios_version=xxx&andr_version=xxx&upgrade=1/0&callback=xxx&sendlog=1/0
```

* 整体小写
* yourappscheme：就是你的scheme，可辨识，别冲突，通过这个可以进行Universal Link和Applink的分发
* module和action：某个模块组件的某个方法
* `?`后面是querystring，这里预定了几个特殊的参数：
    * `ios_version/andr_version`：非必须，iOS和安卓的最小版本，即本协议从哪个版本开始支持的，低版本不支持则忽略，配合upgrade使用进行APP升级
    * upgrade：是否强制升级，即当版本低于设置的ios/andr_version是否弹出提示用户升级的对话框（yourappscheme已经可以调起app，只不过功能可能因为版本低不支持，这时候可以引导用户升级）
    * callback：异步回调函数，下面详细树下callback的最佳实践
    * sendlog：调起后是否打点发送日志

举例：
```
# 账号相关
## 打开用户个人主页
fb://account/userprofile?id=xxx
## 打开登录界面
fb://account/login?callback=xxx
# 工具类
## 获取定位
fb://utils/getgeolocation?callback=xx
```
#### callback的设计
当native操作成功之后，会将处理结束后的结果或者数据通过`callback`回调传给Web，当然有成果就又失败，`callback`的参数设计有两种方式：

##### 错误优先
即下面的回调方法格式：

```js
function callback(error, data){
  if(error){
    throw error
  }
  console.log(data)
}
```

##### JSON API式
即回调方法只接收一个JSON对象，JSON格式如下：
```js
{
  error_code: 0,
  data: {}
}
```

#### 预留升级/日志能力
做APP开发经常会遇见下面的问题：

1. 功能/端能力是从某个版本开始的，低版本用不了，但是scheme还是会调起APP（APP懵逼。。
2. 对于低版本，PM希望提示用户升级
3. 统计调起成功率，分发次数之类的统计需求

scheme的querystring部分由 `ios_version/andr_version`和upgrade这三个成对的参数，可以解决升级问题，sendlog解决日志统计问题。

* `ios_version/andr_version`：是标示该协议的最低支持版本，如果低于这个版本可能因为功能并未实现而能识别。
* upgrade：是是否强制低版本弹出升级对话框
* sendlog：当为1的时候，则发送调起成功失败之类的统计需求

### 简单JSBridge调用封装
简单封装下JSBridge调用的方法，参数如下：
* module：类名称，如果account
* action：具体操作方法，如login
* args：非必须，协议参数，支持string和对象
* callback：非必须，回调单独提出来，方便全局方法命名

具体代码如下
```js
function invoke (module, action, args, callback) {
  let scheme = `yourappscheme://${module}/${action}?`
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
```

## 打完收工
今天写的有点多，介绍了JSBridge常用的方法，然后介绍了APP外如何唤起APP，还介绍了scheme协议，最后比较了优缺点，做个最佳实践。希望有用~