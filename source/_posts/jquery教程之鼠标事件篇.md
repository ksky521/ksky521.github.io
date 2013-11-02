title: "jQuery教程之鼠标事件篇"
id: 600
date: 2010-10-02 22:12:56
tags:
- javascript
- 网络技术
categories:
- 前端开发
---
jQuery除了**选择器**之外，还封装了很多事件的处理，比如**鼠标事件**，所谓的鼠标事件是指用户在移动鼠标光标或者点击任意鼠标键而触发的事件，jQuery中封装了几乎所有的鼠标事件，包括点击，双击，移出，移入等鼠标事件，下面断桥残雪简单的介绍下**jQuery的鼠标事件**

### jQuery的click事件

经典鼠标click的实例：

```javascript

$("sel").click(function(){
    alert('哈哈 !');
});
```

### jQuery的dbclick事件

一般dbclick事件的同时也会触发两次click事件。。以前我写过一篇博客简单的介绍了下[jQuery的鼠标双击事件](http://js8.in/610.html)

```javascript

$('p').dbclick(function(){
alert('鼠标双击!');
});
$('p').click(function(){
alert('点击了一下!');
});//大家看看结果是怎么样的？
```
<!--more-->

### jQuery的mousedown事件

mousedown就是在按下鼠标时触发的事件
$('p').mousedown(function(){
alert('按下了鼠标 !');
});```

### jQuery的mouseup事件

同上就是松开鼠标时候触发的事件,如果在于按下鼠标的相同元素上松开,那么也会触发click事件,mousedown和mouseup事件一般有在div拖拽等效果中

```javascript

$('p').mouseup(function(){
alert('鼠标起来了 !');
}).click(function(){
alert('点击了下鼠标!');
});```

### jQuery的mouseover事件

mouseover事件于用户把鼠标从一个元素移动到另外一个元素上时触发，如果需要知道来自那个元素可以使用，relatedTagrget属性

### jQuery的mouseout事件

mouseout事件于用户把鼠标移出一个元素时触发，这包括从父元素移动到子元素上，或者使用键盘跳到元素上。

### jQuery的mouseenter事件

和mouseover事件类似,但两者有区别

### jQuery的mouserleaver事件

同上和mouseout事件类似.

### hover事件

其实hover事件内部就是使用了mouseenter和mouseleaver事件,我们可以使用jQuery的hover这个函数来代替上面的两个函数

```javascript

$('p').hover(function(){
alert('这个function里放mouseenter 的事件!');
},function(){
alert('这里是mouseleaver function!');
});```

这里我们没有鼠标右键事件?其实使用jQuery的**mousedown**事件然后再函数里判断就OK了