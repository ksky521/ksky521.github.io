title: "如何写出高质量的Javascript代码"
id: 676
date: 2011-03-03 16:22:42
tags:
- javascript
categories:
- 前端开发
---
优秀的Stoyan Stefanov在他的新书中（《**Javascript** Patterns》）介绍了很多编写高质量代码的技巧，比如避免使用全局变量，使用单一的var关键字，循环式预存长度等等。

这篇文章不仅仅从代码本身来考虑如何优化编码，也从代码的设计阶段来考虑，包括书写API文档，同事的review，使用JSLint。这些习惯都能帮助你编写更加**高质量**的、更易于理解的、可维护的代码（让你的代码在多年之后仍使你引以为傲）。

### 编写可维护的代码

软件的BUG修复需要花费大量的精力。尤其当代码已经发布之后，随着时间的增长，维护的成本愈发的高。当你一发现BUG的时候，就立即去修复，这时候你的代码还是热乎的，你也不需要回忆，因为就是刚刚写好的。但是当你做了其他任务，几乎完全忘记了这份代码，这时候就需要：

1.  重新学习和理解问题
2.  理解代码是如何解决问题的
另外一个问题是，在大项目或者大公司里面，经常是解决BUG的人不是产生BUG的人，而且也不是发现BUG的人。所以减少理解代码的时间就是最重要的问题，无论这个代码是你自己以前写的还是团队中的其他成员写的，因为我们都想去搞搞新的有意思的东西，而不是去维护那些个陈旧的代码。

还有一个开发中的普遍问题就是，往往读代码的时间比写代码的时间还要多。有时候你钻研一个问题，可以花整整一个下午的时间来考虑代码的编写。这个代码当时是可以工作的，但是随着开发的进行，其他东西发生了很大的变化，这时候也就需要你自己来重新审查修改编写代码。比如：

1.  还有BUG没有解决
2.  添加了新的功能
3.  程序需要在新的环境中运行（比如一个新上市的浏览器）
4.  代码有问题
5.  代码需要重写因为修改了架构甚至要使用另一个语言
因为这些原因，也许你当时一个下午写好的代码，后面需要花费几周的时间来阅读。所以编写可维护的代码对于软件的成功至关重要。

可维护的代码包括：

1.  可读性
2.  连续性
3.  预见性
4.  看起来是一个人写的
5.  有文档
6.  最少化全局变量
Javascript使用函数来约定作用域。一个在函数内部声明的变量在外部是不可见的。所以，全局变量也就是声明在任何函数之外的或者没有被声明的变量。

**Javascript**中，在任何函数之外有个可访问的全局对象，每一个你创建的全局变量都是这个对象的一个属性。在浏览器中，为了方便，通常用window来指代这个全局变量。下面的代码就是说明如何创建一个全局变量：
> 
```javascript
myglobal = "hello"; // antipattern
> console.log(myglobal); // "hello"
> console.log(window.myglobal); // "hello"
> console.log(window["myglobal"]); // "hello"
> console.log(this.myglobal); // "hello```

### 全局变量的问题

全局变量的问题在于，他在你的所有代码或者一个页面中都共享。他们在同一个命名空间下面，这通常会造成变量名冲突–两个同名的变量，但是确实不同的用处。

通常在一些页面中需要引入一些其他人的代码，比如：

1.  第三方的JS库
2.  广告伙伴的脚本
3.  第三方的用户行为分析或者统计脚本
4.  不同的组件、按钮等等
加入其中一个第三方组件定义了一个全局变量：result。然后在你的程序中，也定义了一个全局变量result。最后的这个result会覆盖点之前的result，这样第三方的脚本就会停止工作。

所以，为了对其他的脚本友好，在一个页面中使用越少的全局变量越好。在后面会有一些方法来告诉你如何减少全局变量，比如使用命名空间，或者自执行的匿名函数，但是最好的避免全局变量的方法就是使用var关键字来声明变量。
<!--more-->
因为javascript的两个特性，创建一个全局变量非常的简单。第一，你可以使用一个甚至没有声明的变量，第二，在javascript中，所有未声明的变量都会成为全局对象的一个属性（就像一个声明了的全局变量一样）。看看这个例子：
> 
```javascript
function sum(x,y){
>      result = x + y;
>      return result;
> }```
在这个代码中，result在没有被声明的情况下就被使用了，这个代码也能很好的工作，但是在调用了这个函数之后，就会多一个名为result的全局变量，这是所有问题的根源了。

