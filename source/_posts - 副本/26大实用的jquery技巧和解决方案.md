title: "25大实用的jQuery技巧和解决方案"
id: 507
date: 2010-03-17 22:45:42
tags: 
categories: 
- JavaScript
---

jQuery库的发展迅速（刚刚发布的jQuery的1.4），越来越多的人正在使用这个有用的JavaScript库。这意味着，需要越来越多的有用jQuery的提示，技巧和解决方案来提供。这就是为什么我创建了26个实用的jQuery的提示、技巧和解决方案的小清单。

### 1\. 去除页面的右键菜单

> <pre lang="javascript">$(document).ready(function(){  
>     $(document).bind("contextmenu",function(e){  
>         return false;  
>     });  
> });  
> </pre>

### 2、搜索输入框文字的消失

当鼠标获得焦点、失去焦点的时候，input输入框文字处理：
> <pre lang="javascript">$(document).ready(function() {  
> $("input.text1").val("Enter your search text here");  
>    textFill($('input.text1'));  
> });  
>   function textFill(input){ //input focus text function  
>     var originalvalue = input.val();  
>     input.focus( function(){  
>         if( $.trim(input.val()) == originalvalue ){ input.val(''); }  
>     });  
>     input.blur( function(){  
>         if( $.trim(input.val()) == '' ){ input.val(originalvalue); }  
>     });  
> }  </pre>

### 3、新窗口打开页面

