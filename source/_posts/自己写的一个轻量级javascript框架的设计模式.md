title: "自己写的一个轻量级javascript框架的设计模式"
id: 677
date: 2011-03-14 01:15:39
tags:
- javascript
categories:
- 前端开发
---
公司一直使用jQuery框架，一些小的项目还是觉得jQuery框架太过于强大了，于是自己周末有空琢磨着写个自己的框架。谈到js的设计模式，不得不说说js的类继承机制，javascript不同于PHP可以轻松的实现类继承，不过javascript的类继承方法还是有的，常见的有构建函数、原型扩展、综合……，也有一些专门写类的函数，例如jQuery的作者有个类继承函数。关于类继承写法可以简单看看[这篇文章](http://kevlindev.com/tutorials/javascript/inheritance/index.htm)。

我自己写的框架也不知道叫什么名字，刚开始写的时候随手写了个W（姓拼音，之前写过jQuery弹出框插件[wBox](http://js8.in/wbox-jquery)），现在写这篇文章重新整理了一下思想，换了YQ（名字拼音，你懂的~）。

### 核心代码

框架设计的时候尽量做到了支持链式写法，也就是返回`this`，可以$(selector).handler1().handler2()……无限写下去，只要不是有返回值的就可以继续。包括了event，dom，css，还有fadeIn，fadeOut动画（因为再重构[爱墙](http://love.js8.in)[html5+css3]版，所有顺手加上了这个功能）。如果配合sizzle选择器就更牛了！

下面说说框架的核心代码，等完善了之后跟新版html5爱墙一起放出，主要的代码如下：
<!--more-->

```javascript

(function(window,document){
	var DOC = document,YQ = window.$ = function(selector){
		if(!selector){
			return YQ.elems
		}
		typeof selector === 'string' && (selector = getElements(selector));//简单的判断是dom对象，还是字符串，字符串则开始选择器
		return superElems(selector);
	}
	function superElems(elems){
		if(elems){
			if(elems.nodeType){//判断是否为DOM
				if(typeof elems.getAttribute !=="unknown"){
					var temp = elems;
					elems = [];
					elems[0] = temp;//把本身作为超级对象的第一个，其他方法进行扩展
					for(var i in YQ.elems){
						//扩展对象，保留已有的方法
						typeof elems[i] === "undefined" && (elems[i] = YQ.elems[i])
					}
				}
			}else{//如果为对象，则对对象进行扩展
				elems = YQ.extend(elems,YQ.elems);
			}
		}
		return elems;
	}
	function getElements(selector){
		//伟大的选择器，可以使用sizzle
		var dom = DOC.getElementById(selector);//……
		return dom;
	}
	YQ.tool = {
		isFunction:function(obj){//简单的判断是否为函数
			return obj && typeof obj ==="function";
		}
	}
	//此处为超级对象一些扩展
	YQ.elems = {
		each:function(dom,callback){//强大的each
			if(YQ.tool.isFunction(dom)){
				arguments.callee.call(this,this,dom);
			}else{
				for (var i = 0, len = dom.length; i < len; i++) {
					callback.call(dom, i, dom[i]);
				}
			}
			return this;
		},
		find:function(selector){
			var doms = [];
			this.each(function(i,dom){
				doms.push(YQ.DOM.find(selector,dom));
			})
			return superElems(doms);
		}
	}
	YQ.each = window.Array.prototype.each = YQ.elems.each;//扩展Array
	YQ.extend = function(subClass,baseClass){
		for(var i in baseClass){
			subClass[i] = baseClass[i];
		}
		return subClass;
	}
	YQ.AJAX = {}
	YQ.CSS = {
		names:{
			'float':'cssFloat',//区分cssFloat or styleFloat
			opacity:'opacity'
			//……
		}
	}
	YQ.browser = {
		isIE:'',
		isFirefox:'',
		version:'3.6'
		//……
	}
	YQ.event = {
		names:{
			mousewheel:YQ.browser?"DOMMouseScroll":"mousewheel"
		},
		fix:function(e){
			if(e && e.clone) return e;//如果已经处理了，直接返回
			e = window.event || e;//event是全局变量
			var fixE = {
				clone:true,
				stop:function(){//冒泡
					if(e&&e.stopPropagation){
						e.stopPropagation();
					}else{
						e.cancleBubble = true
					}
				},
				prevent:function(){//默认动作
					if(e && e.preventDefault){
						e.preventDefault();
					}else{
						e.returnValue = false;
					}
				},
				target:e.target || e.srcElement,
				x:e.clientX || e.pageX,
				Y:e.clientY || e.pageY,
				//鼠标滚轮事件统一处理
				wheel:e.wheelDelta/120 || -e.detail/3
			}
			return fixE;
		}
	}
	YQ.DOM = {
		find:function(selector,parentDom){
			//do something
		}
	}
})(window,document);
```

### 简单的分析

代码中的注释还算详细，结合注释就可以看懂，下面我再啰嗦几句，高手飘过，欢迎拍砖……
总得来看是个匿名函数，定义了全局变量$（似乎都喜欢美元，如果有喜欢的人民币的，下次加上），函数里面有个YQ的对象，有很多function，包括一些私有的。

使用$可以作为选择器，如果为空，则返回YQ.elems对象，选择后的DOM根据YQ.elems进行扩展，最后得到的就是注释里面说的superElems（此处创建superElems方法参考了下jRaiser），跟jQuery的superElems类似，绑定了很多方法，可以方便的进行操作，YQ的方法可以通过YQ.elems扩展到选择器选择的对象上去，而选择器主要的函数getElements，可以使用sizzle，这样就方便了dom操作，不过sizzle似乎也是代码太多，此处将来会支持简单的标签,#ID,.class,标签+class选择器。

另外框架中中对一些Array，string进行了扩展，例如上面的Array.each方法，YQ.elems.each是重量级的函数方法，可以支持superElems的遍历（返回本身），还可以支持简单数组的遍历。

框架中还对一些兼容性进行了处理，例如YQ.event.fix处理事件，css中处理float

基本就这些了，今天就先说核心的部分，其实通过这段代码已经很清晰的了解到这个框架的思想了，后续继续给力的coding，补充扩展……
目前为止，框架不到800行代码，包括了常见的jQuery方法，压缩后不到9k，gzip 4.5K~

### 写在最后

本想写一系列的文章，可是敲了几个字又不知道说啥，今后学习下司徒正美追求短小精悍的博文~呵呵