解决这个问题的办法就是使用var：
> 
```javascript
function sum(x,y){
>      var result  = x + y;
>      return result;
> }```
两外一个不好的习惯就是在声明变量的时候使用链式的方法来赋值，这时候，a是局部变量，但是b就成为了全局变量。
> 
```javascript
function foo(){
>      var a=b=0;
>      ....
> }```
这是因为，b = 0这个表达式先执行，执行的时候b并没有被声明，所以b就成为了全局变量，然后返回这个表达式的值0，给声明了的变量a，换句话说，就好像你输入的是：
> 
```javascript
var a = (b=0);```
如果你已经声明变量，那么这种链式的赋值没有问题：
> 
```javascript
function foo(){
>      var a,b;
>      ...
> }```
另外一个避免使用全局变量的原因是考虑到程序的可移植性。如果你想让你的代码在不同的环境中都可以工作，那么使用全局变量就很可能会与新的系统中的全局变量冲突（或许在之前的系统中没有问题）。

### 忘记var的影响

使用var声明的全局变量和没有使用var生成的全局变量还有一个区别在于删除：

1.  使用var声明创建的全局变量不能被删除
2.  没有使用var声明的全局变量可以被删除
这说明没有使用var声明生成的全局变量不是真正的变量，他们只是全局对象的属性。属性可以通过delete删除，但是变量不行：
> 
```javascript
// define three globals
> var global_var = 1;
> global_novar = 2; // antipattern
> (function () {
>    global_fromfunc = 3; // antipattern
> }()); 
> 
> // attempt to delete
> delete global_var; // false
> delete global_novar; // true
> delete global_fromfunc; // true 
> 
> // test the deletion
> typeof global_var; // "number"
> typeof global_novar; // "undefined"
> typeof global_fromfunc; // "undefined"```
在ES5的严格模式下，给一个为声明的变量赋值会报错。

### 读取全局对象

在浏览器中，你可以通过window变量来读取全局对象（除非你在函数内部重新定义了window对象）。但在有的环境中，可能不叫window，那么你可以使用下面的代码来获取全局对象：
> 
```javascript
var global = (function(){
>      return this;
> })();```
这样可以获取到全局对象的原因是在function的内部，this指向全局对象。但是这在ES5的严格模式下会不起作用，你需要适配一些其他模式。当你开发自己的库的时候，你可以把你的代码封装在一个立即函数中，然后将this作为一个参数传进来。

### 单个var模式

在你的代码的顶部只是用一个var关键字，会有以下的好处：

1.  对于所有需要的变量，在一个地方就可以全部看到
2.  避免使用一个未定义的变量
3.  帮助你记忆声明的变量，减少全局变量
4.  更精简的代码
书写很简单：
> 
```javascript
function func() {
>    var a = 1,
>        b = 2,
>        sum = a + b,
>        myobject = {},
>        i,
>        j;
>    // function body...
> }```
通过一个var和逗号来声明多个变量。在声明的时候给变量赋默认值也是不错的做法，可以避免一些逻辑错误，提高代码的可读性。而后你阅读的代码的时候也可以根据变量的默认值来方便的猜测变量的用途。

你也可以在声明变量的时候做一些实际的工作，比如sum = a + b;另外，在操作DOM元素的时候，你也可以把DOM元素的引用保存在一个变量中：
> 
```javascript
function updateElement() {
>    var el = document.getElementById("result"),
>        style = el.style;
>    // do something with el and style...
> }```

### 滥用了的var

