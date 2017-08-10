title: iOS使用scheme协议调起APP
date: 2013-12-16 10:49:32
tags:
- ios
- 手机开发
- webapp
categories:
- 前端开发
---

在iOS中，需要调起一个app可以使用scheme协议，这是iOS原生支持的，并且因为iOS系统中都不能使用自己的浏览器内核，所以所有的浏览器都支持，这跟android生态不一样，android是可以自己搞内核的，但是iOS不行。

在iOS中提供了两种在浏览器中打开APP的方法：``Smart App Banner``和scheme协议。

## Smart App Banner

即通过一个meta 标签，在标签上带上app的信息，和打开后的行为，例如：app-id之类的，代码形如：

```html
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
```

具体可以看下开发文档：[https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html)

今天Smart APP Banner不是我们的主角，我们说的是*scheme*


## 使用scheme URL来打开iOS APP

scheme类似自定义url协议，我们可以通过自定义的协议来打开自己的应用，形如：

```bash
myapplink://
# 例如 facebook的
fb://
# itunes的
itms-apps://
# 还有短信也是类似的
sms://
```

如果要打开一个app，最简单的方式是通过一个链接，如我们在html中这样写：

```html
<a href="myapplink://">打开我的app</a>
```

当用户点击链接的时候就可以打开对应的app。

### 绑定click事件

但是实际中我们更多的情况是绑定事件，比如做个弹层啥的，不能一味的用a标签啊，所以可以通过两种方式来解决：``location.href``和``iframe``。

* ``location.href``，简单，但是容易出现问题，比如没有安装可能会跳转啦。
* ``iframe``，比较复杂，需要创建一个iframe，然后把scheme扔给src

iframe的方式是开发中常用的，但是他也有一些问题：

* 我们没很好的方式来判断是否打开了app
* 会引起history变化
* 因为引起history变化，所以一些webview会有问题，比如：我查查，打开一个页面，如果有iframe，选择在safari中打开，实际打开的是iframe的页面
* 如果页面暴漏给了android系统，那么也会出现页面打不开，之类的问题
* 如果没有app，调起不成功，ios的safari会自己弹出一个对话框：打不开网址之类的提示


所以现在的问题是：**如何知道iframe已经打开了某个app，即解决iframe打开app回调**

<!--more-->

### 使用iframe在iOS系统中打开app

聪明的你可能想到了，iframe的onload事件啊，可是遗憾的说，*无效*！所以我们找到了定时器（setTimeout），通过一个定时器，如果在一段时间内（比如500ms），当点击了按钮（记录time1），页面没有切走（调起app之后，页面进程会被中断），进程中断，那么计时器也会中断，这时候应该不会触发timer，如果调起失败，那么timer会就触发，我们判断下在一定时间内如果页面没有被切走，就认为调起失败。

另外通过timer触发时候的timer2，做差，判断是否太离谱了（切走了之后的时间应该比timer实际定时的500ms要长）：

```javascript
function openIos(url, callback) {
    if (!url) {
        return;
    }
    var node = document.createElement('iframe');
    node.style.display = 'none';
    var body = document.body;
    var timer;
    var clear = function(evt, isTimeout) {
       (typeof callback==='function') &&  callback(isTimeout);
        if (!node) {
            return;
        }
        node.onload = null;
        body.removeChild(node);
        node = null;

    };
    var hide = function(e){
        clearTimeout(timer);
        clear(e, false);
    };
    node.onload = clear;
    node.src = url;
    body.appendChild(node);
    var now = +new Date();
    //如果事件失败，则1秒设置为空
    timer = setTimeout(function(){
        var newTime = +new Date();
          if(now-newTime>600){
            //因为切走了，在切回来需要消耗时间
            //所以timer即使执行了，但是两者的时间差应该跟500ms有较大的出入
            //但是实际并不是这样的！
            clear(null, false);
          }else{
            clear(null, true);
          }
    }, 500);
}
```

看上去方法很靠谱，但是现实总是那么的残酷！

不同的浏览器app（包括webview），都有自己在后台的常驻时间，即：假如一个浏览器他在被切走之后，后台常驻10s，那么我们设置定时器5s过期就是徒劳的，而且5s的定时器，用户要空等5s！交互也不让你这样干啊！


最后我们想到了pageshow和pagehide事件，即如果浏览器被切走到了要打开的app，应该会触发浏览器的pagehide事件，而从app重新返回到浏览器，就会触发pageshow方法。


但是经过代码测试发现，在uc、chrome中，不会触发pagehide和pageshow的方法，而在safari中可以的。

结论：

* 使用iframe调用scheme URL
* 使用定时器判断在一段时间内是否调起成功
* 使用pageshow和pagehide来辅助定时器做更详细的判断
* 定时器中如果有alert可能不会被弹出，这一点很吃惊！后面的dom竟然执行了，但是alert没弹出，可能跟alert的实现有关系吧
* 在实验中我使用了两个定时器，是因为切回浏览器之后，有时候timeout触发要在pagehide和pageshow之前
* 计算timer实际执行时间差，也是不靠谱的

查看[http://jsbin.com/uDUGADO/19](demo)，最后附上研究的代码，算是比较靠谱的方法了，虽然还是有一定的失败（第三方浏览器pagehide和pageshow不触发）：

```html
<p><button id="btn">点我点我啊！alert，不会弹出</button></p>
<p><button id="btn2">点我点我啊！alert2，虽然有alert和info，info执行，但是alert不弹出</button></p>
<p><button id="btninfo">点我点我啊！info可以</button></p>
```

```javascript
$(function(){
  var $info = $('#info');
  function info(msg){
    var p = $('<p>'+msg+'</p>');
    $info.append(p);
  }

  $('#btn').on('click', function(){
    openIos('baiduboxapp://', function(t){
      if(t){
        alert('timeout or no baidu APP');
      }else{
        alert('invoke success');
      }
    });
  });
  $('#btn2').on('click', function(){
    openIos('baiduboxapp://', function(t){
      if(t){
        info('timeout or no baidu APP2');
        alert('timeout or no baidu APP2');
      }else{
        info('invoke success2');
        alert('invoke success2');
      }
    });
  });
  $('#btninfo').on('click', function(){
    openIos('baiduboxapp://', function(t){
      if(t){
        info('timeout or no baidu APP');
      }else{
        info('invoke success');
      }
    });
  });

});

function openIos(url, callback) {
    if (!url) {
        return;
    }
    var node = document.createElement('iframe');
    node.style.display = 'none';
    var body = document.body;
    var timer;
    var clear = function(evt, isTimeout) {
       (typeof callback==='function') &&  callback(isTimeout);
        window.removeEventListener('pagehide', hide, true);
        window.removeEventListener('pageshow', hide, true);
        if (!node) {
            return;
        }

        node.onload = null;
        body.removeChild(node);
        node = null;

    };
    var hide = function(e){
        clearTimeout(timer);
        clear(e, false);
    };
    window.addEventListener('pagehide', hide, true);
    window.addEventListener('pageshow', hide, true);
    node.onload = clear;
    node.src = url;
    body.appendChild(node);
    var now = +new Date();
    //如果事件失败，则1秒设置为空
    timer = setTimeout(function(){
        timer = setTimeout(function(){
          var newTime = +new Date();
          if(now-newTime>1300){
            clear(null, false);
          }else{
            clear(null, true);
          }

        }, 1200);
    }, 60);
}
```

## update
* ios9开始不支持在iframe内调起，需要直接使用`location.href = scheme`
* pagehide，pageshow方法已经失效，目前没有合适的检测是否调起成功的方法，有找到请告知， 谢谢
