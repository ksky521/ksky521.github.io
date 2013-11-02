title: "使用html5 postMessage和window.name实现多浏览器跨域"
id: 752
date: 2011-09-08 01:40:30
tags:
- 跨域
categories:
- 前端开发
---

**跨域**是个“很古老”的问题，因为浏览器的同源策略，导致不同域名下不能进行跨域名请求数据，虽然这样设计安全了很多，但是对于大型的网站同时维护多个域名就需要进行跨域操作。例如：微博开放平台的jssdk实现的跨域请求数据，再例如weibo.com和sina.com的同步登录。

之前我也说过不少跨域的方式了，有结合服务器端的，有纯粹javascript实现的跨域，例如：《[利用跨域资源共享（CORS）实现ajax跨域调用](http://js8.in/685.html)》、《[用document.domain+iframe实现Ajax跨子域](http://js8.in/443.html)》、《[通过JSONP实现完美跨域](http://js8.in/548.html)》。在我的上一篇文章《[javascript入门到高级PPT](http://js8.in/750.html)》中也提到了跨域。
当然也有不少关于跨域的文章，例如口碑UED的文章《[跨域资源共享的10种方式](http://ued.koubei.com/?p=1291)》等等。大家可以去阅读一下。

今天我说的html5 **postMessage**和window.name也不是一种新的跨域方式，因为有不少人写文章写了，而实际应用的我不知道有哪些人？不过新浪微博的新旧两个jssdk都是采用这种方式，包括之前的人人网的xd.html，当然现在的人人和facebook都是通过flash实现的跨域，这不是今天说的内容。

### html5 postMessage实现跨域

postMessage是html5的一个新功能，可以实现不同域名之间的通信，通过给postMessage方式发送数据，监听则通过在父子窗口添加onmessage事件进行。
缺点也就很明显了，只有支持html5的浏览器才支持这种跨域方式，像IE6、7当然就拒之门外了！

### window.name实现跨域

window.name实现跨域也是一个比较老的问题，之前[kejun](http://hikejun.com/blog/?p=56)写过一个[demo](http://hikejun.com/demo/windowname/demo_windowname.html)，可是给的却是同域名的通信。
其实kejun的实例中就是实现跨域的，不过他采用了同一个域名，而且过程比较崎岖：

1.  建立iframe，指定src为被跨域的页面
2.  被跨域文件修改window.name，将数据传给window.name
3.  将iframe.src修改为本域代理文件，然后就可以取到contentWindow.name
4.  进行处理数据，清除iframe
充分的运用了**window.name**因为页面的url改变而name不改变的特性。
但是如果我们是自己用，还是可以的，而如果我们放出去要别人使用我们写的东西，那样学习成本太大。

### 多浏览器双向跨域

为了解决上面的问题，我们使用的方法就是如果支持**postMessage**的浏览器就使用postMessage，如果不支持的就采用window.name的方式，幸运的是在IE6、7中支持跨域设置window.name，而我们就可以简单的通过window.name来**跨域**。然后建立计时器来监听window.name是否发生了变化，如果变化则接收并分析window.name，然后做请求。
<!--more-->
废话不多说了~直接来个跨域的demo。

[多浏览器双向跨域demo](http://js8.in/mywork/crossdomain/xdomain.html)