JavaScript允许你在函数内部有多个var语句，但是却都表现的如同在函数的顶部声明一样。这个特性在你使用一个变量然后在后面又声明了这个变量时会导致一些奇怪的逻辑问题。对于JavaScript来说，只要变量在同一个作用域，那么就认为是声明了的，就算是在var语句之前使用也一样。看看这个例子：
> 
```javascript
myname = "global"; // global variable
> function func() {
>     alert(myname); // "undefined"
>     var myname = "local";
>     alert(myname); // "local"
> }
> func();```
在这个例子中，或许你期望第一次会弹出global，第二次弹出local。因为第一次的时候没有还没有使用var声明myname，这是应该是全局变量的myname，第二次声明了，然后alert之后应该是local的值。而事实上不是这样的，只要你在函数中出现了var myname，那么js就认为你在这个函数中声明了这个变量，但是在读取这个变量的值的时候，因为var语句还没有执行，所以是undefined，很奇怪的逻辑吧。上面的代码相当于：
> 
```javascript
myname = "global"; // global variable
> function func() {
>    var myname; // same as -&gt; var myname = undefined;
>    alert(myname); // "undefined"
>    myname = "local";
>    alert(myname); // "local"
> }
> func();```
我们来解释一下这个现象，在代码的解析中，分两个步骤，第一步先处理变量函数的声明，这一步处理整个代码的上下文。第二步就是代码的运行时，创建函数表达式以及未定义的变量。实际上，我们只是假设了这个概念，这并不在ECMAScript的规范中，但是这个行为常常就是这样解释的。

### for循环

在for循环中你会去迭代一些数组元素或者一些HTML元素。for循环常常如此：
> 
```javascript
for (var i = 0; i &lt; myarray.length; i++) {
>    // do something with myarray[i]
> }```
这样写的问题在于，每一次迭代的时候都会计算数组的长度，尤其在这个参数不是一个数组而是一组HTML元素的时候会降低你的程序的性能。

HTML元素的集合在页面上，这样每次都会去再页面上查找相应的元素，这是非常耗时的。所以对于for循环，你需要预先保存数组的长度，这样写：
> 
```javascript
for (var i = 0, max = myarray.length; i &lt; max; i++) {
>    // do something with myarray[i]
> }```
这样缓存了参数的长度，在每次迭代的时候就不用再去查找计算了。

在查找HTML元素集合的时候，缓存参数长度可以带来可观的性能提升，Safari下面提高两倍的速度，在IE7下面提高190倍的速度。

需要注意的是，当你需要操作修改DOM元素的数量的时候，你肯定希望这个值是随时更新的而不是一个常量。

使用下面的单一var模式，你也可以把var提到循环之外：
> 
```javascript
function looper() {
>    var i = 0,
>         max,
>         myarray = [];
>    // ...
>    for (i = 0, max = myarray.length; i &lt; max; i++) {
>       // do something with myarray[i]
>    }
> }```
这个模式可以增强整个代码的连续性，但是不好的一点是当你重构代码的时候复制粘贴就没那么容易了。例如：如果你想在其他函数中也使用这个循环，那你需要确定在新的函数中处理好了i和max（或许还需要删掉这个）。

这个函数还有两个点可以优化的：

1.  可以少一个变量（不需要max）
2.  递减到0，一个数字与0比较比这个数字与另外一个数字比较更快
所以就可以写为：
> 
```javascript
var i, myarray = [];
> for (i = myarray.length; i--;) {
>    // do something with myarray[i]
> }```
针对第二点：
> 
```javascript
var myarray = [],
>     i = myarray.length;
> while (i--) {
>    // do something with myarray[i]
> }```
这是两个比较微小的点的优化。另外，JSLint可能对于i–会有意见。

### for-in循环

for-in循环用来迭代非数组的对象。使用for-in循环通常也成为枚举。

从技术上来说，你也可以用for-in来循环数组，因为数组也是对象，但是不推荐。如果数组有一些自定义的扩展函数，那么就会出错。另外，对象属性的顺序在for-in循环中也是不确定的。所以最好还是用普通的循环来循环数组用for-in来循环对象。

在循环对象的过程中，使用`hasOwnProperty()`方法来检验是对象本身的属性还是原型链上的属性很重要。

