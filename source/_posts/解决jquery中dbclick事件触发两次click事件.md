title: "解决jQuery中dbclick事件触发两次click事件"
id: 610
date: 2010-09-26 16:40:37
tags:
- javascript
categories:
- 前端开发
---
在jQuery事件绑定中，dbclick可以触发两次click事件。例如一个DOM元素div，既绑定了 **click **事件，又绑定了 dblclick 事件，这两个事件分别要做独立的事情。事件处理上没有冲突，都可以各自完成各自的操作。双击的时候虽然是执行了 **dblclick **事件，但是在这之前，也执行了click 事件，那么，如何来禁止或者说屏蔽这次多余的 click 事件呢？本文将提供给您一个比较好的解决办法。

### 产生原理分析

　　首先，来了解一下点击事件发生的先后顺序：

单击：mousedown, mouseup, click
双击：mousedown, mouseup, click, mousedown, mouseup, click, dblclick
　　由此看来，dblclick 事件发生之前，实际上发生了两次 click 事件。其中，第一次的 click 是会被屏蔽掉，但是第二次则不会，所以就出现在双击的时候，也触发 click 事件。
<!--more-->

### 解决办法

　　知道了原因，接下来自然就是想办法把这次 click 给屏蔽掉，但是由于各浏览器均未提供直接去停止事件的方法，所以值得改变思路。
　　由于我们只需要屏蔽一次 click 事件即可，由此联想到，可以利用 setTimeout() 方法来延时完成 click 事件的处理，在需要停止 click 的时候利用 `clearTimeout()` 方法停止这一事件的处理。这样，就可以比较容易的写出如下的 javascript 代码：

```javascript
var timer = null; function do_click(event) {
 clearTimeout(timer); // 这里加一句是为了兼容 Gecko 的浏览器 /
if (event.detail == 2) 
return ; 
// 同上句的作用 
timer = setTimeout(function() { 
// click 事件的处理 
}, 300); } 
function do_dblclick(event) { 
clearTimeout(timer);
 // dblclick 事件的处理 
}```

### 问题总结

　　从测试结果来看，如果前后两次点击的时间在 300ms 左右的时候，还是很容易出现 click 和 dblclick 事件被“同时”调用的情况，而如果间隔的时间更短或更长，则只会有 click 或 dblclick 事件。
　　所以，应该说这个方法已经在很大程度上，避免了 click 和 dblclick 事件的“同时”存在问题。当然，它还没有达到完全解决的程度。

### 注意

windows 的控制面板里是可以调鼠标的双击速度的（Linux 等系统下能不能调，俺就不清楚了），这点对于程序还是有一定影响，大家可以自己调节下试试看～
经过测试，延时 300ms 是一个比较理想的事件，既考虑到对鼠标操作并不十分顺利的朋友，也兼顾 click 事件的响应速度
以上代码，只在 IE6、FF3、Chrome 中测试过，并未出现问题

w3c标准是没有dblclick的，而是通过event.detail来判断是单击或双击