title: "25大实用的jQuery技巧和解决方案"
id: 507
date: 2010-03-17 22:45:42
tags:
- javascript
categories:
- 前端开发
---
jQuery库的发展迅速（刚刚发布的jQuery的1.4），越来越多的人正在使用这个有用的JavaScript库。这意味着，需要越来越多的有用jQuery的提示，技巧和解决方案来提供。这就是为什么我创建了26个实用的jQuery的提示、技巧和解决方案的小清单。

### 1\. 去除页面的右键菜单


```javascript
$(document).ready(function(){  
    $(document).bind("contextmenu",function(e){  
        return false;  
    });  
});  
```

### 2、搜索输入框文字的消失

当鼠标获得焦点、失去焦点的时候，input输入框文字处理：

```javascript
$(document).ready(function() {  
$("input.text1").val("Enter your search text here");  
   textFill($('input.text1'));  
});  
  function textFill(input){ //input focus text function  
    var originalvalue = input.val();  
    input.focus( function(){  
        if( $.trim(input.val()) == originalvalue ){ input.val(''); }  
    });  
    input.blur( function(){  
        if( $.trim(input.val()) == '' ){ input.val(originalvalue); }  
    });  
}  ```

### 3、新窗口打开页面


```javascript
$(document).ready(function() {  
   //Example 1: Every link will open in a new window  
   $('a[href^="http://"]').attr("target", "_blank");  

   //Example 2: Links with the rel="external" attribute will only open in a new window  
   $('a[@rel$='external']').click(function(){  
      this.target = "_blank";  
   });  
});  ```
// how to use  

```html
[open link](http://www.opensourcehunter.com)  ```
<!--more-->

### 4、判断浏览器类型

注意： jQuery 1.4中$.support 来代替以前的$.browser 

```javascript
$(document).ready(function() {  
// Target Firefox 2 and above  
if ($.browser.mozilla && $.browser.version >= "1.8" ){  
    // do something  
}    
// Target Safari  
if( $.browser.safari ){  
    // do something  
}    
// Target Chrome  
if( $.browser.chrome){  
    // do something  
}    
// Target Camino  
if( $.browser.camino){  
    // do something  
}    
// Target Opera  
if( $.browser.opera){  
    // do something  
}    
// Target IE6 and below  
if ($.browser.msie && $.browser.version <= 6 ){  
    // do something  
}    
// Target anything above IE6  
if ($.browser.msie && $.browser.version > 6){  
    // do something  
}  
}); 
```

### 5、预加载图片


```javascript
$(document).ready(function() {  
jQuery.preloadImages = function()  
{  
  for(var i = 0; i<arguments.length; i++)="" {="" jquery("="">![]()").attr("src", arguments[i]);  
  }  
}  
// how to use  
$.preloadImages("image1.jpg");  
});  
</arguments.length;>  ```

### 6、轻松切换css样式


```javascript
$(document).ready(function() {  
    $("a.Styleswitcher").click(function() {  
        //swicth the LINK REL attribute with the value in A REL attribute  
        $('link[rel=stylesheet]').attr('href' , $(this).attr('rel'));  
    });  ```
// how to use  
// place this in your header  

```html

<link rel="stylesheet" href="default.css" type="text/css">  
// the links  
[Default Theme](#)  
[Red Theme](#)  
[Blue Theme](#)  
});  ```

### 7、高度相等的列

如果您使用两个CSS列，以此来作为他们完全一样的高度

```javascript
$(document).ready(function() {  
function equalHeight(group) {  
    tallest = 0;  
    group.each(function() {  
        thisHeight = $(this).height();  
        if(thisHeight > tallest) {  
            tallest = thisHeight;  
        }  
    });  
    group.height(tallest);  
}  
// how to use  
$(document).ready(function() {  
    equalHeight($(".left"));  
    equalHeight($(".right"));  
});  
}); ```

### 8、简单字体变大缩小


```javascript
$(document).ready(function() {  
  // Reset the font size(back to default)  
  var originalFontSize = $('html').css('font-size');  
    $(".resetFont").click(function(){  
    $('html').css('font-size', originalFontSize);  
  });  
  // Increase the font size(bigger font0  
  $(".increaseFont").click(function(){  
    var currentFontSize = $('html').css('font-size');  
    var currentFontSizeNum = parseFloat(currentFontSize, 10);  
    var newFontSize = currentFontSizeNum*1.2;  
    $('html').css('font-size', newFontSize);  
    return false;  
  });  
  // Decrease the font size(smaller font)  
  $(".decreaseFont").click(function(){  
    var currentFontSize = $('html').css('font-size');  
    var currentFontSizeNum = parseFloat(currentFontSize, 10);  
    var newFontSize = currentFontSizeNum*0.8;  
    $('html').css('font-size', newFontSize);  
    return false;  
  });  
}); ```

