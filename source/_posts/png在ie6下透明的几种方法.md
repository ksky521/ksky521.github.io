title: "png在IE6下透明的几种方法"
id: 448
date: 2010-01-14 18:47:44
tags:
- css
- javascript
- 网络技术
categories:
- 前端开发
---
断桥残雪在《[IE6 PNG图片不透明问题的解决方法](http://js8.in/380.html IE6 PNG图片不透明问题的解决方法)》中提到了使用js来解决IE6下PNG图片不透明的问题，今天我总结一下png在IE6下透明的方法：**css方法**、**js方法**、**htc方法**。

png透明针对IE6一直是件挺麻烦的事情，使用的方法也是各有不同，大多的原理是用IE的滤镜来解决的。
语法：
filter : progid:DXImageTransform.Microsoft.AlphaImageLoader ( enabled=bEnabled , sizingMethod=sSize , src=sURL )

enabled : 可选项。布尔值(Boolean)。设置或检索滤镜是否激活。true | false true : 默认值。滤镜激活。
false : 滤镜被禁止。
sizingMethod : 可选项。字符串(String)。设置或检索滤镜作用的对象的图片在对象容器边界内的显示方式。 crop : 剪切图片以适应对象尺寸。
image : 默认值。增大或减小对象的尺寸边界以适应图片的尺寸。scale : 缩放图片以适应对象的尺寸边界。
src : 必选项。字符串(String)。使用绝对或相对 url 地址指定背景图像。假如忽略此参数，滤镜将不会作用。
现在一般在使用的方法有以下几种：
<!--more-->

### 1、css方法

**css**：
```css
.pngs {
height: 90px;width: 90px;
background-image:url(icon_home.png)!important;  /* FF IE7 */
background-repeat: no-repeat; _filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=’icon_home.png’);  /* IE6 */
_ background-image: none; /* IE6 */
}
```

**xhtml**：
```html
<div class=”pngs”></div>
```

这种方法的优点就是使用简单方便，但是不能作为背景，且只能用作单个png图片的使用。如果要作为背景，需要新增加一个div层，并设置其position:relative;
**css**：
```css
.png div{position:relative;}
```
**xhml**:

```html
<div class=’png’>
<div>
CSS 背景PNG透明 及 链接失效问题解决
</div>
</div>
```
这种方法可以使用在那些png图片不多，且不需要repeat的情况下。

### 2、js方法

```javascript
function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.
{
    var arVersion = navigator.appVersion.split(“MSIE”)
    var version = parseFloat(arVersion[1])
    if ((version >= 5.5) && (document.body.filters))
    {
       for(var j=0; j<document.images.length; j++)
       {
          var img = document.images[j]
          var imgName = img.src.toUpperCase()
          if (imgName.substring(imgName.length-3, imgName.length) == “PNG”)
          {
             var imgID = (img.id) ? “id=’” + img.id + “‘ ” : “”
             var imgClass = (img.className) ? “class=’” + img.className + “‘ ” : “”
             var imgTitle = (img.title) ? “title=’” + img.title + “‘ ” : “title=’” + img.alt + “‘ ”
             var imgStyle = “display:inline-block;” + img.style.cssText
             if (img.align == “left”) imgStyle = “float:left;” + imgStyle
             if (img.align == “right”) imgStyle = “float:right;” + imgStyle
             if (img.parentElement.href) imgStyle = “cursor:hand;” + imgStyle
             var strNewHTML = “<span ” + imgID + imgClass + imgTitle
             + ” style=\" + “width:” + img.width + “px; height:” + img.height + “px;” + imgStyle + “;”
             + “filter:progid:DXImageTransform.Microsoft.AlphaImageLoader”
             + “(src=\’” + img.src + “\’, sizingMethod=’scale’);\”></span>”
             img.outerHTML = strNewHTML
             j = j-1
          }
       }
    }    
}
window.attachEvent(“onload”, correctPNG);
```

这种js先判断是否IE，然后判断ie版本，版本在6.0下则判定函数，给png的图片添加滤镜。
使用起来的确方便，无论多少图片都可以解决，但是依然无法repeat。

### 3、htc方法

htc相当于完全通过插件的方法修复的IE6的bug，功能强大，支持repeat，背景等功能，使用起来也很方便。
使用一个**iepngfix.htc** 文件，和一个透明的gif文件。

使用方法：

```html

<!–[if lte IE 6]>
<style>.png{behavior:url(“iepngfix.htc”);}</style>  //在这里可以加入其他用到png图片的id或者class
<script type=”text/javascript” src=”iepngfix_tilebg.js”></script>
<![endif]–>
```

ps：如果需要repeat背景，往往需要设置这个div 宽度为100%。

关于**iepngfix.htc**的详细用法以及[Demo](http://www.twinhelix.com/css/iepngfix/demo/)，请[狂点此处](http://www.twinhelix.com/css/iepngfix/demo/)

### 总结

总结这几种方法，第三种方法（**htc方法**）是最简单实用，且容易推广的方法，建议可以做个公共的地址，有产品需要，只需要应用这个公共地址就行了。
