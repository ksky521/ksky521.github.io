title: "PHP生成RSS类：RSS.class.php"
id: 412
date: 2009-12-25 20:33:02
tags:
- php
- 网络技术
categories:
- 后端运维
---
前些日子给[爱墙](http://love.2fool.cn)添加了RSS订阅功能，代码是自己写的，其中使用到了一个PHP类：RSS.class.php，感觉非常方便，不敢独享，特拿出来跟大家分享。

使用方法如下：</blockquote>
使用方法如下：
> 
```php

> include_once("class/RSS.class.php");//引入RSS PHP类
> $RSS= new RSS("名称","地址","描述","RSS频道图标");
> $RSS->AddItem("日志的标题","日志的地址","日志的摘要","日志的发布日期");
> $RSS->Display();//输出RSS内容```
<!--more-->