看看下面的这个例子。
> 
```javascript
// the object
> var man = {
>    hands: 2,
>    legs: 2,
>    heads: 1
> }; 
> 
> // somewhere else in the code
> // a method was added to all objects
> if (typeof Object.prototype.clone === "undefined") {
>    Object.prototype.clone = function () {};
> }```
在这个例子中，我们有一个简单的称作man的对象字面量。在其他man定义之前或之后的地方，对象原型有一个很有用的clone()方法。因为原型链的原因，所有的对象都自动获得了这个方法。为了在枚举man对象的时候出现clone方法，你需要使用hasOwnProperty方法来区别。如果没有区别来自原型链的方法，那么就会有一些意想不到的事情发生：
> 
```javascript
// 1.
> // for-in loop
> for (var i in man) {
>    if (man.hasOwnProperty(i)) { // filter
>       console.log(i, ":", man[i]);
>    }
> }
> /* result in the console
> hands : 2
> legs : 2
> heads : 1
> */
> // 2.
> // antipattern:
> // for-in loop without checking hasOwnProperty()
> for (var i in man) {
>    console.log(i, ":", man[i]);
> }
> /*
> result in the console
> hands : 2
> legs : 2
> heads : 1
> clone: function()
> */```
另外一种使用方法如下：
> 
```javascript
for (var i in man) {
>    if (Object.prototype.hasOwnProperty.call(man, i)) { // filter
>       console.log(i, ":", man[i]);
>    }
> }```
这样写的好处是可以防止man重新定义了hasOwnProperty方法导致的冲突。如果不想写这么长的一串，你也可以这样：
> 
```javascript
var i, hasOwn = Object.prototype.hasOwnProperty;
> for (i in man) {
>     if (hasOwn.call(man, i)) { // filter
>         console.log(i, ":", man[i]);
>     }
> }```
严格意义上讲，不适用hasOwnProperty也不是什么错误。根据任务的难度和你对代码的自信程度，你也可以不用这个直接循环。但是当你不确定的时候，最好还是使用这个方法检测一下。

另外一种格式上的改变（不会通过jsLint的检查），去掉for的大括号，然后把if放在同一行。这样做的好处可以让循环体更加突出，缩进也就少一些：
> 
```javascript
// Warning: doesn't pass JSLint
> var i, hasOwn = Object.prototype.hasOwnProperty;
> for (i in man) if (hasOwn.call(man, i)) { // filter
>     console.log(i, ":", man[i]);
> }```

### 不要扩展内建的原型

扩展原型的构造函数，可以提供一些很强大的功能，但是有时候他太强大了。

有时候你会去扩展Object(),Array(),Fucntion()的原型方法，这样会导致可维护性的问题，因为这会让你的代码的移植性变差。其他的开发人员使用你的代码的时候，可能只需要原生的方法，并不需要额外的功能。

另外，你添加进去的方法，如果在循环的时候没有使用hasOwnProperty方法就会被遍历出来，这会让人很迷惑。

所以，最好还是不要扩展基本的对象。除非是下面的情况：

你确定在将来根据ECMAScript规范，浏览器会添加相应的原型方法，那么是可以的，你只不过是提前实现了这个功能。
你确定的你要实现的方法不存在–或许有时候在代码的其他的地方实现了，或者有的浏览器支持，这都是不行的。
有非常清晰的文档，并且与团队成员沟通过
如果在这些情况之下，那么你就可以添加，最好是下面这种形式：
> 
```javascript
if (typeof Object.protoype.myMethod !== "function") {
>    Object.protoype.myMethod = function () {
>       // implementation...
>    };
> }```

### switch模式

按照下面的风格写switch的话，可以提高你的代码可读性和健壮性：
> 
```javascript
var inspect_me = 0,
>     result = '';
> switch (inspect_me) {
> case 0:
>    result = "zero";
>    break;
> case 1:
>    result = "one";
>    break;
> default:
>    result = "unknown";
> }```
需要注意下面几个方面：

1.  将case和switch对齐。
2.  case的内容缩进
3.  每一个case之后都有一个清晰的break
4.  避免顺序往下执行case，非要如此的话，文档一定要写清楚
5.  最后使用default，保证在没有命中case的情况下也有反馈
6.  避免隐藏的类型转换
**Javascrip**t在你比较两个变量的时候会进行类型的转换，这就是为什么 false == 0或者”" == 0会返回true。

为了避免这种隐藏的类型转换带来的迷惑，最好使用===或者!==操作符来比较：
> 
```javascript
var zero = 0;
> if (zero === false) {
>    // not executing because zero is 0, not false
> } 
> 
> // antipattern
> if (zero == false) {
>    // this block is executed...
> }```
还有另外一种流派持这样的观点：当==够用时使用===就是多余的。比如，当你使用typeof的时候你知道会返回string，所以没必要使用严格的检验。然而，JSLint要求严格检验；他最大程度使代码在阅读的时候减少歧义，(“这个==是故意呢还是疏漏？”)。

### 避免使用eval()

