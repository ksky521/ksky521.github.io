title: "Img,Script,Link等标签为空可导致页面多余请求"
id: 555
date: 2010-06-18 01:13:22
tags:
- 网络技术
categories:
- 乱七八糟
---
把页面中的**img，script，link**等标签为**空链**可以导致页面多余请求的问题，包括IE，Firefox，chrome，Safari！但是相对于img，script跟link的src、href为空时，在IE下不做请求，而Chrome, Safari, 和 Firefox则会出现一次多余的新请求。下面详细讲解一下：

### img src为空的情况分析

无论是在html中写入`&lt;img src='' /&gt;`还是在js中通过Image对象建立`var img = new Image(); img.src = "";`，都会导致向你的服务器多做一次请求。而具体请求的情况分析如下：

1.  在IE中，这样做会请求一次当前页面所在的目录。如在http://js8.in/demo/a.html 中出现这种空src的标签，会导致重新请求一次:http://js8.in/demo/
2.  在Safari 和 Chrome中，将请求当前页面本身。
3.  在Firefox 3.5以前的版本中，有和Safari同样的问题，但是在3.5中修正了这个BUG。
4.  在Opera 中，不会做额外的请求。
<!--more-->
在一个访问量不高的网站中，多一个这样的请求也无所谓（甚至可以让你的网站浏览看上去翻番），但在一个千万级访问量甚至更高的WEB站点里，这样会导致你的服务器和带宽的成本显著增加。 另外一个隐患是，重新请求某个页面可能会导致用户的一些信息被无意中修改，例如cookies，或者ajax操作。

### 你永远不会写出这样的代码？

我并不这么认为，很多时候这种情况在无意中出现，比如下面这段php代码：

```php
![]($imageUrl)```
你原计划是从服务器端读取这个src地址，但是由于某个原因，这个地址还未设置，或者代码的BUG导致读取失败，就会出现空的src标签。

### 其他的标签中的空src会不会导致这样的问题？

好消息是，在**IE**中只有image标签有这个问题。
坏消息是，在Chrome, Safari, 和 Firefox中`&lt;script src=""&gt;` 和`&lt;link href=""&gt;`都会导致出现一个新的请求。

### 如何解决这个问题？

可以从两方面着手，一是尽量避免这种坏的编程方式，不要出现空的src标签。另外，可以从服务器端着手，在发现时这种无意义的请求时不要返回任何东西给客户端。

```php
<?php
    $referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
    $url = "http://" . $_SERVER['HTTP_HOST']  . $_SERVER['REQUEST_URI'];
    if ($referrer == $url){
        exit;
    }
?>```