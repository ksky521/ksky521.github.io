title: "转变代码思路：js浏览器判断方法"
id: 678
date: 2011-03-14 21:04:05
tags:
categories:
- 前端开发
---
“变则通，通则达”，在coding的时候也要做到，有时候思路往往太过于局限性，对**浏览器判断**方法的实例，来说说代码思路的转变。

### navigator.userAgent分析

关于**javascript**对浏览器的判断，很早之前我写过一篇文章《js判断浏览器的函数，可区分chrome，safari\》。

YQ框架中也是采用的这个方法，可是后来想到了有位网友说判断火狐的版本号会错误，这是因为火狐的version的判断走了正则，而没有考虑到firefox的，其实不止firefox有这个bug。

首先来看看火狐的`navigator.userAgent`:
这个是我的firefox（3.6.15，却显示3.6.8，不知何解，查看关于也是这个问题：版本不统一）

> Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8 QQDownload/1.7

根据正则的写法，火狐的版本号应该这样写`/Firefox[\/]([\w.]+)/`
而safari的确是类似的：

> ……Version/3.1 Safari/525.13

其中Version为实际的版本号，也是我们常称呼的版本号。

### 琢磨

开始写js判断浏览器的，跟jQuery的**$.browser**一样，可是版本号会出现问题，只不过是加了个chrome判断而已。开始想解决方法，初步想得是通过一个正则对象把浏览器的名称和版本号统一匹配出来，正则对象设置如下：
```javascript
var browserRegExp = {
    ie:/(msie)[ ]([\w.]+)/,
    firefox:/(firefox)[ |\/]([\w.]+)/,
    chrome:/(chrome)[ |\/]([\w.]+)/,
    safari:/version[ |\/]([\w.]+)[ ](safari)/,
    opera:/(opera)[ |\/]([\w.]+)/
}
```
<!--more-->
这个对象的设计还是有一定技巧的（后面提到），因为我后面要使用一个遍历，把全部的正则匹配一遍，生成一个类似$.browser的对象。但是仔细想想，我们在使用判断的时候怎么使用呢？无非是下面的使用：

```javascript
$.browser.msie&&$.browser.version==='6.0'
```

#### 第一次转变，使用方法的转变

上面的使用方法，可是转变为下面的使用方法：

```javascript
$.browser==='msie'&&$.browserVersion==='6.0'
```

$.browser为浏览器的名称，`$`.browserVersion为版本号，这样就不用使用的时候每次都走正则判断，提高了效率。

#### 第二次转变，函数写法的转变

根据上面的分析，我们需要先判断出来浏览器名称和版本号，然后分别给$.browser、$.browserVersion赋值，于是有了下的YQ代码：

```javascript
for(var i in browserRegExp){
        var match = browserRegExp[i].exec(ua);
        if(match){
            YQ.browser = match[1];
            YQ.browserVersion = match[2];
            break;
        }
    }
```
前面提到了小技巧，就是把用户群体大浏览器放在前面，减少循环次数，IE在国内肯定是第一啦，其次FF，chrome……依次下来。

#### 第三次转变：不知道咋说了

细心的童鞋应该看到了safari判断出来YQ.browser和YQ.browserVersion是相反的，要解决这个问题，就来了第三次转变！语文不好，不知道咋说这次转变了，直接上代码：

```javascript
var ua = navigator.userAgent.toLowerCase(),
    browserRegExp = {
        ie:/msie[ ]([\w.]+)/,
        firefox:/firefox[ |\/]([\w.]+)/,
        chrome:/chrome[ |\/]([\w.]+)/,
        safari:/version[ |\/]([\w.]+)[ ]safari/,
        opera:/opera[ |\/]([\w.]+)/
    };
YQ.browser = 'unknow';
YQ.browserVersion = '0';
for(var i in browserRegExp){
    var match = browserRegExp[i].exec(ua);
    if(match){
        YQ.browser = i;
        YQ.browserVersion = match[1];
        break;
    }
}
alert(YQ.browser);
alert(YQ.browserVersion);
```

1.  修改了正则，判断是version
2.  2、判断出来是把i赋值给YQ.browser
这样，我们获得的YQ.browser 就是对象的key，如果IE则YQ.browser 为ie，而不是msie，实际上更加方便记忆了，而且不用多余的判断来处理safari版本号和名称倒置的问题了。

### 总结

仔细观察多想多看会有不少发现的，我有代码洁癖，能少写判断就少写，能少用循环就少用！呵呵。
继续coding YQ……（状态：爱墙写完了，YQ正在检查ing）