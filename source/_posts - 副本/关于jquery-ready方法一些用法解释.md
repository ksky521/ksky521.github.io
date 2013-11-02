title: "关于jQuery ready()方法一些用法解释"
id: 603
date: 2010-08-30 18:27:27
tags: 
categories: 
- JavaScript
- 网络技术
---

jQuery的**ready**方法的是开发中经常用到的，作用相当于我们的body onload，是当页面DOM准备就绪的时候才运行的代码，最常用的就是在DOM渲染加载之前，先给document绑定ready事件，然后当页面DOM都准备好之后才运行这个事件。
关于**jQuery**的ready有以下几种用法

### 最常用也是最标准的ready方法

<pre lang="javascript">$(document).ready(){
});</pre>

### 简写的jQuery ready()

<pre lang="javascript">$(function(){
});</pre>
这是因为**jQuery**的选择器第一个参数假如为空，那么默认的是**document**
<!--more-->

### 不建议使用的ready()方法

<pre lang="javascript">$().ready(handler);</pre>
在[jQuery1.4发布公告](http://jquery14.com/day-01/jquery-14)中提到了：在jQuery1.4中仍然保留这种方法，但是不推荐使用，并且jQuery1.3的ready会返回一个jQuery的对象，而1.4中则不会又返回

### 解决jQuery（$）库冲突的ready方法

这一种方式一般用在处理jQuery的$和别的**库冲突**的时候用的,可以通过**`jQuery.noConflict()`**这个方法,我们就可以直接在代码中通过jQuery来代替$来使用,但又习惯了使用$怎么办?看下面的代码:
<pre lang="javascript">jQuery.noConflict();
jQuery(function($){
    alert($("#ready1").html());   //这样我们就可以使用$了
});</pre>

### 后记

一般在开发中[断桥残雪](http://js8.in)是不会推荐使用jQuery的ready方法的，因为绑定ready事件之后，jQuery需要添加**DOMContentLoaded**监听事件，对于页面加载渲染是有一定影响的，所以建议我们在逼不得已的情况下才使用jQuery的ready。

在实际开发中我推荐把ready中要执行的函数放在DOM的HTML代码之后，也就是当DOM渲染过去之后再执行handler，或者把代码直接放在页面的末尾

[caption id="attachment_590" align="aligncenter" width="147" caption="订阅更“健康”"][![断桥残雪部落格最新的订阅地址](http://js8.in/wp-content/uploads/2010/08/logo_147x47.gif "断桥残雪部落格最新的订阅地址")](http://feed.feedsky.com/r57c)[/caption]
<span style="display:none">woshao_985140e4b71711df9e5e000c295b2b8d</span>