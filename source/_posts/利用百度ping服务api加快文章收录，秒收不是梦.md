title: "利用百度ping服务API加快文章收录，秒收不是梦"
id: 645
date: 2010-12-20 01:04:15
tags:
- php
- 网络技术
categories:
- 后端运维
---
上一篇文章提到了[谷歌的ping服务接口](http://js8.in/644.html "利用google博客的ping服务接口API加快网站收录")，其实国内的搜索引擎**百度**也有类似的服务，今天就介绍下百度博客ping服务，[百度博客Ping服务的详细介绍](http://www.baidu.com/search/blogsearch_help.html#n7)，请移步：[http://www.baidu.com/search/blogsearch_help.html#n7](http://www.baidu.com/search/blogsearch_help.html#n7)。百度的**ping服务**也是基于XML-RPC标准协议，但是与谷歌ping服务不同的是百度的ping发送的xml格式不同，我们需要使用string节点包裹内容。

例如：

```xml

<?xml version="1.0" encoding="UTF-8"?>
<methodCall>
<methodName>weblogUpdates.extendedPing</methodName>
<params>
<param>
<value><string>断桥残雪部落格</string></value>
</param>
<param>
<value><string>http://js8.in/</string></value>
</param>
<param>
<value><string>http://js8.in/644.html</string></value>
</param>
<param>
<value><string>http://js8.in/feed</string></value>
</param>
</params>
</methodCall>
```

根据[上篇](http://js8.in/644.html "利用google博客的ping服务接口API加快网站收录")提到的谷歌接口，我们只要改变一下提交的xml内容即可，当然百度ping服务返回的判断也是跟谷歌的不同，也可以做相应的修改，
<!--more-->
下面是php的代码：

```php

$baiduXML = <<<EOT
	<?xml version="1.0" encoding="UTF-8"?>
	<methodCall>
	<methodName>weblogUpdates.extendedPing</methodName>
	<params>
	<param><value><string>断桥残雪部落格</string></value></param>
	<param><value><string>http://js8.in</string></value></param>
	<param><value><string>http://js8.in/644.html</string></value></param>
	<param><value><string>http://js8.in/feed</string></value></param>
	</params>
	</methodCall>
EOT;
$res = postUrl('http://ping.baidu.com/ping/RPC2', $baiduXML);
//下面是返回成功与否的判断（根据百度ping的接口说明）
if (strpos($res, "<int>0</int>"))
        echo "PING成功";
    else
        echo "PING失败";
```

关于PHP的postUrl函数请参见：《[利用google博客的ping服务接口API加快网站收录](http://js8.in/644.html)》