如果你在你的代码中使用eval()，那么要记住”eval() is evil”。这个方法会将传入的字符串当做js代码来执行。如果代码是在运行前就确定的，那么没有必要使用eval()。如果代码是在运行时动态确定的，那么也有其他更安全的办法。例如使用方括号形式访问元素的属性：
> 
```javascript
// antipattern
> var property = "name";
> alert(eval("obj." + property));  
> 
> // preferred
> var property = "name";
> alert(obj[property]);```
使用eval()还有安全问题，比如你运行网络上的一段代码，而这段代码又被别人篡改了。在处理Ajax请求返回的JSON数据的时候，最好还是使用浏览器内建的处理方法，如果对于低端的浏览器不支持的，可以从JSON.org上下载对应的处理库。

另外还要记住使用setTimeout、setInterval以及Function的构造函数的是，传入的字符串的参数，js的处理方法跟eval()类似，所以也要注意。因为，js会把你传入的字符串解析执行：
> 
```javascript
// antipatterns
> setTimeout("myFunc()", 1000);
> setTimeout("myFunc(1, 2, 3)", 1000);  
> 
> // preferred
> setTimeout(myFunc, 1000);
> setTimeout(function () {
>    myFunc(1, 2, 3);
> }, 1000);```
使用Function的构造函数，跟eval()差不多，也要注意。这是个非常有用的功能，但是常常被错用。如果你必须使用eval()，那么可以考虑new一个Function来替代。另外的一个好处就是，使用Function的构造函数，函数的作用域在本方法内，这样你使用var声明的变量就不会变成全局的。另外一个防止eval()生成全局变量的办法就是使用匿名函数。

看看下面这个例子，只有un变量最终是全局的：
> 
```javascript
console.log(typeof un); // "undefined"
> console.log(typeof deux); // "undefined"
> console.log(typeof trois); // "undefined"  
> 
> var jsstring = "var un = 1; console.log(un);";
> eval(jsstring); // logs "1"  
> 
> jsstring = "var deux = 2; console.log(deux);";
> new Function(jsstring)(); // logs "2"  
> 
>  jsstring = "var trois = 3; console.log(trois);";
>  (function () {
>     eval(jsstring);
>  }()); // logs "3"  
> 
>  console.log(typeof un); // number
>  console.log(typeof deux); // undefined
>  console.log(typeof trois); // undefined```
eval()和Function构造函数的另一个区别就是eval()会影响到作用域，而Function则相当于一个沙盒。例如：
> 
```javascript
(function () {
>    var local = 1;
>    eval("local = 3; console.log(local)"); // logs 3
>    console.log(local); // logs 3
> }());  
> 
> (function () {
>    var local = 1;
>    Function("console.log(typeof local);")(); // logs undefined
>  }());```

### 使用parseInt()转换处理数字

使用parseInt()你可以将字符串转为数字。这个方法支持第二个表示进制的参数，常常被忽略。问题常常在处理一段以0开始的字符串的时候。在ECMAS3标准中，以0开始表示八进制，但是在ES5中又改了，所以为了避免麻烦，最好还是标明第二个参数。
> 
```javascript
var month = "06",
>     year = "09";
> month = parseInt(month, 10);
> year = parseInt(year, 10);```
在这个例子中，如果你使用parseInt(year)，就会返回0，因为09被认为是8进制数字，然而9是非法的八进制字符，所以返回0。

其他的可以把字符串转为数字的方法有：
> 
```javascript
 +"08" // result is 8
> Number("08") // 8```
这些通常都比parseInt()快一些，因为parseInt并不只是简单的转换。但是如果你的输入是”08 hello”这样的，那么parseInt()也会返回8，但是其他的方法就只能返回NaN。

### 编码规范

编码的时候遵循一定的规范，可以让你的代码增强可移植性，并且更加便于阅读和理解。加入团队的新人，在阅读了代码规范之后，可以更加快速的溶入团队，并理解其他人员开发的代码。

在一些讨论会议上，规范往往都是争论的焦点（比如缩进的形式）。所以如果你打算为你团队的编码规范提一些建议，那就准备好一场激烈的辩论和反对意见。要记住，建立和实施规范是非常重要的。

#### 缩进

代码如果没有缩进，那基本上没法阅读了。比这更糟的是不规范的缩进，看着好像缩进了，但是乱七八糟摸不着头脑。所以缩进的使用必须规范。

