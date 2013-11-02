title: "Less—让CSS如此简单"
id: 477
date: 2010-02-07 17:47:27
tags: 
categories: 
- CSS
- 网络技术
---

[![less](http://js8.in/wp-content/uploads/2010/02/less.png "less")](http://js8.in/wp-content/uploads/2010/02/less.png)

写**CSS** 最痛苦的是要搞定一堆**浏览器兼容**bug ，其次就是要面对CSS 不是programming language 这现实，不存在其他程式语言常见的变数、运算、继承等概念，使原本简单的工作变得冗长，并且使维护工作变得麻烦。
**less** 的出现便是为了解决这个问题：在现有CSS syntax 的基础上，为CSS 加入程式语言的特性，包括变数、scope、nested rules、运算、继承。
看例子你便会明白：
<pre lang="css">@brand_color: #F0F;

#container {
div {
color: @brand_color;
border: none; }
p {
color: @brand_color;
}
}</pre>
<!--more-->这例子应该很容易理解吧，相等于以往的：
<pre lang="css">#container div {
color: #F0F;
border: none;
}
#container p {
color: #F0F;
}</pre>
坏消息是，用less 写成的档案需要在Unix based 的电脑上编译过后方能变成真正的CSS；好消息是，有人写了个小工具less.app 可以完成这项工作，使不懂得用terminal的用户也能够使用。在 window 下貌似没有简单的解法…
less 官方网站：[http://lesscss.org/](http://lesscss.org/)
less.app (GUI): [http://incident57.com/less/](http://incident57.com/less/)