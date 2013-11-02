title: "IE6中a标签location.href失效解决方法"
id: 706
date: 2011-07-20 07:00:51
tags:
- javascript
categories:
- 前端开发
---
今天遇见IE6一个**location.href**的bug，具体情况是这样的，IE6下，在a标签中，将href写成`javascript:;``javascript:void(0);`，并且给这个标签绑定onclick事件，点击后，执行location.href实现页面跳转，例如下面的代码：

```html
[点击跳转](javascitp:;)```
或者

```html

[点击跳转](javascitp:void(0);)
```
toURL函数的代码如下所示：

```javascript
function toURL(){
	location.href = "http://js8.in";
}
```
这样在非IE6浏览器下都可以使用，但是在IE6下就是跳转不了，而且不报错，在location.href之后的代码，例如（alert(1);）也是执行的。

### IE6下location.href失效解决的方法

解决IE6中a标签中location.href失效的方式就是a标签中的href不用使用`javascript:;`或`javascript:void(0);`。具体原因还不清楚，不过我们可以使用href="#"来代替。
<!--more-->
例如下面的代码在IE6中是正常的：

```html

[正常的跳转](###)```

还有一种方式就是，在toURL函数里面将a标签的href通过setAttribute设置为“#”，然后再使用location.href跳转也是可以的。

另外可以通过获取DOM节点，然后绑定onclick事件的方式，也是可以解决上面的问题的，例如下面的代码：

```javascript

var as = document.getElementsByTagName('a');
for (var i=0;i<as.length;i++) {
    as[i].onclick=function() {
          window.location.href="http://js8.in";
         return false;
    }
}
```

### 写在最后

IE6——前端的噩梦还在继续。
对于IE6真的不想说什么了，本小站已经不在支持IE6了，希望IE6尽快的退出历史舞台。
<embed src="http://www.tudou.com/v/8nmFnHVLFWs/v.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" width="480" height="400"></embed>