> <pre lang="javascript">$(document).ready(function() {  
>    //Example 1: Every link will open in a new window  
>    $('a[href^="http://"]').attr("target", "_blank");  
> 
>    //Example 2: Links with the rel="external" attribute will only open in a new window  
>    $('a[@rel$='external']').click(function(){  
>       this.target = "_blank";  
>    });  
> });  </pre>
> // how to use  
> <pre lang='html'>[open link](http://www.opensourcehunter.com)  </pre>
<!--more-->

### 4、判断浏览器类型

注意： jQuery 1.4中$.support 来代替以前的$.browser 
> <pre lang="javascript">$(document).ready(function() {  
> // Target Firefox 2 and above  
> if ($.browser.mozilla && $.browser.version >= "1.8" ){  
>     // do something  
> }    
> // Target Safari  
> if( $.browser.safari ){  
>     // do something  
> }    
> // Target Chrome  
> if( $.browser.chrome){  
>     // do something  
> }    
> // Target Camino  
> if( $.browser.camino){  
>     // do something  
> }    
> // Target Opera  
> if( $.browser.opera){  
>     // do something  
> }    
> // Target IE6 and below  
> if ($.browser.msie && $.browser.version <= 6 ){  
>     // do something  
> }    
> // Target anything above IE6  
> if ($.browser.msie && $.browser.version > 6){  
>     // do something  
> }  
> }); 
> </pre>

### 5、预加载图片

> <pre lang="javascript">$(document).ready(function() {  
> jQuery.preloadImages = function()  
> {  
>   for(var i = 0; i<arguments.length; i++)="" {="" jquery("="">![]()").attr("src", arguments[i]);  
>   }  
> }  
> // how to use  
> $.preloadImages("image1.jpg");  
> });  
> </arguments.length;>  </pre>

### 6、轻松切换css样式

> <pre lang="javascript">$(document).ready(function() {  
>     $("a.Styleswitcher").click(function() {  
>         //swicth the LINK REL attribute with the value in A REL attribute  
>         $('link[rel=stylesheet]').attr('href' , $(this).attr('rel'));  
>     });  </pre>
> // how to use  
> // place this in your header  
> <pre lang='html'>
> <link rel="stylesheet" href="default.css" type="text/css">  
> // the links  
> [Default Theme](#)  
> [Red Theme](#)  
> [Blue Theme](#)  
> });  </pre>

### 7、高度相等的列

如果您使用两个CSS列，以此来作为他们完全一样的高度
> <pre lang="javascript">$(document).ready(function() {  
> function equalHeight(group) {  
>     tallest = 0;  
>     group.each(function() {  
>         thisHeight = $(this).height();  
>         if(thisHeight > tallest) {  
>             tallest = thisHeight;  
>         }  
>     });  
>     group.height(tallest);  
> }  
> // how to use  
> $(document).ready(function() {  
>     equalHeight($(".left"));  
>     equalHeight($(".right"));  
> });  
> }); </pre>

### 8、简单字体变大缩小

> <pre lang="javascript">$(document).ready(function() {  
>   // Reset the font size(back to default)  
>   var originalFontSize = $('html').css('font-size');  
>     $(".resetFont").click(function(){  
>     $('html').css('font-size', originalFontSize);  
>   });  
>   // Increase the font size(bigger font0  
>   $(".increaseFont").click(function(){  
>     var currentFontSize = $('html').css('font-size');  
>     var currentFontSizeNum = parseFloat(currentFontSize, 10);  
>     var newFontSize = currentFontSizeNum*1.2;  
>     $('html').css('font-size', newFontSize);  
>     return false;  
>   });  
>   // Decrease the font size(smaller font)  
>   $(".decreaseFont").click(function(){  
>     var currentFontSize = $('html').css('font-size');  
>     var currentFontSizeNum = parseFloat(currentFontSize, 10);  
>     var newFontSize = currentFontSizeNum*0.8;  
>     $('html').css('font-size', newFontSize);  
>     return false;  
>   });  
> }); </pre>

### 9、返回头部滑动动画

> <pre lang="javascript">$('a[href*=#]').click(function() {  
>  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')  
>  && location.hostname == this.hostname) {  
>    var $target = $(this.hash);  
>    $target = $target.length && $target  
>    || $('[name=' + this.hash.slice(1) +']');  
>    if ($target.length) {  
>   var targetOffset = $target.offset().top;  
>   $('html,body')  
>   .animate({scrollTop: targetOffset}, 900);  
>     return false;  
>    }  
>   }  
>   }); </pre>// how to use  
> // place this where you want to scroll to <pre lang='html'> 
> <a name="top"></a>  
> // the link  
> [go to top](#top)  </pre>

### 10、获取鼠标位置

> <pre lang="javascript">$().mousemove(function(e){  
>      //display the x and y axis values inside the div with the id XY  
>     $('#XY').html("X Axis : " + e.pageX + " | Y Axis " + e.pageY);  
>   }); </pre>

### 11、判断一个元素是否为空

> <pre lang="javascript">if ($('#id').html()) {  
>    // do something  
>    }  </pre>

### 12、替换元素

> <pre lang="javascript">  $('#id').replaceWith(' 
> <div>I have been replaced</div> 
> 
> ');  </pre>

### 13、jquery timer 返回函数

> <pre lang="javascript">$(document).ready(function() {  
>    window.setTimeout(function() {  
>      // do something  
>    }, 1000);  
> });  </pre>

### 14、jquery也玩替换

> <pre lang="javascript">$(document).ready(function() {  
>    var el = $('#id');  
>    el.html(el.html().replace(/word/ig, ""));  
> }); </pre>

### 15、判断元素是否存在

> <pre lang="javascript">$(document).ready(function() {  
>    if ($('#id').length) {  
>   // do something  
>   }  
> });  </pre>

### 16、让div也可以click

> <pre lang="javascript"> $("div").click(function(){  
>       //get the url from href attribute and launch the url  
>       window.location=$(this).find("a").attr("href"); return false;  
>     });  </pre>// how to use  <pre lang='html'>
> <div>[home](index.html)</div>  </pre>

### 17、使用jquery来判断浏览器大小添加不同的class

> <pre lang="javascript">$(document).ready(function() {  
>    function checkWindowSize() {  
>     if ( $(window).width() > 1200 ) {  
>         $('body').addClass('large');  
>     }  
>     else {  
>         $('body').removeClass('large');  
>     }  
>    }  
> $(window).resize(checkWindowSize);  
> }); </pre>

### 18、几个字符就clone！

> <pre lang="javascript"> var cloned = $('#id').clone()</pre>

### 19、设置div在屏幕中央

> <pre lang="javascript">$(document).ready(function() {  
>   jQuery.fn.center = function () {  
>       this.css("position","absolute");  
>       this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");  
>       this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");  
>       return this;  
>   }  
>   $("#id").center();  
> }); </pre>

### 20、创建自己的选择器

> <pre lang="javascript">$(document).ready(function() {  
>    $.extend($.expr[':'], {  
>        moreThen1000px: function(a) {  
>            return $(a).width() > 1000;  
>       }  
>    });  
>   $('.box:moreThen1000px').click(function() {  
>       // creating a simple js alert box  
>       alert('The element that you have clicked is over 1000 pixels wide');  
>   });  
> }); </pre>

### 21、计算元素的数目

> <pre lang="javascript">$(document).ready(function() {  
>    $("p").size();  
> });  </pre>

### 22、设置自己的li样式

> <pre lang="javascript">$(document).ready(function() {  
>    $("ul").addClass("Replaced");  
>    $("ul > li").prepend("‒ ");  
>  // how to use  
>  ul.Replaced { list-style : none; }  
> }); </pre>

### 23、使用google的主机来加载jquery库

> <pre lang="html"><script src="http://www.google.com/jsapi"></script>  
> <script type="text/javascript">  
> google.load("jquery", "1.2.6");  
> google.setOnLoadCallback(function() {  
>     // do something  
> });  
> </script><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js" type="text/javascript"></script>  
> 
>  // Example 2:(the best and fastest way)  
> <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>  </pre>

### 24、关闭jquery动画效果

> <pre lang="javascript">$(document).ready(function() {  
>     jQuery.fx.off = true;  
> });  </pre>

### 25、使用自己的jquery标识

> <pre lang="javascript">$(document).ready(function() {  
>    var $jq = jQuery.noConflict();  
>    $jq('#id').show();  
> });  </pre>

原文地址：[26 cool and useful jQuery tips, tricks &amp; solutions](http://www.opensourcehunter.com/2010/02/27/26-cool-and-usefull-jquery-tips-tricks-solutions/)