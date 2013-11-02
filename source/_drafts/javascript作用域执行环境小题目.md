title: "javascript作用域执行环境小题目"
id: 978
date: 2012-05-21 17:25:31
tags: 
categories: 
- JavaScript
---

## 词法作用域

<pre lang="javascript">
//1、从比较简单的开始
function foo(){return a++}
function foo2(){
	var a=0;
	return foo();
}
console.log(foo2());
//undefined       
//a是在foo外部定义的，foo的执行环境中不存在a的声明和赋值

var a;
console.log(a);//undefined
a = {};
console.log(typeof a);

//2、
console.log(typeof a);
var a = function(){};

//3、
console.log(typeof a);
function a(){};

//4、
var a = 1;
console.log(typeof a);
function a(){};
console.log(typeof a);

//5、
console.log(typeof a);
var a = 1;
function a(){};
console.log(typeof a);

//6、
var a = function(){};
if(true){
	a = 1;
}

function foo(){
	alert(1);
};
if(true){
	function foo(){
		alert(2);
	};
}else{
	function foo(){
		alert(3);
	};
}
foo();

//7\. 参数>函数声明>变量声明
function foo(foo){
	console.log(foo);
};
foo('a');

function foo(arguments){
	console.log(arguments);
}
foo('a');

function foo(a){
	var a = 1;
	console.log(a);
}
foo('a');

function foo(a){
	var a = a;
	console.log(a);
}
foo('a');

//
1, function foo(){alert(1)};
foo();

1, function foo(){alert(1);}();
foo();

[function foo(){alert(1);}];

foo();

</pre>