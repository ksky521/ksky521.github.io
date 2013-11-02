title: "javascript嵌套函数的效率问题"
id: 809
date: 2011-10-19 21:27:00
tags:
- 性能
categories:
- 前端开发
---

javascript自诞生以来就是一门受争议的编程语言，很多人也对javascript的语法表示不解，例如javascript嵌套函数。本文来自Nettuts+的一篇教程，详细的介绍了**javascript**中嵌套函数效率问题，从小处说起，一直说到匿名函数、继承，感觉不错。

## 嵌套函数效率

很多jser喜欢在javascript代码中使用嵌套函数，例如下面的例子就是一个典型的嵌套函数：
```javascript
function foo(a, b) {
    function bar() {
        return a + b;
    }

    return bar();
}

foo(1, 2);
```
上面的代码中`foo()`中嵌入了`bar()`，当`foo()`运行的时候，就会调用`bar()`。javascript引擎不会创建`bar()`函数，直到外部引用了`foo()`，随着`foo()`的运行结束，`bar()`也会销毁。

当多次运行`foo`的时候，**javascript引擎**就要在每次的运行`foo`时创建`bar`函数，而每次`foo`结束就要销毁`bar`函数，这是一个很费劲的工作。

那么为什么我们不把`bar`函数拿出来，做为一个独立的函数，它在`foo`外部只被创建一次，而不是多次，这样就大大的提高了代码效率。例如下面的代码：
```javascript
function foo(a, b) {
    return bar(a, b);
}

function bar(a, b) {
    return a + b;
}

foo(1, 2);
```
当然这样做可能随着程序的复杂性，可能存在命名冲突的危险，所以jser需要在这方面权衡，或者采用命名空间来解决这个方式。下面是在jsperf中做的关于上面两个函数大量运行的速度测试[http://jsperf.com/nested-named-functions](http://jsperf.com/nested-named-functions)。不同的浏览器测试的结果不同，但是总体来看，两个独立的函数要比相互嵌套的javascript函数效率提高10%~90%。
<!--more-->

## 匿名函数

javascript开发中常用到匿名函数，例如事件处理函数、callback函数等，例如下面的事件处理函数：
```javascript
document.addEventListener("click", function(evt) {
    alert("You clicked the page.");
});
```
这里给document创建了一个事件监听，当每次页面点击之后会alert出来一条消息。跟嵌套函数一样，每次点击需要运行一次匿名函数，处理事件完成之后再销毁。

jQuery中的each方法也是一个**匿名函数**，例如下面的代码，选择出来所有的a元素，并且添加each方法来处理a元素：

```javascript
$("a").each(function(index) {
    this.style.color = "red";
});
```

如果写成jQuery插件，可以下面的代码：

```javascript
$.fn.myPlugin = function(options) {

    return this.each(function() {
        var $this = $(this);

        function changeColor() {
            $this.css({color : options.color});
        }

        changeColor();
    });
};
```
javascript代码定义了一个名字为myPlugin的jQuery插件，插件中有一个嵌套函数changeColor，根据上面说的，上面的代码效率不如独立出来changeColor高，所以我们可以把changeColor拿到外部来，即下面的代码：

```javascript
function changeColor($obj, color) {
    $obj.css({color : color});
}

$.fn.myPlugin = function(options) {

    return this.each(function() {
        var $this = $(this);

        changeColor($this, options.color);
    });
};
```

经过修改过的jQuery插件在效率上提高了15%左右，大家可以通过[jsperf](http://jsperf.com/function-nesting-with-jquery-plugin)来测试两个jQuery插件的效率。所以说嵌套的函数越多，调用的次数越多，则可以优化的地方也越多。

## javascript嵌套函数和函数构造

我们在javascript类中长写下面的代码：

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    this.getFullName = function() {
        return this.firstName + " " + this.lastName;
    };
}

var jeremy = new Person("Jeremy", "McPeak"),
    jeffrey = new Person("Jeffrey", "Way");
```

这段代码定义了一个Person的类，其中包括了`getFullName`的方法，将firstName和lastName返回。`getFullName`的方法在每次创建不同的Person对象时会不同，所以`jeremy.getFullName === jeffrey.getFullName`返回的结果是`false`([http://jsfiddle.net/k9uRN/](http://jsfiddle.net/k9uRN/)).
具体分析见下面图，jeremy和jeffrey是不同的两个对象，他们的getFullName也是不同的。

[![jeremy和jeffrey](/uploads/2011/10/js_func_fig1-300x240.gif "jeremy和jeffrey")](/uploads/2011/10/js_func_fig1-300x240.gif)

### 使用prototype关键字

在javascript中有**prototype**这个关键字，`prototype`的属性是实例化后的对象所共有的属性，所以上面的代码可以通过prototype改写成下面的方式：
```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.getFullName = function() {
    return this.firstName + " " + this.lastName;
};

var jeremy = new Person("Jeremy", "McPeak"),
    jeffrey = new Person("Jeffrey", "Way");
```
这样`getFullName`的方法是定义在`Person.prototype`中的，为所有实例化的对象共有方法，所以jeremy和jeffrey的`getFullName`是相等的([http://jsfiddle.net/Pfkua/](http://jsfiddle.net/Pfkua/))。他们之间的关系可以通过下面的图片来解释：

[![jeremy和jeffrey共有getFullName](/uploads/2011/10/js_func_fig2-300x240.gif "jeremy和jeffrey")](/uploads/2011/10/js_func_fig2-300x240.gif)

通过[jsPerf](http://jsperf.com/prototype-vs-non-prototype)的测试，我们可以看出来，第二种方法要比第一种方法在效率上面快了18%~96%。

### 变量的私有化

在函数内部的变量是私有的，外面是不可以访问到函数内部的变量的，但是函数内部可以访问到外部的变量。看下面的代码：

```javascript
function Foo(paramOne) {
    var thisIsPrivate = paramOne;

    this.bar = function() {
        return thisIsPrivate;
    };
}

var foo = new Foo("Hello, Privacy!");
alert(foo.bar()); // alerts "Hello, Privacy!"
```

代码中创建了一个构造函数`Foo();`，并且私有了一个变量`thisIsPrivate`，当运行`bar()`时，私有的`thisIsPrivate`会被返回。这样`thisIsPrivate`受到了保护，在`Foo()`之外是访问不到的.

这种方法也是很多javascript工程师所推荐的写法，但是跟上面的代码一样，每次实例化`Foo();`之时，会创建一个`bar`方法，这样看上去又是对资源的浪费，而且会影响效率。所以我们可以通过使用prototype的方法来实现：

```javascript
function Foo(paramOne) {
    this._thisIsPrivate = paramOne;
}

Foo.prototype.bar = function() {
    return this._thisIsPrivate;
};

var foo = new Foo("Hello, Convention to Denote Privacy!");
alert(foo.bar()); // alerts "Hello, Convention to Denote Privacy!"
```

这样的代码有不可以保证变量的私有化，只是我们在变量之前添加下划线`_`（很多公司内部规定，或者已经成为了很多程序员的编程习惯，_开头的变量是私有的），这样每次实例化`Foo();`会只建立一个通用的`bar`方法。

## 总结

本文也不是说不要大家在**javascript**中写嵌套函数，只是要适当，要注意这个知识点，在频繁调用的函数内部是不推荐写javascript嵌套函数的。开发者写代码给用户用，为的就是高效代码提高用户体验。

英文全文：http://net.tutsplus.com/tutorials/javascript-ajax/stop-nesting-functions-but-not-all-of-them
