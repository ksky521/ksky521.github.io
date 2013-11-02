title: "javascript变量类型"
id: 736
date: 2011-08-11 20:51:09
tags:
- javascript
categories:
- 前端开发
---

javascript的**变量类型**真的很要人纠结，即使你是很有经验的js工程师，你也很难说清楚js的类型和分类。
最近在讲javascript入门指南的时候，有人提出数组为什么不是基本类型，我通过演示`typeof []`的结果来说明，数组是对象类型派生出来的，而不是六种基本类型。
其实要理解javascript的变量类型很简单，就是我们要找到一个划分的标准。

## javascript变量类型分类

在很多书中都提到了javascript的变量类型，每本书都有不同的划分标准，如果按照typeof和instanceof的返回值来区分，可以把javascript的变量类型分为两套类型系统：基本类型和对象类型衍生出来的对象类型系统。
基本类型包括：undefined，number，boolean，string，object，function，他们之前通过typeof的返回值来区分。
第二套对象类型系统是由第一套系统衍生发展而来的，例如前面提到的Array，还有Null，Number，Boolean等等，对象类型可以通过**instanceof**来判断。
那么对象类型中的Number和基本类型中的number又是什么关系呢？他们又是什么区别呢？
答案就是，他们是映射关系，即下例：
```javascript
var a = new Number(123);
console.log(a.valueOf()===123);//true
var b = new String(123);
console.log(b.valueOf()===123);//false
console.log(b.valueOf()==='123');//true
```
obj.valueOf()返回的是该对象的原始值。

## 值类型和引用类型

<!--more-->
这里再谈谈值类型和引用类型的问题，在javascript中：undefined、string、number和boolean是“值类型”，而object与function是“**引用类型**”。所有引用类型都可以看着Object()的子类，所以任意函数也是Object()的子类。
怎么理解值类型和引用类型呢？？看下面的例子:

### 值类型示例

```javascript
	var a = 123;
	var b = a;
	a = 1;
	console.log(b);//123
```

### 引用类型示例

```javascript
	var c = [1,2,3];
	var d = c;
	d[0] = 4;
	console.log(c);//[4,2,3]
```

### 值类型和引用类型解释

看见上面的示例，有些人可能就晕了，很多人一不小心就改变了引用类型的值，而自己还不清楚程序出现了什么问题！
当值类型a赋值给b时，这时候会在内存中给b分配空间，所以a和b是完全独立的两个变量。
而c和d之间，通过赋值，产生了引用关系，两者之间都指向了同一个数组，所以修改其中一个值会改变对方的值。
在实际开发中一定要记住这点，不要乱赋值，否则会犯上面的错误。例如下例，可以先把使用的site赋值出来，这样变量e是一个值类型，不会产生引用问题。
```javascript
var c = {site:'js8.in'};
var d = c;
var e = d.site;
d.site = 'weibo.com';
console.log(e);//js8.in
```

## arguments的值

ECMAScript中函数的参数是按值传递的，当参数为引用类型值时便按引用传递是一种错误或者不全面的说法。

对于参数为基本类型值的情况，很容易理解。但对于引用类型值的参数，却很容易让人误解为是按引用传递的。如下面的例子：
```javascript
function fn(arg){
	arg.site = 'js8.in';
	arg = new Object();
	arg.site = 'weibo.com';
}
var obj = new Object();
fn(obj);
console.log(obj.site)//js8.in
console.log(window.arg);//undefined
```
示例中，如果**arguments**是按照引用类型传递的，那么obj.site应该为weibo.com，但是结果却是js8.in。

事实是这样的：当参数为引用类型值时的确是按引用传递的。
至于的你后面举的例子也是一个引用传递的，obj把引用传给arg，arg引用的内存空间和obj的一致，所以设置site为js8.in的时候，obj能接受到。后面你new了一个新的Object，相当于开了一个新的内存空间，然后arg引向了那块新内存，但是obj引用的内存还是原来那块，所以后面site赋值了，obj不改变。这个跟C/C++的指针有点像。至于window.arg为undefined,是因为js的作用域是词法作用域，function外的当然引用不了function内的，与值传递或者引用传递木有关系啊(来自周某欣)。

最后来一张周爱民大神的javascript类型关系图：

![javascript变量关系图](/uploads/2011/08/1804_131297002896En.png "javascript变量关系图")
