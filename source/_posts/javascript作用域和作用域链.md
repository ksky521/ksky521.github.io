title: "javascript作用域和作用域链"
id: 875
date: 2011-10-25 19:26:22
tags:
- 作用域
- javascript
categories:
- 读书笔记
---

javascript的**作用域**是一个重要的知识点，javascript作用域（scope）是通过javascript的作用域链（scope chain）来实现的。

## javascript作用域

javascript作用域(scope)：简单的说，就是创建一个函数时在什么环境下创建的，它控制了javascript代码运行时变量和函数的访问范围。在JavaScript中，变量的作用域有全局作用域和局部作用域两种。

### 全局作用域（Global Scope）

在代码中任何地方都能访问到的对象拥有全局作用域，注意：全局变量是魔鬼！因为它效率低（后面讲到），污染全局环境！一般有一下三种方式获取全局作用域。

#### 代码最外层定义的函数和变量拥有全局作用域

在代码的最外层，定义的函数、变量，都是拥有全局作用域的。

```javascript
var a = 1;
function b(){
    var a = 2;
}
b();
alert(a);//1
```

#### 函数内部不使用var定义的拥有全局作用域

在函数内部，不使用var定义的变量拥有全局作用域，这是个坑！要注意，很多前端开发工程师不习惯写var，其实这时候你已经污染了全局作用域！

```javascript
var a = 1;
function b(){
    a = 2;
    c = 3;
}
b();
alert(a);//2
alert(c);//3
```

<!--more-->

#### 所有window对象的属性拥有全局作用域

在《[正确理解javascript的this关键字](http://js8.in/851.html "javascript的this关键字")》中我提到了脚本语言的运行需要宿主，在浏览器的全局对象是window，所以全局的变量和函数是window的属性，并且拥有**全局作用域**。

```javascript
function a(){
	window.b = 1;
}
a();
alert(b);//1
```

### 局部作用域（Local Scope）

和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部，所有在一些地方也会看到有人把这种作用域称为函数作用域。如下面的代码中b就是一个局部变量，在函数外部是访问不到的。

```javascript
var a = function(){
	var b = 1;
	alert(b);
}
a();
alert(b);//出错 b undefined
```

## javascript作用域链

**javascript作用域**（scope）是通过javascript的作用域链（scope chain）来实现的。javascript函数对象中拥有一个仅供javascript引擎访问的内部属性——[[Scope]]，[[Scope]]指向一个集合，即为“作用域链（Scope chain）”，它决定了哪些数据能被函数访问。

```javascript
var a = 1;
function fn1(){
    var a = 9;
    function fn2(){
        alert(this.a);//1
        alert(a);//9
    }
    fn2();
}
fn1();
```
上面代码的**作用域链**，可以用下面的图来表示：

[![javascript的作用域链图示](/uploads/2011/10/10-25_155941-300x211.png "javascript的作用域链图示")](/uploads/2011/10/10-25_155941-300x211.png )

### 作用域链与javascript代码优化

代码在运行时，变量的查找总是从作用域链的底部开始往上查找，如果第一层没找到，就要从更高一级作用域查找，这样一直找下去，一直找到全局作用域，如果没有找到则返回undefined。

从作用域链的结构可以看出，在运行期上下文的作用域链中，标识符所在的位置越深，读写速度就会越慢。因为全局变量总是存在于运行期上下文作用域链的最末端，因此在标识符解析的时候，查找全局变量是最慢的。所以，在编写代码的时候应尽量少使用全局变量，尽可能使用局部变量。

一个好的经验法则是：如果一个跨作用域的对象被引用了一次以上，则先把它存储到局部变量里再使用。如下面的代码：

```javascript
function changeColor(){
    document.getElementById("btnChange").onclick=function(){
        document.getElementById("targetCanvas").style.backgroundColor="red";
    };
}
```

这个函数引用了两次全局变量document，查找该变量必须遍历整个作用域链，直到最后在全局对象中才能找到。这段代码可以重写如下：

```javascript
function changeColor(){
    var doc=document;
    doc.getElementById("btnChange").onclick=function(){
        doc.getElementById("targetCanvas").style.backgroundColor="red";
    };
}
```

这段代码比较简单，重写后不会显示出巨大的性能提升，但是如果程序中有大量的全局变量被从反复访问，那么重写后的代码性能会有显著改善。

### 作用域链的延长

当执行流进入下列任何一个语句时，**作用域链**将得到延长：

1.  try-catch语句的catch块
2.  with语句

此两个语句会在作用域链的前端添加一个变量对象。对with来说，其变量对象中包含着指定对象的所有属性和方法所作的变量申明；对catch来说，其变量对象中包含的是被抛出的错误对象的申明。这些标量对象都是只读的，因此在with和catch语句中申明的变量都会被添加到所在执行环境的变量对象中。

当with和catch语句结束之后，作用域链会恢复到原先的状态。

值得一提的是改变了javascript的作用域链之后，代码效率会降低。拿with语句来说，当代码运行到with语句时，运行期上下文的作用域链临时被改变了。一个新的可变对象被创建，它包含了参数指定的对象的所有属性。这个对象将被推入作用域链的头部，这意味着函数的所有局部变量现在处于第二个作用域链对象中，因此访问代价更高了。
