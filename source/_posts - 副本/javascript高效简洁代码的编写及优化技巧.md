title: "javascript高效简洁代码的编写及优化技巧"
id: 350
date: 2009-11-28 06:46:59
tags: 
categories: 
- JavaScript
- 网络技术
---

### 前言
随着互联网前端技术的革新，**javascript**越来越重要，并且js的轻便，非严格的写法，使越来越多的人掌握了js，可是谈到js的写法，很多人都觉得自己很熟悉，很了解，但是笔者在实践中发现js并非大家想象的那么简单，就像同事一句话：php会的很多，一抓一大把，而真正会js的却不多。仔细想想，原因很简单，js的加载到客户端运行的，不像php可以一个include就可以搞定，而且引入的文件中不用的函数可以放着不动，而js不同，如果加入很多很多无用的函数会大大的占有带宽，不利于用户体验。下面结合笔者实际开发过程中遇到的问题，以及自己收集的技巧，谈谈js高效简洁代码的编写及其优化的技巧。当然网上也有很多类似的文章，不过建议大家还是不要人云亦云，真正适合自己的技巧跟编写习惯才是最好的！

### 真假的判断

Javascript中有null、undefined、string、number、boolean五种基本的类型，一般判断真假或者为空的时候大家会使用下面的代码：<pre lang="javascript">
if(a==true){
    //doSomeTing();
}</pre>但是这种方法很不简洁，我们完全可以使用1，0来判断，比如我们设定一个a，如果a为假，我们就改成真，而a在程序后面可能用于判断，最简单也是最好理解的方法就是下面的写法<pre lang="javascript">
var a=false;
if(a==false){
    a=true;
}
</pre>既然提到了0，1，肯定有人想到了第二种写法：<pre lang="javascript">
var a=0;
if(!a){
    a=1;
}
</pre>这个代码还可以进一步简写优化，就是使用js的三元运算符，也就是三目运算符：<pre lang="javascript">
var a=0;
!a?a=1?null;
</pre>
还有一点，对于空字符串的判断，往往采用**if（a==""）**,其实对于空字符本身就是false，下面我总结了下Javascript中的真假值，希望对大家有用
<!--more-->> JavaScript 中的真假值
> 类型	真假值
> Null	总是为假（false）
> Undefined	总是为假（false）
> Boolean	保持真假值不变
> Number	+0，-0 或是 NaN 的时候为假，其它值为真
> String	空字符串的时候为假，其它值为真
> Object	总是为真（true）

### 数组跟对象的定义
对于类似下面的正统数组跟对象的定义<pre lang="javascript">
var a=new Array;
var b=new obj;
obj.name="WYQ";
obj.webSite="http://js8.in";
</pre>我们可以使用<pre lang="javascript">
var a=[];
var b={name:"WYQ",webSite:"http://js8.in"};
</pre>来代替

### 循环的控制
在使用循环遍历时候要注意提前把长度或者要计算的长度记录下来，如下面的写法<pre lang="javascript">
var list = document.getElementsByTagName('p');
for (var i = 0, l = list.length; i < l; i++) {//注意此处把list的长度提前计算出来，避免了每次循环重复计算
    ……
}
</pre>**注意**循环体**内部的写法，该放在外面的放在外面**如下面的代码<pre lang="javascript">
var list = $(".abc");
for (var i = 0, l = list.length; i < l; i++) {//注意此处把list的长度提前计算出来，避免了每次循环重复计算
    var a=list[i].html();
    $("#abc").after(a);
}
</pre>我们分析一下：每次循环的时候，都要首先解析$("#abc");势必效率变低，接着在使用after插入到#abc中去。这样子写效率会很低的，而下面的写法就高效了<pre lang="javascript">
var list = $(".abc");
var b = $("#abc");
for (var i = 0, l = list.length; i < l; i++) {//注意此处把list的长度提前计算出来，避免了每次循环重复计算
    var a=list[i].html();
    b.after(a);
}
</pre>这样的写法还不是最高效的，看下面的方法<pre lang="javascript">
var list = $(".abc");
var b = "";
for (var i = 0, l = list.length; i < l; i++) {//注意此处把list的长度提前计算出来，避免了每次循环重复计算
    b+=list[i].html();
}
$("#abc").after(b);
</pre>_看似简单的Javascript代码，其实要做的功夫很多！_

