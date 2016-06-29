title: JavaScript sdk(jssdk)设计指南
date: 2016-06-29 06:42:06
tags:
- javascript
- jssdk
- 跨域
categories:
- 前端开发
---

今天看到一篇《[javascript sdk设计指南](http://www.zcfy.cc/original/403)》，内容篇幅比较多，很多实际是问题的枚举，但是信息量太大，所以我结合之前做微博开放平台和运营活动平台的经验，说下jssdk的设计和一些核心问题的解决方案。

一个jssdk一般是指提供给第三方人员使用的一段js，通过这个js实现一些平台化产品提供的服务，比如[微博的jssdk](http://jssdk.sinaapp.com/)。整个jssdk的设计有一下几个核心问题：

* 代码如何被使用页面接入
* 如何实现跨域通信
* 如何实现优雅api的设计
* 公共资源的使用
* 代码组件化

先说第一个问题

## 代码如何被使用页面接入
这个问题涉及到几个小问题需要讨论：
* 命名空间
* 样式冲突
* 版本维护
* appid等参数的传入

### 命名空间
在「__命名空间__」部分，需要做到`不污染环境，保护好自己`，即不要对本来的页面造成命名的破坏，只是用一个命名空间，又要考虑到第三方页面的复杂性，防止跟错综复杂的命名空间冲突。

要做到这点，需要我们在命名空间命名的时候多注意下，尽量不要使用业内通用的命名方法，比如驼峰，名字尽量起的怪一些，偏一些，一般，要么使用`_`开头（甚至多个），要么使用项目代号这些不太被别人想到的名字，嗯，我记得有人命名空间用`av`，很好呀！

还有一种方式是动态的命名空间，在url中带上`namespace=xxx`，本节结束后面会统一给出示例

### 样式冲突

除了js命名空间问题，如果jssdk带有UI组件，那么还需要考虑css的样式冲突问题，这里不用多说，记住以下几点：
* 一些复杂的widget可以使用iframe方式引入
* 不使用id
* 使用带前缀的class命名，前面用一个class最好包裹
* 自己做reset！
* 跟js相关的class要有特殊的约定（比如`_J-xxx` ）或者使用`data-id`代替

其实利用sass、less这些预编译语言很容易

例如下面的代码：
```sass
$name: avUI;

.#{$name}__dialog{
    @include reset();
    .#{$name}__dialog__header{
        color: white;
    }
}
```
### 版本维护
版本维护的目的是保证代码最新，功能最全，而不用每次做了升级，通知所有使用的第三方开发者把自己页面的代码挨个更换。所以这里版本维护不应该暴漏给使用者，比如在url使用版本号，到了2.0版本，通知使用方替换，这是不合理的，总有些公司或者人不配合的。最好的方法是设计的时候就要考虑到这个问题。

一般有两种比较好的方式：
* 小拖大，动拖静：即第三方引入的js是一个动态的，或者没有缓存没有cdn的，然后由它带出后面的cdn
* 隔段时间动态创建script

推荐使用「小拖大，动拖静」，后面介绍组件化也要使用这个方式来按需加载代码
#### 小拖大，动拖静
核心代码示例
```js
(function(){
    .....
    var url = '最新版本cdn的地址';
    load(url);
}())
```

#### 隔段时间动态创建script
代码示例：
```js
(function () {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    var t = +new Date;
    t -= %864E5;
    s.src = 'http://xxx.com/sdk.js?t='+t;
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  })();
```

<!--more-->
### appid等参数的传入
一般在引入sdkjs代码的时候需要加参数或者版本号，比如开放平台需要配置`appid`，所以url写法是：
`sdk.js?appid=xxxx&namespace=xxx` 。jssdk需要拿到url中的这些参数，方法有以下两种比较通用的：

* 给script标签增加特殊属性，例如`<script src="path/sdk.js?appid=123" id="_jssdk">` 
* 使用查找script标签方式：
```js
//get url args function
function parserUrl(){
    var scripts = document.getElementsByTagName("script"),
        len = scripts.length,
        url;
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            if (scripts[i].src.indexOf("path/to/sdk.js") !== -1) {
                return scripts[i].src.split("?").pop();
            }
        }
    }
}
```

所以appid，namespace这些都可以解析出来

## 如何实现跨域通信
对于不在一个域名下的第三方页面引入的jssdk少不了的是跨域请求，这块移动上可以直接使用`postMessage`方法，将来可以使用xhr2+CORS，相兼容IE，可以参考《[三水清跨域tag](http://js8.in/tags/%E8%B7%A8%E5%9F%9F/)》的内容，这里不做过多介绍

## 如何实现优雅api的设计
这里的api指的是开放平台提供的http接口，一般都会有一些标准的规范，比如：
* 获取用户信息：http://domain.com/api/getUserInfo.json
* 更新用户信息：http://domain.com/api/updateUserInfo.json

我们设计这个函数接口的时候，应该充分考虑到将来server接口的增加，所以应该做成通用的服务，比如我们设计个`sdkjs.api`方法，接受四个参数：url\data\callback\method，默认如果data是函数就后面参数自动前提。

```js
api: function(url, data, callback, method) {
    var _args = $.toArray(arguments),
        _callback = _args[2] || $.emptyFn;

    if (_args.length < 3) {
        throw Error("api arguments length wrong");
    }

    if (!$.isString(_args[0]) || !$.isObject(_args[1]) || !$.isFunction(_callback)) {
        throw Error("api arguments format error");
    }

    var _cbid = 0;

    if ($.isFunction(_callback)) {
        _cbid = _CallbackManager.add(_callback);
    }
    //跨域发起请求
    xDomain.send("api", {
        url: _args[0],
        data: _args[1],
        method: _args[3] || "get",
        _cbid: _cbid
    });
    return back;
}
```

## 公共资源的使用
公共资源的使用，指的是一些跟宿主环境共享的资源，比如cookie、localstorage这些，使用的时候应该做前缀处理，尽量不污染宿主页面环境，同时保证不被轻易的删除。
## 代码组件化
代码的组织在一些带有UI的jssdk中使用较多，比如按需加载某个UI模块。这时候就充分利用到了第一节提到的「小拖大，动拖静」的引入方式，一开始小文件我们叫seed，里面有UI组件和sdk主代码的url，seed.js加载后，先加载sdk的核心js文件，然后如果使用某个UI组件，就按需加载。

```js
var MAP = {
    core: ['sdk-core.js'],
    ui: {
        loginDialog: ['path/loginDialog.css', 'path/loginDialog.js']
    }
}
load(MAP.core);

//使用
SDKJS.ready(function($){
    //$实际是SDKJS
    $.use('loginDialog', function(loginDialog){
        loginDialog(xxxxx);
    })
});
```

其中`.use`方法，有些类似`require`方法，起到按需加载的功能。
