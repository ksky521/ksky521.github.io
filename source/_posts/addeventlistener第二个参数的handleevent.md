title: "addEventListener第二个参数的handleEvent"
id: 983
date: 2012-03-07 18:48:17
tags:
- handleEvent
- event
categories:
- 前端开发
---

昨天无意中看到一篇[老外的文章](http://peter.michaux.ca/articles/our-backwards-dom-event-libraries)，文章提到了**addEventListener**第二个参数可以传入object，并且对象中handleEvent为事件处理函数。例如下面的javascript代码：

```javascript
var obj = {
    handleEvent: function() {
        alert('body clicked');
    }
};
document.body.addEventListener('click',obj,false);
```

测试发现这段代码在IE9+，chrome，FF，opera等浏览器是正确的（测试范围可能不够宽），而且可以成功的绑定click事件。在Qwrap群里一问才知道是[DOM2中接口](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener)，很有意思的一个发现，[@貘大大](http://weibo.com/itapir) 也发微博说自己先入为主了，我相信很多人跟[@貘大大](http://weibo.com/itapir) 一样都先入为主了。

## addEventListener的handleEvent应用

发现了这个“新大陆”有什么用法呢？哈哈~首先想到的是对象引用。

看下面的javascript代码：

```html
<script type="text/javascript">
var obj = {
handleEvent: function() {
    alert('body clicked');
}
};
document.body.addEventListener('click',obj,false);
function fn2(){
    obj.handleEvent = function(){
        alert('fn2');
    };
}
</script>
<button onclick="fn2();">change</button>
```

因为对象的引用关系，点击下button就可以切换绑定事件的处理函数，而不需要remove之前的事件，然后重新绑定一个新的处理函数。
<!--more-->
如果你觉得这个不够炫，那么下面的javascript代码可能就更有吸引力了哦~
```javascript
var obj2 = {
    addEvent:function(el){
        el.addEventListener('click',this,false);
    },
    handleEvent:function(e){
        alert(e.target);
    }
};
obj2.addEvent(document.body);
```

## addEventListener handleEvent缺点

显而易见，IE6~IE8不能使用……可是如果是高级浏览器还是不错的功能哦~

### 扩展阅读

* http://peter.michaux.ca/articles/our-backwards-dom-event-libraries
* http://ajaxian.com/archives/an-alternative-way-to-addeventlistener