### 9、返回头部滑动动画


```javascript
$('a[href*=#]').click(function() {  
 if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')  
 && location.hostname == this.hostname) {  
   var $target = $(this.hash);  
   $target = $target.length && $target  
   || $('[name=' + this.hash.slice(1) +']');  
   if ($target.length) {  
  var targetOffset = $target.offset().top;  
  $('html,body')  
  .animate({scrollTop: targetOffset}, 900);  
    return false;  
   }  
  }  
  }); ```// how to use  
// place this where you want to scroll to 
```html
 
<a name="top"></a>  
// the link  
[go to top](#top)  ```

### 10、获取鼠标位置


```javascript
$().mousemove(function(e){  
     //display the x and y axis values inside the div with the id XY  
    $('#XY').html("X Axis : " + e.pageX + " | Y Axis " + e.pageY);  
  }); ```

### 11、判断一个元素是否为空


```javascript
if ($('#id').html()) {  
   // do something  
   }  ```

### 12、替换元素


```javascript
  $('#id').replaceWith(' 
<div>I have been replaced</div> 

');  ```

### 13、jquery timer 返回函数


```javascript
$(document).ready(function() {  
   window.setTimeout(function() {  
     // do something  
   }, 1000);  
});  ```

### 14、jquery也玩替换


```javascript
$(document).ready(function() {  
   var el = $('#id');  
   el.html(el.html().replace(/word/ig, ""));  
}); ```

### 15、判断元素是否存在


```javascript
$(document).ready(function() {  
   if ($('#id').length) {  
  // do something  
  }  
});  ```

### 16、让div也可以click


```javascript
 $("div").click(function(){  
      //get the url from href attribute and launch the url  
      window.location=$(this).find("a").attr("href"); return false;  
    });  ```// how to use  
```html

<div>[home](index.html)</div>  ```

### 17、使用jquery来判断浏览器大小添加不同的class


```javascript
$(document).ready(function() {  
   function checkWindowSize() {  
    if ( $(window).width() > 1200 ) {  
        $('body').addClass('large');  
    }  
    else {  
        $('body').removeClass('large');  
    }  
   }  
$(window).resize(checkWindowSize);  
}); ```

### 18、几个字符就clone！


```javascript
 var cloned = $('#id').clone()```

### 19、设置div在屏幕中央


```javascript
$(document).ready(function() {  
  jQuery.fn.center = function () {  
      this.css("position","absolute");  
      this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");  
      this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");  
      return this;  
  }  
  $("#id").center();  
}); ```

### 20、创建自己的选择器


```javascript
$(document).ready(function() {  
   $.extend($.expr[':'], {  
       moreThen1000px: function(a) {  
           return $(a).width() > 1000;  
      }  
   });  
  $('.box:moreThen1000px').click(function() {  
      // creating a simple js alert box  
      alert('The element that you have clicked is over 1000 pixels wide');  
  });  
}); ```

### 21、计算元素的数目


```javascript
$(document).ready(function() {  
   $("p").size();  
});  ```

### 22、设置自己的li样式


```javascript
$(document).ready(function() {  
   $("ul").addClass("Replaced");  
   $("ul > li").prepend("‒ ");  
 // how to use  
 ul.Replaced { list-style : none; }  
}); ```

### 23、使用google的主机来加载jquery库


```html<script src="http://www.google.com/jsapi"></script>  
<script type="text/javascript">  
google.load("jquery", "1.2.6");  
google.setOnLoadCallback(function() {  
    // do something  
});  
</script><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js" type="text/javascript"></script>  

 // Example 2:(the best and fastest way)  
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>  
```

### 24、关闭jquery动画效果


```javascript
$(document).ready(function() {  
    jQuery.fx.off = true;  
});  
```

### 25、使用自己的jquery标识


```javascript
$(document).ready(function() {  
   var $jq = jQuery.noConflict();  
   $jq('#id').show();  
});  ```

原文地址：[26 cool and useful jQuery tips, tricks &amp; solutions](http://www.opensourcehunter.com/2010/02/27/26-cool-and-usefull-jquery-tips-tricks-solutions/)
