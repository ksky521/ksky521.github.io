title: "javascript的String.replace的妙用"
id: 894
date: 2011-11-08 03:33:54
tags:
- javascript
- 技巧
categories:
- 前端开发
---

作为**前端开发**人员，总会有点自己的奇技淫巧，毕竟前端开发不同于后端，代码全部暴漏给用户不说，代码冗余了少则影响带宽，多则效率降低。所以今天我也来爆个自己的奇技淫巧。

j**avascript**的String.replace方法应该javascript前端开发工程师都了解，可是你掌握了吗？

replace有接受两个参数，第一个参数可以是字符串，也可以是正则表达式，第二个参数除支持字符串之外，还支持`$1`形式正则匹配的文本，除此之外还支持传入一个处理函数，这个函数的`return`值就是要替换成的内容。
了解更多javascript的String.replace用法，访问：http://www.w3school.com.cn/js/jsref_replace.asp

### String.replace的妙用

在《javascript获取隐藏dom的宽高》中，我就使用了replace，使用replace做一些重复性的操作，减少不必要的代码。

其实这里说的重复性的工作就是循环！例如，我们要获取假如我要求id为div1和div2的两个元素的宽高，一部分人会一点一点的做，先算完div1的，然后做div2的，这样你是否觉得有部分是充分的操作呢，于是可以将取宽高的函数独立出来，这样多了一个函数，而且函数只用这两次，似乎有点浪费。

于是一部分人想到了使用split切分字符串，然后用Array.forEach做循环。例如下面的代码：
```javascript
"div1 div2".split(' ').forEach(function(a,i){
    console.log(a);
	//do something
})
```
<!--more-->
这样对于支持forEach的高级浏览器还是可以的，否则需要扩展数组原型了，不提倡扩展原型，即使不扩展原型提供个额外的函数来操作，就又是浪费，

所以我的做法是使用replace，代码如下：
```javascript
var wh = {};
"div1 div2".replace(/[^ ]+/g,function(a){
	var elem = document.getElementById(a);
        wh[a] = {};
	'Width Height'.replace(/[^ ]+/g, function(i){
			wh[a][i] = elem['offset' + i] || elem['client' + i];
		});
});
console.log(wh);
```

有人说不好懂，而且有点太……，对就是有点装B，呵呵~但是简洁，**前端开发**的代码还是简洁点好。另外还有通过位操作来判断`String.indexOf`返回的是否为`-1`，也是个不错的方法~呵呵，不多说了