### 用while还是for？

对于我来说，那个使用的方便，那个用的变量少使用那个，如对顺序没有关系的循环可以使用**while**，如下面的两段代码，前者使用了for，后者使用了while，两者明显while使用的变量少，虽然for容易使大家理解<pre lang="javascript">
//使用for
var arr = [1,2,3,4,5,6,7];
var sum = 0;
for (var i = 0, l = arr.length; i < l; i++) {
    sum += arr[i];
}   
//使用while
var arr = [1,2,3,4,5,6,7];
var sum = 0, l = arr.length;
while (l--) {
    sum += arr[l];
}
</pre>

### 条件判断的优化技巧

**1、对于可能性的排列按照从高到底的顺序进行排列**

原因很简单，可以减少程序的试探次数。
**2、使用三目运算符****三目运算符**比if else判断语句**效率**高，而且往往代码比较简洁如下面的两段代码<pre lang="javascript">
//使用if else
if (a > b) {
    num = a;
} else {
    num = b;
}
//三目运算符
num = a > b ? a : b;
//谁说三目不能代替if else的function？
c=a>b?function(){
            }:function(){
                 };
c();
</pre>
**使用switch 代替if**对于同一个条件不同情况的判断，使用switch简洁易懂，并且switch本身比if效率要高，在IE下尤为明显！

### ==与===的区别

看过jQuery源码的朋友发现，其中很多使用的是===，而不是==，这是因为===的效率比==要高，但是使用===要注意，===不会进行类型的转换，比如如果你确定比较两者类型相同，推荐使用**===**，这也是大家在编写代码时候自己细节的养成。当然也有一定的注意情况，下面仔细的说说==跟===的区别

> === 操作符的判断算法
> 
> 在使用 === 来判断两个值是否相等的时候，如判断x===y，会首先比较两个值的类型是否相等，如果不相等的话，直接返回 false 。接着根据 x 的类型有不同的判断逻辑。
> 
> 如果 x 的类型是 Undefined 或 Null，则返回 true 。
> 如果 x 的类型是 Number，只要 x 或 y 中有一个值为 NaN，就返回 false ；如果 x 和 y 的数字值相等，就返回 true ；如果 x 或 y 中有一个是 +0，另外一个是 -0，则返回 true 。
> 如果 x 的类型是 String，当 x 和 y 的字符序列完全相同时返回 true，否则返回 false 。
> 如果 x 的类型是 Boolean，当 x 和 y 同为 true 或 false 时返回 true，否则返回 false 。
> 当 x 和 y 引用相同的对象时返回 true，否则返回 false 。
> == 操作符的判断算法
> 
> 在使用 == 来判断两个值是否相等的时候，如判断x==y，当 x 和 y 的类型一样的时候，判断逻辑与 === 一样；如果 x 和 y 的类型不一样，== 不是简单的返回 false，而是会做一定的类型转换。
> 
> 如果 x 和 y 中有一个是 null，另外一个是 undefined 的话，返回 true 。如null == undefined。
> 如果 x 和 y 中一个的类型是 String，另外一个的类型是 Number 的话，会将 String 类型的值转换成 Number 来比较。如3 == "3"。
> 如果 x 和 y 中一个的类型是 Boolean 的话，会将 Boolean 类型的值转换成 Number 来比较。如true == 1、true == "1"
> 如果 x 和 y 中一个的类型是 String 或 Number，另外一个的类型是 Object 的话，会将 Object 类型的值转换成基本类型来比较。如[3,4] == "3,4"
> 需要注意的是 == 操作符不一定是传递的，即从A == B, B == C并不能一定得出A == C。考虑下面的例子，var str1 = new String("Hello"); var str2 = new String("Hello"); str1 == "Hello"; str2 == "Hello"，但是str1 != str2。

### typeof使用时候注意

对于同一个**var a="abc";**
在FF下typeof a==string 返回 true
在IE下返回false，IE就是这样的娇贵！
推荐写法：
> typeof a=="string"

### 最后，尽量避免使用eval等语句！

**eval**、Function、execScript等语句会再次使用javascript解析引擎进行解析，需要消耗大量的执行时间。

_P.S._**此文章不断整理更新中，有好的想法，大家可以提出来讨论**