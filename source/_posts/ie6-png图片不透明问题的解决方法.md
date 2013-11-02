title: "IE6 PNG图片不透明问题的解决方法"
id: 380
date: 2009-12-18 02:16:33
tags:
- javascript
- 网络技术
categories:
- 前端开发
---
IE6真是前端开发人员的噩梦，就像[刘洋](http://oncoding.cn)说的:IE6一次又一次的阻碍了互联网的发展。在前几天开发的[WordPress天气预报插件](http://js8.in/wordpress-weather)中使用的图片都是png格式的透明图片，由于png格式的图片比较漂亮美观，可是在**IE6**中png的透明效果是没有的，这样子本来设计很漂亮的页面在IE6就歇菜了，让人感觉很不爽~本文使用js的方法来解决IE6下**PNG图片不透明**的问题，简单实用。[更多解决方法点击此处](http://js8.in/448.html "png在IE6下透明的几种方法")。

如果我们在页面中使用的透明PNG图片不是很多，可以使用下面的代码来解决问题：
> 
```javascript
function setPng(img, w, h){
>                 ua = window.navigator.userAgent.toLowerCase();
>                 if (!/msie/.test(ua))
>                     return;
>                 imgStyle = "display:inline-block;" + img.style.cssText;
>                 strNewHTML = "";
>                 img.outerHTML = strNewHTML;
> }```
> 使用方法，在img上添加onload="setPng(this,宽度,高度)"，如&lt;img onload="setPng(this,98,78)" src="" /&gt;
如果您觉得这样的方法比较麻烦，或者页面中使用的**透明png图片**比较多如果手动添加很不方便的时候，可是使用下面的代码来解决问题。
<!--more-->
> 把把以下代码保存为png.js ：
> 
```javascript
function correctPNG()
> {
>  for(var i=0; i<document.images.length; i++)
>  {
>  var img = document.images[i]
>  var imgName = img.src.toUpperCase()
>  if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
>  {
>  var imgID = (img.id) ? "id='" + img.id + "' " : ""
>  var imgClass = (img.className) ? "class='" + img.className + "' " : ""
>  var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
>  var imgStyle = "display:inline-block;" + img.style.cssText
>  if (img.align == "left") imgStyle = "float:left;" + imgStyle
>  if (img.align == "right") imgStyle = "float:right;" + imgStyle
>  if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
>  var strNewHTML = "&lt;span " + imgID + imgClass + imgTitle
>  + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
>  + "filter:progid:**DXImageTransform.Microsoft.AlphaImageLoader**"
>  + "(src=\'" + img.src + "\', sizingMethod='scale');\"&gt;&lt;/span&gt;"
>  img.outerHTML = strNewHTML
>  i = i-1
>  };
>  };
> }; 
> 
> if(navigator.userAgent.indexOf("MSIE")&gt;-1)
> {
> window.attachEvent("onload", correctPNG);
> };```
> 在网页的head内加入以下html代码：
> 
> &lt;script  type="text/javascript" src="png.js" &gt;&lt;/script&gt;
> 如果不喜欢这种方式，也可以使用[CSS hack中的**[if IE 6]**](http://js8.in/381.html)条件注释来区分**IE6**跟其他的浏览器，详情点击《[使用if IE hack注释解决CSS以及JS的兼容问题](http://js8.in/381.html)》