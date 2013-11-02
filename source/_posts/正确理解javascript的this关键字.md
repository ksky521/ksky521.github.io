title: "正确理解javascript的this关键字"
id: 851
date: 2011-10-24 16:55:30
tags:
- this
- javascript
categories:
- 前端开发
---

javascript有`this`关键字，this跟**javascript**的执行上下文密切相关，很多前端开发工程师至今对this关键字还是模棱两可，本文将结合代码讲解下javascript的**this关键字**。

## this和对象的关系

首先来看下面的代码：

```javascript
var person = {
	name:'Theo Wong',
	gender:'male',
	getName:function(){
		console.log(person.name);
	}
};
person.getName();
```

定义了一个person对象，对象中包含了name、gender属性，还包括了一个getName的方法，其作用是输出person对象的name。在这种情况下，我们可以使用this来在person对象中代替person对象本身，所以上面的代码跟下面的直接结果是一样的：

```javascript
var person = {
	name:'Theo Wong',
	gender:'male',
	getName:function(){
		console.log(this.name);
	}
};
person.getName();
```
请记住一点：**this永远指向的是函数对象的所有者**！上面的例子中getName的所有者是person对象，所以this指代的是person。

## this和全局对象

我们再来看看再全局对象中，this指代的是什么，我们知道javascript是脚本语言，所以javascript的执行需要有一个宿主环境，在浏览器中这个宿主环境就是window对象，所以在全局函数中，this指代的是window对象（除非使用new，call，apply方法来改变this的指代关系）。懂得了这个关键点，下面的代码就好理解了：

```javascript
var a = 1;
console.log(a);//1
console.log(this.a);//1
console.log(window.a);//1
```

很多**前端开发**工程师经常使用在函数名字之前添加个window来调用函数，这是因为在浏览器中全局对象就是window，所有的函数变量都是在window对象之中，所以下面的代码中的this指代window对象就好理解了：

```javascript
var a = 1;
function foo(){
	var b = 2;
	console.log(this.a+b);//3
}
foo();
```

所以说，只要记住：**this**永远指向的是函数对象的所有者，即this的值是由激活执行上下文代码的调用者决定的，就好理解this的指代关系了。
<!--more-->

## 函数构造器中的this

当函数作为构造器使用new关键字实例化时，this的指代关系又是怎样的呢？看下面的代码：

```javascript
var Person = function(){
	this.name = 'Theo Wong';
}
var person = new Person();
console.log(person.name);
```

new执行过程会首先执行Person的构造器[[construct]]，然后在调用[[call]]方法给this赋值，这个执行过程可以简单理解为三步

1.  首先建立一个空的对象object，类似var obj={}
2.  然后将空对象使用Person的call操作，类似Person.call(obj)
3.  执行完Person之后再return this，完成new过程，赋值给person变量
所以经过new加工过的函数，this的函数调用者是Person本身，而不是window了。

## 嵌套函数中的this

在嵌套函数中，this的指代关系有会是怎样的呢？看下面的代码：

```javascript
var myObject = {
  func1:function() {
     console.log(this); //myObject
     var func2=function() {
        console.log(this); //window
        var func3=function() {
           console.log(this); //window
        }();
     }();
  }
};
myObject.func1();
```

在嵌套函数中，由于嵌套函数的执行上下文是window，所以this指代的是window对象，其实这是ECMA-262-3的一个bug，在最新的ECMA-262-5中已经修复。

## 事件处理中的this

在javascript中处理事件函数中，this的指代关系就更加扑朔离迷了。我们建立一个showValue函数，函数内容如下：

```javascript
var showValue = function(){
	console.log(this.value);
};
```

现在有个input，我们给input元素添加click事件，当点击input时触发showValue函数，看看现在的this指代的是什么对象。

```html
<input id="test" type="text" />
```

### 通过dom.onclick绑定事件

```javascript
document.getElementById('test').onclick = showValue;
```

运行代码会得到预期的结果，showValue虽然定义在全局对象中，但是当采用了onclick的绑定方式时，showValue是作为dom的onclick方法被调用的，所以它的this应该指代的是dom对象，而不再是**window**对象。

### 写在html标签内

```html
<input id="test" type="text" onclick="showValue();" />
```

当点击dom时，我们获取不到正确的this，这是为什么呢？

此时的this指代的是window对象，因为window对象中没有定义value的值，所以获取不到`this.value`。其实此时的不是将showValue函数赋值给dom对象的onclick，而是引用！所以上面的代码跟下面的代码关系是一样的：

```javascript
document.getElementById('test').onclick = function(){
    showValue();
};
```

根据上面说的**javascript**嵌套函数的this值，我们可以得出现在showValue的this其实是window。

### 通过addEventListener/attachEvent绑定事件监听

```html
<input type="text" id="test" />
<script type="text/javascript">
var dom = document.getElementById('test');
id = 'window';
function test(){
	alert(this.id);
}
dom.addEventListener?dom.addEventListener('click',test,false):dom.attachEvent('onclick',test);
//addEventListener test
//attachEvent window
</script>
```

这种绑定事件监听的方式，attachEvent this是window对象，而addEventListener则是dom对象的。@魔堕轮回 提出来的bug~嘎嘎

## 使用call和apply方法改变this

在Function对象原型（Function.prototype）中有两个方法：call和apply，通过call和apply可以改变this的值， 它们都接受第一个参数作为调用执行上下文中this的值。它们的不同点就是apply第二个参数为数组，call接收的参数是依次传入的。

```javascript
var obj = {
	name:'Theo Wong',
	desc:'一个前端开发者'
};
var getInfo = function(){
	console.log(this.name+this.desc);
};
getInfo.call(obj);
//Theo Wong一个前端开发者
```

## 总结

this是javascript的重要关键字，理解掌握this关键字在不同的执行上下文指代关系，才能避免代码犯一些不必要的错误。
