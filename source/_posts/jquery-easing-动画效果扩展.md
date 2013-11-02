title: "jQuery Easing 动画效果扩展"
id: 451
date: 2010-01-15 18:21:10
tags:
- javascript
categories:
- 前端开发
---
最近**断桥残雪部落格**的[首页](http://js8.in "断桥残雪部落格首页")文章添加了“点击展开/关闭”文章功能，并且返回顶部、跳到评论等功能进行了动画效果的修改，此次修改使用了jQuery Easing动画效果扩展插件：[jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/ "jQuery Easing动画效果插件")。在jQuery文档中我们可以看到，自定义动画函数**.animate()**有四个参数：
> **params **(Options) : 一组包含作为动画属性和终值的样式属性和及其值的集合
> ** duration** (String,Number) : (可选) 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000)
> ** easing** (String) : (可选) 要使用的擦除效果的名称(需要插件支持).默认jQuery提供"linear" 和 "swing".
> ** callback** (Function) : (可选) 在动画完成时执行的函数
其中参数**easing**默认有两个效果：“linear”和“swing”，如果需要更多就要插件支持了，也就是今天断桥残雪要跟大家分享的插件：[jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/ "jQuery Easing动画效果插件").

在jQuery Easing中设置了easeInElastic、easeOutElastic、easeInOutElastic等共31中不同的效果，应该可以满足大家的需要啦，如果你还想研究下动画移动的效果图，还可以看一下[这篇文章](http://james.padolsey.com/demos/jquery/easing/)不仅有动画演示，还有图片分析。<!--more-->

### 引入Easing js文件

要使用jQuery Easing扩展，首先我们要在jQuery之后，引入jQuery Easing Plugin文件，如以下代码
> 
```html"><script type="text/javascript" src="http://js8.in/mywork/jquery_easing/easing.js

> </script>
> ```

### jQuery Easing简单教程

**方法1**、设置jQuery默认动画效果

jQuery.easing.def = "method";//如：easeOutExpo

**方法2**、jQuery默认动画

支持toggle()、slideUp()、slideDown()、show()、hide()等jQuery内置的动画效果

如以下代码：> 
```javascript
$(element).slideUp({
> 	duration: 1000, 
> 	easing: method, 
> 	complete: callback});
> ```

**方法3**、使用jQuery自定义动画函数**.animate()**

jQuery 的**.animate()**是自定义动画的函数，如上面所说，有四个参数，而其中**easing**的参数就是我们进行动画效果扩展的方法名称（如easeOutExpo）。最简单的使用方法是：> 
```javascript
$(myElement).animate({
>     left: 500,
>     top: 500
> }, 'easeOutExpo');
> ```上面的代码就是实现的动画之后以easeOutExpo的方法来进行缓冲（easing），这是animate() easing的基本用法（[点击查看此效果演示DEMO](http://js8.in/mywork/jquery_easing/demo.html)）

[James Padolsey](http://james.padolsey.com)对jQuery1.3.2的**animate**函数进行了修改扩展：> 
```javascript

> jQuery.fn.animate = (function(_anim){
>     var jQEasing = jQuery.easing;
>     return function(prop, duration, easing, callback) {
>         var props = {}, optall, i, hasEaser = false;
>         for ( i in prop ) {
>             if ( jQuery.isArray(prop[i]) ) {
>                 hasEaser = true;
>                 props[i] = prop[i][1];
>                 prop[i] = prop[i][0];
>             }
>         }
>         opt = jQuery.speed(duration, easing, callback);
>         if (hasEaser) {
>             opt.step = (function(_step){
>                 return function(now, fx) {
>                     var end = fx.end, easeFn;
>                     if ( easeFn = props[fx.prop] ) {
>                         fx.now = jQEasing[easeFn]( now/end, now, 0, end, end );
>                     }
>                     _step && _step.call( fx.elem, fx.now, fx );
>                 };
>             })(opt.step);
>         }
>         opt.complete = opt.old || callback || jQuery.isFunction(easing) && easing;
>         return _anim.call( this, prop, opt );
>     };
> })(jQuery.fn.animate);```

在**jQuery1.4**中这种方式已经[被引入](http://github.com/jquery/jquery/commit/93fdbeb963a9c350f807818c7cc99982942a92f3)，所以jQuery1.4中不需要添加jQuery的**animate()**扩展，我们就可以使用下面的更加方便代码啦：
> 
```javascript
$(myElement).animate({
>     left: 500,
>     top: [500, 'easeOutBounce'] 
> }, 1000,'swing');
> ```
上面的代码的效果是，总体上来使用swing的方法来缓冲，而top的时候采用easeOutBounce的方法来缓冲。（[点击查看此效果演示DEMO](http://js8.in/mywork/jquery_easing/demo2.html)）

### jQuery1.4 的animate()+Easing

值得一提的是[jQuery 1.4版本](http://js8.in/449.html "jQuery1.4正式版发布")中对animate()方法，easing的方法进行了扩展，英语不错的童鞋，可以[点击此处](http://james.padolsey.com/javascript/easing-in-jquery-1-4a2/)
> 
```javascript
jQuery(myElement).animate({
>     left: [500, 'swing'],
>     top: [200, 'easeOutBounce']
> });
> ```
或者：
> 
```javascript
jQuery(myElement).animate({
>     left: 500,
>     top: 200
> }, {
>     specialEasing: {
>         left: 'swing',
>         top: 'easeOutBounce'
>     }
> });
> ```
有了上面的Easing扩展效果，已经能够满足了我们日常的动画要求了，**jQuery1.4正式版**也已经发布，添加了很多新的方法函数，但是很多新方法的研究还没有跟入，期待jQuery1.4的新中文文档！