有些开发人员喜欢使用tab键来缩进，因为在每一个编辑器里面都可以自己设置想要的tab值。有的人喜欢四个空格。如果团队遵循统一的规范，这也不是什么问题。比如本文就是四个空格，这也是JSLint推荐的。

那么什么该缩进呢？很简单，大括号。这样就是说包括函数体，循环，ifs，switch，以及对象字面量的属性。看看这个例子：
> 
```javascript
function outer(a, b) {
>     var c = 1,
>         d = 2,
>         inner;
>     if (a &gt; b) {
>         inner = function () {
>             return {
>                 r: c - d
>             };
>          };
>      } else {
>          inner = function () {
>              return {
>                  r: c + d
>              };
>          };
>      }
>      return inner;
>  }```

#### 大括号

应该使用大括号，尤其在那些可用可不用的地方，如果你的if语句或者for循环只有一句话，那么大括号不是必须的，但是这种时候最好用大括号。这可以让代码保持一致，并且便于升级。

假设你的for循环只有一句。你可以不用大括号，也不会有什么错误。
> 
```javascript
// bad practice
> for (var i = 0; i &lt; 10; i += 1)
>    alert(i);```
但是假如你以后要在这个循环里面添加其他东西呢？
> 
```javascript
 // bad practice
>  for (var i = 0; i &lt; 10; i += 1)
>     alert(i);
>     alert(i + " is " + (i % 2 ? "odd" : "even"));```
这时候，虽然第二个alert有缩进，但他还是在循环之外的。所以，无论何时，都应该是用大括号。if语句一样：
> 
```javascript
// bad
> if (true)
>    alert(1);
> else
>    alert(2);  
> 
> // better
> if (true) {
>    alert(1);
>  } else {
>     alert(2);
>  }```

#### 大括号位置

开发人员也经常争论大括号的位置，放在同一行还是下一行呢？

在具体的例子中，这是个见仁见智的问题。但也有例外，假如程序根据不同的位置做不同的解析呢？这是因为插入分号机制，js对此并不挑剔，他会在你没有添加分号的行之后帮你添加。这在函数返回一个对象字面量然后大括号写在下一行的时候出问题：
> 
```javascript
// warning: unexpected return value
> function func() {
>    return
>   // 下面的读取不到
>    {
>       name : "Batman"
>    }
> }```
如果你想让这个函数返回一个有name属性的对象字面量，这个函数是做不到的，因为插入的分号，返回的应该是一个undefied值。

所以，最后的结论是，必须使用大括号，并且写在同一行。
> 
```javascript
function func() {
>    return {
>       name : "Batman"
>    };
> }```
关于分号：跟大括号一样，必须写。这不只是推行严格的写程序的规范，更是在必要的时候解决一些不清楚的地方，比如前面的例子。

#### 空格

正确的使用空格也可以增加程序的可读性和连贯性。写句子的时候你会在逗号和句号之后有一些停顿。在js中可以模仿这样的逻辑。

应该使用空格地方有：

1.  循环中的分号之后
2.  循环中的变量初始化for (var i = 0, max = 10; i &lt; max; i += 1) {…}
3.  数组中的逗号分隔符之后var a = [1, 2, 3];
4.  对象字面量中的逗号var o = {a: 1, b: 2}
5.  函数参数间myFunc(a, b, c)
6.  在函数声明时候的大括号前面function myFunc() {}
7.  匿名函数var myFunc = function () {};
另外一些使用空格比较好的地方就是在那些操作符的两边，比如+, -, *, =, &lt;, &gt;, &lt;=, &gt;=, ===, !==, &amp;&amp;, ||, +=,等等。
> 
```javascript
// generous and consistent spacing
> // makes the code easier to read
> // allowing it to "breathe"
> var d = 0,
>     a = b + 1;
> if (a &amp;&amp; b &amp;&amp; c) {
>     d = a % c;
>     a += d;
> }  
> 
>  // antipattern
>  // missing or inconsistent spaces
>  // make the code confusing
>  var d = 0,
>      a = b + 1;
>  if (a &amp;&amp; b &amp;&amp; c) {
>      d = a % c;
>      a += d;
>  }```
最后一个关于空格要注意的，大括号前面的空格。最好使用空格：

