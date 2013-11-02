title: "对Zblog的页面分页链接的修改"
id: 43
date: 2008-09-11 03:37:45
tags:
- 网络技术
categories:
- 乱七八糟
---
今天我们去上自习可惜上午第二节课又有上课，我们没办法学习啦~于是就来网络上面看看，看着自己的blog的分页样式不好看，现在自己试着修改了下，很容易就可以做到的！不用&ldquo;文件重建&rdquo;的功能就可以使用~原理就是使用修改CSS和b_pagebar.html

正文开始啦，这个样式只是适用Zblog的默认模板，其他的模板大家可以自己更改下的，我的代码中有具体的注释

1.  修改HTML文件：找到主题文件下的template文件夹中的b_pagebar.html（分页文件），把其中的_&lt;a href=&quot;&lt;#pagebar/page/url#&gt;&quot;&gt;[&lt;#pagebar/page/number#&gt;]&lt;/a&gt;_改成<span style="COLOR: #ff0000">**_&lt;a href=&quot;&lt;#pagebar/page/url#&gt;&quot;&gt;&lt;#pagebar/page/number#&gt;&lt;/a&gt;&nbsp;_**</span> 也就是简单的去掉&ldquo;[&rdquo;和&ldquo;]&rdquo;，目的是为了更改后的更美观2.  修改CSS文件：找到style中的默认CSS文件default.css 在文件的最后添加下面的代码

/*--------------------------分页条CSS代码-------------------------------*/
&nbsp;div.pagebar{
margin:10px 0 0 10px; 
padding:0; 
line-height:20px;
height:20px
}

div.pagebar a,.pagebar .now-page{
padding:1px 5px 2px 5px;
margin:0 2px;
text-align:center;
font-weight:bold;
font-family:Verdana;
border:1px solid #ccc;
text-decoration:none
}

div.pagebar a:hover{ /* 定义鼠标滑过页码样式 */
BACKGROUND: #4EB2ED; /* 鼠标滑过时候的背景颜色 */
COLOR: #000;/* 鼠标滑过时候的字码颜色 */
border:1px solid #0084DC;
text-decoration:none
}

div.pagebar .now-page{ /* 定义当前页码 */
BACKGROUND: #0066CC;&nbsp; /* 当前页码颜色代码，自己改 */
COLOR: #000; /*当前页码的颜色 */
}

<span style="COLOR: #ff0000">PS：网站设置的分页不要太多，我设定的是现实18个一张分页。</span>

好了，大家看看下面的我的页面的截图吧~具体效果看看我的博客吧：[]()

[![](/uploads/userup/0811/1Q1403434I.jpg)](/uploads/userup/0811/1Q1403434I.jpg)&nbsp;