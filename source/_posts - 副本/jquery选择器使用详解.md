title: "jQuery选择器使用详解"
id: 416
date: 2009-12-27 18:46:56
tags: 
categories: 
- JavaScript
- 网络技术
---

随着jQuery的风靡，有很多关于**jQuery选择器**的文章，可是很多人没有系统的学过或者总结过jQuery的选择器使用方法，本文主要跟大家讨论一下jQuery的选择器的用法，针对于不同的jQuery用户，从基础说起，带您领略jQuery强大的选择器。

在跟大家分享自己的jQuery选择器的使用方法之前，我想跟大家说一个Tip，当你使用jQuery选择器的时候，有时候我们却不一定使用jQuery的选择器里面的函数，而是要简单的返回HTML对象，如果使用getElementById之类选择出HTML对象，就比较麻烦了，再说我们强大的jQuery选择器就浪费了，在这里我通过Firebug查看了jQuery选择器返回的对象，发现原来**$("#id")[0]**就是我们要的HTML对象，比如我们要取其中的innerHTML就可以使用$()[0].innerHTML。

### 关于jQuery选择器

通过[jQuery的参考手册](http://jquery-api-zh-cn.googlecode.com/svn/trunk/index.html "jQuery参考手册") 我们可以看见jQuery的选择器分为：基本、层次、简单筛选、内容、可见性筛选、属性筛选、子元素、表单以及表单及其属性，共九种选择器类型，本文主要介绍基本选择器、属性、简单筛选、内容筛选这几个常用的选择器。如果能熟练掌握这几个选择器，那么我们的**jQuery选择器**就已经很熟练了

### jQuery基本选择器

jQuery的选择器跟CSS的选择器很接近，甚至于跟CSS的选择器统一，这样就比较容易学习，简单选择器就是我们常用的CSS的ID和Class选择器，例如下面的代码把id为world的html内容改为“Hello World!”
<!--more-->
<pre lang="javascript">//等同于document.getElementById("world").innerHTML="Hello World!";
$("#world").html("Hello World!");</pre>
下面的代码是将所有class为mylist的背景换为#FFF
<pre lang="javascript">$(".mylist").css("background","#FFF");</pre>
下面的代码将实现当页面加载完成时，给页面中id为my-paragraph绑定click事件，点击它将其内容以及文字颜色改为相应的值。
<pre lang="javascript">$(document).ready(function(){
    $("#my-paragraph").click(function (){
        $(this).html("Hello World");          
        $(this).css("color","#444");
    });
});</pre>

### jQuery的属性选择器

jQuery的属性选择器可以要我们根据元素的特殊属性来选择，基本语法是**$("element[attribute]")**
以下的代码选择出所有的含有ID的P元素，并且绑定click事件，点击后将其HTML内容改为 “Paragraph with ID attribute!”.
<pre lang="javascript">$("p[id]").click(function (){
    $(this).html("Paragraph with ID attribute!");          
});</pre>
下面的代码将选择出P的class不为 “intro”的元素
<pre lang="javascript">$("p[class!=intro]").append("Paragraph with class");</pre>
下面的代码是一个很好的选择器，匹配链接地址中含有2fool.cn的元素
<pre lang="javascript">$("a[href*='2fool.cn']").addClass("mysite");</pre>

### jQuery简单筛选选择器

jQuery简单筛选选择器当选择其中一个或者几个特殊值的元素时是很有用的，例如选择一个DOM元素的第一个或者最后一个元素，索引值为偶数元素、奇数元素，大于、小于索引值的，使用动画的，固定索引值的元素等等

1、**:first**跟 **:last**

 :first 和 :last 是选择DOM元素中第一个或者最后一个元素。例如下面一段html代码，
<pre lang="html">

*   Item A
*   Item B
*   Item C
*   Item D</pre>
我们可以通过后面的jQuery代码的方法轻松的选择它的第一个跟最后一个元素，并且给它们改变样式:
<pre lang="javascript">$("#t-myul-1 li:first").css("color", "#0033CC");
$("#t-myul-1 li:last").addClass("last");
And this is the CSS class .last:
.last{
  background:#0033CC;
  color:#FFF;
}</pre>

**jQuery选择器实例：简单的重新排序**

在这个实例中，我们使用jQuery选择器中的:first 和 :last 轻松的实现将一个DOM元素包含的子元素中的第一个元素移到最后一个元素的底部，实现重新排序。原理示意图：
[![jquery](http://js8.in/wp-content/uploads/2009/12/jquery-300x101.jpg "jquery")](http://js8.in/wp-content/uploads/2009/12/jquery.jpg)
html部分的代码如下：
<pre lang="html">

*   Item 1
*   Item 2
*   Item 3
*   Item 4
<span name="scroll">Scroll up</span></pre>
代码实现如下效果：
[![scroll](http://js8.in/wp-content/uploads/2009/12/scroll.gif "scroll")](http://js8.in/wp-content/uploads/2009/12/scroll.gif)
最后我们给“Scroll up”的span绑定click事件，使其点击实现重新排序功能，代码如下：
<pre lang="javascript">$(document).ready(function() {
    $("span[name='scroll']").click(function scroll_up(){
        first = $("#t-myul-2 li:first");
        last = $("#t-myul-2 li:last");
        first.clone(true).insertAfter(last);
        first.remove();
    });
});</pre>

2、**:even** 跟 **: odd** 

 :even 和 : odd 可以选择出一个DOM元素中索引值为偶数或者奇数的元素。例如下面的html:
<pre lang="html">

*   Item A
*   Item B
*   Item C
*   Item D</pre>
我们可以使用jQuery的:even跟：odd设置不同的背景颜色以容易区分较长的列表，CSS代码如下：
<pre lang="css">.even{background:#EFEFEF;}
.odd{background:#FFF;}</pre>
jQuery代码如下:
<pre lang="javascript">
$(document).ready(function() {
    $("#t-myul-3 li:odd").addClass("odd");
    $("#t-myul-3 li:even").addClass("even");
});</pre>
最终实现的效果是：
[![even-odd](http://js8.in/wp-content/uploads/2009/12/even-odd.gif "even-odd")](http://js8.in/wp-content/uploads/2009/12/even-odd.gif)

### jQuery内容选择器

jQuery的内容选择器允许我们通过元素的内容来选择元素。废话不多说了，结合简单的实例我们来看看jQuery的内容选择器吧。

有这样一段html代码，我们想把其中内容为www.2fool.cn的元素背景颜色变成FFC。我们先来看html代码：
<pre lang="html">

*   love.2fool.cn
*   blog.2fool.cn
*   www.2fool.cn
*   work.2fool.cn</pre>
背景颜色的css我们使用以下的代码：
<pre lang="css">.highlight {
  background:#FFC;
}</pre>
我们使用下面的代码就可以轻松的实现高亮内容为[www.2fool.cn](http://js8.in)的效果啦
<pre lang="javascript">$("#t-myul-4 li:contains('www.2fool.cn')").addClass("highlight");</pre>
效果截图：[![Snap1](http://js8.in/wp-content/uploads/2009/12/Snap12.jpg "Snap1")](http://js8.in/wp-content/uploads/2009/12/Snap12.jpg)

### 总结

本文中断桥残雪简单的介绍了一些常用的jQuery的选择器，也有一些实例，希望可以帮助初学jQuery的童鞋尽快的掌握jQuery的选择器，对于jQuery的学习断桥残雪个人觉得还是要多看[jQuery文档](http://jquery-api-zh-cn.googlecode.com/svn/trunk/index.html)，并且多练习，多实践，多总结。