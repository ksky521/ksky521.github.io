title: "通过PHP批量下载图片文件"
id: 586
date: 2010-08-22 00:58:43
tags: 
categories: 
- php
---

最近一直很忙，遇到一个手工活，需要下载一些远程的图片，一共一百多张，如果通过手工一张一张的保存，也太耗费时间了，于是上网google了一把，找到**PHP批量下载图片**文件的方法，原文是出自平凡世界博客的一片关于如何使用**PHP**[批量下载CSS文件中的图片的文章](http://www.ccvita.com/375.html)。经过研究改写了一下就可以使用了，方便快捷多了。

PHP批量下载图片文件代码：
<pre lang="php">
set_time_limit(0);//设置PHP超时时间
$imagesURLArray = array_unique($imagesURLArray );

foreach($imagesURLArray as $imagesURL) {
    echo $imagesURL;
    echo "
";
    file_put_contents(basename($imagesURL), file_get_contents($imagesURL));
}
</pre>
原理很简单，通过一个含有图片地址的数组循环，然后使用PHP的**file_get_contents**函数取得图片，在使用**file_put_contents**函数把图片保存下来。
P.S：一定要加上**设置PHP超时时间**哦~！
<!--more-->
附上原文中通过php下载css中图片的代码：
<pre lang="php">
< ?php
/*
More & Original PHP Framwork
Copyright (c) 2007 - 2008 IsMole Inc.
Author: kimi
Documentation: 下载样式文件中的图片，水水专用扒皮工具
*/

//note 设置PHP超时时间
set_time_limit(0);

//note 取得样式文件内容
$styleFileContent = file_get_contents('images/style.css');

//note 匹配出需要下载的URL地址
preg_match_all("/url\((.*)\)/", $styleFileContent, $imagesURLArray);

//note 循环需要下载的地址，逐个下载
$imagesURLArray = array_unique($imagesURLArray[1]);
    foreach($imagesURLArray as $imagesURL) {
    file_put_contents(basename($imagesURL), file_get_contents($imagesURL));
}
</pre>

[caption id="attachment_590" align="aligncenter" width="147" caption="点击订阅断桥残雪部落格"][![断桥残雪部落格最新的订阅地址](http://js8.in/wp-content/uploads/2010/08/logo_147x47.gif "断桥残雪部落格最新的订阅地址")](http://feed.feedsky.com/r57c)[/caption] 