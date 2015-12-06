title: "ECMAScript 5的严格模式：语法限制"
id: 1037
date: 2012-07-27 17:08:23
tags:
- ecmascript
- 语法限制
categories:
- 读书笔记
---

在**ECMAScript 5严格模式**介绍的第一篇（[ECMAScript 5的严格模式：strict mode介绍](/2012/07/26/ecmascript-5%E7%9A%84%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F%EF%BC%9Astrict-mode%E4%BB%8B%E7%BB%8D/)）文章中提到了严格模式会在语法解析和代码执行两个方面做限制，抛出更多的异常。今天介绍的是**ECMAScript 5严格模式**的第一部分：语法限制。

ECMAScript 5严格模式的语法限制有七个，下面一一介绍：

## 禁止函数出现相同的参数

我们知道在普通的函数中，多个参数可以相同（即使我们很少或者没有这样写过），但是在严格模式下，这样的行为是被禁止！
例如下面的代码：

```javascript
function foo(x,x,y){
    alert(x+y);
}
foo(1,2,3);
```

在非严格模式下，后面的x会覆盖第一个x的传参，即运行结果实际为`2+3=5`。


但是在严格模式下，上面的代码却会抛出类似“Strict mode function may not have duplicate parameter names”的语法异常。

```javascript
function foo(x,x,y){
    "use strict";
    alert(x+y);
}
foo(1,2,3);
```

## 禁止对象直接量的相同属性名

跟第一条相同，下面的代码在非严格模式是正常的，但是在严格模式却是禁止的，也是抛出语法异常（chrome 下为“Duplicate data property in object literal not allowed in strict mode”）

```javascript
var obj = {
    a: 1,
    a: 2
}
foo(1,2,3);
```

## 禁止重新定义eval和arguments

严格模式中不能声明或重写 `eval` 和 `arguments`
这两个标识符，亦即是说，它们不能出现在赋值运算的左边，也不能使用 var 语句来声明。

另外，由于 catch 子句以及具名函数都会隐式地声明变量名，因此在它们的语法中也不允许用 eval 和 arguments 作为标识符。最后要强调的是，arguments 或 eval 也不能使用 delete 去删除。所以下面的代码在严格模式下都会抛出语法异常：

```javascript
//向 eval或 arguments赋值
eval = function() { }

//重新声明 eval或 arguments
var arguments;

//将 eval或 arguments用做 catch子句的异常对象名
try {
    // …
}
catch (eval) {
    // …
}

//将 eval或 arguments用做函数名
function arguments() { }

//删除 arguments，或形式参数名
function foo() {
    delete arguments;
}
```

## 禁止使用 0 前缀声明的 8 进制直接量

例如下面的代码在严格模式下面是错误的：

```javascript
var num = 012;
alert(num);
```

而在非严格模式中，`num`因为0而被解析为八进制数值，所以`alert`出来的是十进制的`10`

## 禁止delete显式声明的标识符、具名函数

```javascript
//删除变量名
var x;
delete x;

//删除具名函数
function foo() {}
delete foo;

//删除 arguments，或形式参数名
function foo(x) {
delete x;
}

//删除 catch子句中声明的异常对象
try{} catch(e) { delete e }
```

在非严格模式中，通常这些操作只是"无效的"，并不会抛出异常。此外，用 delete操作其他一些不能被删除的对象属性、标识符时将导致执行期异常。

## 保留字增多

在严格模式中，在代码中使用一些扩展的保留字也会抛出异常。

这些保留字包括：implements, interface, let,package, private, protected, public, static，以及 yield。

## 禁止使用with(){}

我们知道with会使作用域链延长，如果你使用严格模式编码，那么使用with语句会直接抛出语法异常。
