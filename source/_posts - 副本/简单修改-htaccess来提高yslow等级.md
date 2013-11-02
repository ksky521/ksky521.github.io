title: "简单修改.htaccess来提高Yslow等级"
id: 471
date: 2010-02-03 21:40:49
tags: 
categories: 
- 软件心得
---

最近一直在修改我的[爱墙程序](http://love.js8.in "爱墙许愿送祝福")，其中对于**Yslow的等级**纳入了考虑，之前的空间不支持自定义**htaccess**文件，现在的空间支持自定义htaccess，在以前的文章中我写过一篇关于htaccess的文章，今天我在结合**爱墙许愿送祝福**（http://love.js8.in）的网站，来说说通过修改htaccess达到Yslow优化，等级提高的方法，大家可以看看[http://love.js8.in](http://love.js8.in)的Yslow等级已经到了**B**，分数是85~87之间，由于网站使用了jQuery的FaceBox插件以及量子统计，所以等级有点降低，可是总体等级是不大会变的，其实我就是通过修改htaccess达到Yslow优化的，这是最直接的方法，不需要修改程序代码既可以提高Yslow等级~废话不说啦，进入正题吧。

[caption id="attachment_470" align="aligncenter" width="446" caption="简单修改htaccess文件提高Yslow等级优化"][![简单修改htaccess文件提高Yslow等级优化](http://js8.in/wp-content/uploads/2010/02/Snap2.jpg "简单修改htaccess文件提高Yslow等级优化")](http://js8.in/wp-content/uploads/2010/02/Snap2.jpg)[/caption]

<!--more-->

### Add an Expires header / 为文件头指定过期时间

Expires是浏览器Cache机制的一部分，浏览器的缓存取决于Header中的四个值： Cache-Control， Expires， Last-Modified， ETag。这个项目的考评主要针对Cache-Control和**Expires**。

具体的Cache原理不是本文所涉及的，有兴趣的童鞋可以看看[Caching Tutorial一文](http://www.mnot.net/cache_docs/)。为了优化这个选项，我们所要做的是对站内所有的文件有针对性的设置Cache-Control和Expires，要提高**Yslow**的等级就要在htaccess中设置文件头的过期时间，一般对于ico、jpg、gif、png、js、css之类的文件一般是不会发生变化的，所以我们可以设置的过期时间长一点。看我的htaccess文件内容：
> &lt;IfModule mod_expires.c&gt;
> ExpiresActive On
> ExpiresDefault A600
> ExpiresByType image/x-icon A2592000
> ExpiresByType application/x-javascript A2592000
> ExpiresByType application/javascript A2592000
> ExpiresByType text/javascript A2592000
> ExpiresByType text/css A604800
> ExpiresByType image/gif A2592000
> ExpiresByType image/png A2592000
> ExpiresByType image/jpeg A2592000
> ExpiresByType text/plain A86400
> ExpiresByType application/x-shockwave-flash A2592000
> ExpiresByType video/x-flv A2592000
> ExpiresByType application/pdf A2592000
> ExpiresByType text/html A600
> &lt;/IfModule&gt;

### Gzip components / 启用Gzip压缩

**Gzip**可以压缩网页，达到更快的传输速度，如果你想使用Gzip请首先确认你的服务器是否支持Gzip**压缩**模块，然后htaccess中加入如下代码：
> &lt;IfModule mod_deflate.c&gt;
> SetOutputFilter DEFLATE
> AddOutputFilterByType DEFLATE text/html text/css image/gif image/jpeg image/png application/x-javascript text/javascript application/javascript
> &lt;/IfModule&gt;

### Configure ETags / 配置ETags

ETag响应头可以占用一部分的带宽，所以我们可以设置为**none**，**htaccess配置**如下：
> FileETag none