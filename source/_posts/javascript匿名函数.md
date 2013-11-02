title: "javascript匿名函数"
id: 722
date: 2011-08-03 05:47:48
tags:
- javascript
categories:
- 前端开发
---
今天在整理javascript入门培训的PPT时，提到了**匿名函数**，所以拿来分享下心得。

### 匿名函数的写法

顾名思义，就是没有名字的函数（⊙﹏⊙b汗）。匿名函数通常用于javascript作用域的控制，可以有效的避免对全局变量的污染。常见的匿名函数有下面四种写法，欢迎补充：

#### 匿名函数写法一


```javascript

(function(){
	//do something
})();```

#### 匿名函数写法二


```javascript

!function(){
	//do something
}();```
上面!还可以写成+，!!等多种方式。
上面两种方法是我常用的，下面两种方法是google上找的，我没用过（好吧，我out啦）。

#### 匿名函数写法三


```javascript

(function(){
	//do something
}());```

#### 匿名函数写法四


```javascript

void function(){
	//do something
}();
```
刚才微博上@朴灵 提出来：写法三比较安全，正如网友@Rain的留言，匿名函数上面的写法都存在前后文;问题，所以需要注意的是匿名函数在压缩工具打包压缩后会出现上下文错误合并()的问题，例如第一种写法，如果下面的代码，未压缩之前是正常的，压缩后就不正常了，所以要严格上下文的;问题，而第三种就不会出现类似问题：

```javascript

var a = function(){}
(function(){
	alert(1);
})();
```
上例中就出现了错误，这就是因为a函数会把他后面的匿名函数作为参数传入a中，这也就解释了为什么有人习惯在匿名函数之前添加;了，就是为了防止上文没有严格遵循javascript语法，漏掉;的问题。
<!--more-->

### 匿名函数的传参

匿名函数可以通过下面的方式进行传参：

```javascript

(function(win, doc){
	var $ = function(id){
		return doc.getElementById(id);
	}
	win.$ = $;
})(window, document);```

### 匿名函数的递归

匿名函数中要引用本身，需要使用`arguments.callee`，下面是使用匿名函数实现的连乘。

```javascript
(function(n){
	if(n <= 0){
		return 1;
	}else{
		return n * arguments.callee(n-1);
	}
})(4);
```