在函数定义，id-else，case，循环以及对象字面量的大括号前面使用空格
在大括号}与else、while之间使用空格
反对增加空格的一个说法是增加文件体积，但是在压缩之后并不存在这个问题。提高代码可读性经常被忽视的一个方面就是垂直的空格，你可以使用空行来分开代码，就好像写文章时候的段落一样。

#### 命名规范

可以提高代码移植性和可维护性的一个方面是命名规范。也就是说，在取变量名的时候总是采取一贯的做法。

无论采用什么样的命名规范，其实都不是很重要，重要的是确定下来这个规范，然后遵守它。

##### 构造函数首字母大写

javascript中没有类，但是可以使用new来达到同样的目的。

因为构造函数也是函数，如果能从名字上就能区别它是构造函数还是普通函数，对于开发者是非常有用的。所以将构造函数的首字母大写，普通函数的首字母小写作为提示。这样一眼就能区别。

##### 单词的分隔

当你的变量名或者函数名是由好几个单词构成的时候，如果能顺利区分变量名由那几个单词构成，也是非常不错的体验。这种命名规范成为驼峰式。所谓驼峰式就是以小写字母开始，后面的每个单词第一个字母大写。

对于构造函数第一个字母大写，MyConstructor()，对于普通的函数，就采用驼峰式myFunction(), calculateArea()。

那么变量怎么办呢，有的人使用驼峰式，但是更好的办法是使用下划线来区分。first_name,favorite_bands, 以及 old_company_name。这也可以让你一眼就能区分函数和变量。

##### 其他命名规范

有时候，开发人员也会使用命名规范来替代和弥补一些语言的特性。

例如，在javascript中，并没有提供定义常量的办法（虽然有Number.MAX_VALUE），所以开发人员使用全大写的名称来表示不可更改的常量。var PI = 3.14, MAX_WIDTH = 800。

另外一种规范是使用全局变量名的首字母。这样做可以强化开发者使全局变量最少，并且容易辨认。

另外一种规范是在函数中模拟私有成员。虽然可以在javascript中实现私有变量，但是开发人员为了更加容易区别，所以给他加一个下划线的前缀。例如：
> 
```javascript
var person = {
>     getName: function () {
>         return this._getFirst() + ' ' + this._getLast();
>     },  
> 
>     _getFirst: function () {
>         // ...
>     },
>     _getLast: function () {
>          // ...
>      }
>  };```
在这个例子中，getName是一个公有函数，是API的一部分，_getFirst，_getLast本意是私有的。虽然仍然是公有函数，但hi加上了这个前缀，表示在以后的版本中不保证能运行，所以不应该被直接使用。注意在JSLint中不推荐这样做，除非你设置nomen选项为false。

还有其他几种表示私有成员的规范：

1.  在末尾使用下划线，比如name_以及getElements_
2.  使用一个下划线表示保护成员_protected，两个下划线表示私有成员__private
3.  在firefox中，有些不是语言原生的变量，以两个下划线开始，两个下划线结束__proto__以及__parent__

### 写注释

必须给你的代码写注释，就算它看起来不会被别人接手。有时候，你研究完一个问题，然后你看着代码觉得那是显而易见的，但是过一两周之后回头再看，你也会摸不着头脑的。

当然，也不能过分的注释：每个变量每一行代码都注释。但是通常都需要对函数的功能，参数，返回值写文档，以及一些其他的复杂的逻辑和算法。想想，你的代码的阅读者，只需要读注释就能大体上了解你的代码在做什么需要什么，这比直接读代码理解要快的多。当你有五六行的代码是做一个具体的任务，那么阅读者就可以通过一行代码了解你的目的，然后跳过这些代码。关于注释，没有硬性的比例说是多少代码需要多少注释。有时候，有些代码（比如正则表达式）注释的内容肯定比代码本身多。

写注释是必须遵守的规范，而且要保持注释的更新，一个过时的注释带给人的迷惑还不如不写注释。（[译文](http://net.tutsplus.com/tutorials/javascript-ajax/the-essentials-of-writing-high-quality-javascript/)）

译文地址：http://rockux.com/archives/%E5%A6%82%E4%BD%95%E7%BC%96%E5%86%99%E9%AB%98%E8%B4%A8%E9%87%8F%E7%9A%84javascript%E4%BB%A3%E7%A0%81