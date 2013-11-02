title: "IE6中javascript文件开启Gzip出现代码不执行情况"
id: 902
date: 2011-11-15 04:25:23
tags:
- IE6
categories:
- 前端开发
---

今天处理IE6下的一个bug，经过调试才发现是**javascript**文件文件总是执行不了，

后来中午吃完饭回来才想起以前同事遇见的html中的javascript不可以执行的问题，怀疑是gzip的原因，此次的问题就是因为动态加载javascript文件导致代码不执行，

经过研究发现gzip压缩过的javascript文件，如果header里Cache-Control 数据有no-cache, no-store，就会出现IE6中js代码不执行的问题。下面是转发的文章内容：

IE6下面调用开启了gzip压缩Javascript的时候，时常会碰到无法执行的情况，有可能是src调用，有可能是ajax调用，其它的浏览器工作正常，唯独IE6不能正常工作。
出现这个BUG的状况如下：

1.  用户使用IE6浏览器
2.  服务器没有设置 被请求文件(javascript) expires, cache-control.
3.  服务器端开启了chunked encoding模式
4.  通过javascrip的src调用方式或者ajax请求javascript文件
5.  有可能是通过php生成的javascript文件
6.  服务器端开启了gzip压缩

解决这个问题，我们要在服务器的cache-control和expires 头信息上做点工作。
经过测试，header头信息如下的gzip压缩过的javascript调用可以正常工作。

> Cache-Control:maxage=1
> Connection:keep-alive
> Content-Encoding:gzip
> Content-Type:application/x-javascript;charset=GBK
> Date:Wed, 01 Dec 2010 01:24:07 GMT
> Expires:Wed, 01 Dec 2010 01:24:08 GMT
> Pragma:public
> Server:nginx
> Transfer-Encoding:chunked

分析上面的头信息，我们可以注意到：

1.  cache-control必须要设置成maxage=time的格式，maxage是指定缓存生效时间，1为1秒
2.  Expires必须要设置，它的时间稍大于Date即可，Date是页面请求时间，Expires是过期时间
3.  Pragma设置为public

<!--more-->
设置好了这两个参数，一般就可以了。

在nginx服务器端，我们需要对服务器配置：

```text
location ~* \.(ico|css|js|png|jpeg|jpg|gif|rar|zip|7z|gz|pdf) {
    expires 1d;
}
```

如果javascript文件是由PHP生成的，我们就需要利用php来输出header控制了。

```php
<?php
$expires = 1;
header('Pragma: public');
header('Cache-Control: maxage='.$expires);
header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');
header("Content-Type: application/x-javascript;charset=GBK\n");
```

实际应用中，需要灵活配置，Javascript文件，请尽可能通过服务器发送header头，PHP生成javascript文件，效率本来就不高，再加上额外需要输入header头，更是得不偿失。
