title: "设置htaccess应该注意的问题"
id: 366
date: 2009-12-07 02:32:56
tags:
- 网络技术
categories:
- 乱七八糟
---
今天给[爱墙](http://love.js8.in "爱墙许愿")做SEO优化，发现自己没有自定义**404**页面，并且还发现存在index of列目录的漏洞，后来才知道原来WordPress都没有在htaccess中使用**Options -Indexes**来防止列目录，于是先加上了Options -Indexes来防止列目录的问题，自动转为了404错误，而不是403，呵呵~

可是我改变了[爱墙](http://love.js8.in "爱墙许愿")的根目录下的htaccess配置把404页面指到了404.html，可是就是不能实现**404页面**的跳转呢？难道htaccess的404配置不可用？而是直接都返回到了[爱墙的首页](http://love.js8.in "爱墙许愿")（http://love.js8.in）~这样子听说对**SEO**是很不好的，搜索引擎不会收录网站的首页，于是上网google原因，找了半天的原因也没有找到问题的根本所在~

后来我在一片不起眼的文章中找到了问题的所在~
<!--more-->文章写到如下内容> Apache必须在所有上级的目录中查找**.htaccess**文件，以使所有有效的指令都起作用(参见指令的生效)，所以，如果请求/www/htdocs/example中的页面，Apache必须查找以下文件：
> 　　/.htaccess
> 　　/www/.htaccess
> 　　/www/htdocs/.htaccess
> 　　/www/htdocs/example/.htaccess 
> 　　总共要访问4个额外的文件，即使这些文件都不存在。(注意，这可能仅仅由于允许根目录"/"使用.htaccess ，虽然这种情况并不多。)

我想是不是我的**WordPress**目录下的htaccess影响到了[爱墙](http://love.js8.in "爱墙许愿")的htaccess呢？因为我的爱墙是放在WordPress目录下的，即WordPress/lovewall，WordPress的htaccess文件地址是WordPress/.htaccess，而[爱墙](http://love.js8.in "爱墙许愿")的为WordPress/lovewall/.htaccess，所以二者是合并使用了，当访问其他页面的时候，会默认启用WordPress中的重写目录规则。我改写了一下WordPress根目录下的htaccess，果然如此~恍然大悟！可是怎么解决呢？？

开始想到的是吧lovewall文件夹从WordPress文件夹中移出来，这样WordPress的htaccess文件就不被引用了，可是这样还要重新配置lovewall中文件，还要重新解析http://love.js8.in，成本太高了，不喜欢~

后来，我仔细一想不是WordPress的htaccess的文件跟[爱墙](http://love.js8.in "爱墙许愿")的htaccess文件都是合并吗？为什么不在爱墙的htaccess中把**RewriteEngine**关掉呢？于是我把爱墙的htaccess文件改成了如下的内容> RewriteEngine Off
> 
> ErrorDocument 404 /404.html
> ErrorDocument 403 /404.html
> Options -Indexes
问题成功解决！
_P.S._:一、WordPress的htaccess默认存在**列目录**的问题，可以使用Options -Indexes解决这个问题；二、htaccess的引用是从跟文件夹的htaccess开始引用的，二者（或者更多）合并使用