title: "javascript的词法作用域"
id: 745
date: 2011-08-15 16:35:22
tags:
- javascript
- 作用域
categories:
- 前端开发
---

大家应该写过下面类似的代码吧，其实这里我想要表达的是有时候一个方法定义的地方和使用的地方会相隔十万八千里，那方法执行时，它能访问哪些变量，不能访问哪些变量，这个怎么判断呢？这个就是我们这次需要分析的问题——**词法作用域**
```javascript
var classA = function(){
    this.prop1 = 1;
}
classA.prototype.func1 = function(){
    var that = this,
        var1 = 2;

    function a(){
        return function(){
            alert(var1);
            alert(this.prop1);
        }.apply(that);
    };
    a();
}
var objA = new ClassA();
objA.func1();
```
**词法作用域**：变量的作用域是在定义时决定而不是执行时决定，也就是说词法作用域取决于源码，通过静态分析就能确定，因此词法作用域也叫做静态作用域。 with和eval除外，所以只能说JS的作用域机制非常接近词法作用域（Lexical scope）。

下面通过几个小小的案例，开始深入的了解对理解词法作用域和**闭包**必不可少的，JS执行时底层的一些概念和理论知识。

## 经典案列重现

#### 1、经典案例一

```javascript
/*全局（window）域下的一段代码*/
function a(i) {
    var i;
    alert(i);
};
a(10);```
疑问：上面的代码会输出什么呢？
答案：没错，就是弹出10。具体执行过程应该是这样的

> a 函数有一个形参 i，调用 a 函数时传入实参 10，形参 i=10
> 接着定义一个同名的局部变量 i，未赋值
> alert 输出 10

思考：局部变量 i 和形参 i 是同一个存储空间吗？

#### 2、经典案例二

```javascript
/*全局（window）域下的一段代码*/
function a(i) {
    alert(i);
    alert(arguments[0]); //arguments[0]应该就是形参 i
    var i = 2;
    alert(i);
    alert(arguments[0]);
};
a(10);```
疑问：上面的代码又会输出什么呢？（（ 10,10,2,10 || 10,10,2,2 ））
答案：在FireBug中的运行结果是第二个10,10,2,2，猜对了… ，下面简单说一下具体执行过程
<!--more-->

> a 函数有一个形参i，调用 a 函数时传入实参 10，形参 i=10
> 第一个 alert 把形参 i 的值 10 输出
> 第二个 alert 把 arguments[0] 输出，应该也是 i
> 接着定义个局部变量 i 并赋值为2，这时候局部变量 i=2
> 第三个 alert 就把局部变量 i 的值 2 输出
> 第四个alert再次把 arguments[0] 输出

思考：这里能说明局部变量 i 和形参 i 的值相同吗？

#### 3、经典案例三

```javascript
/*全局（window）域下的一段代码*/
function a(i) {
    var i = i;
    alert(i);
};
a(10);```
疑问：上面的代码又又会输出什么呢？（（ undefined || 10 ））
答案：在FireBug中的运行结果是 10，下面简单说一下具体执行过程

> 第一句声明一个与形参 i 同名的局部变量 i，根据结果我们知道，后一个 i 是指向了
> 形参 i，所以这里就等于把形参 i 的值 10 赋了局部变量 i
> 第二个 alert 当然就输出 10

思考：结合案列二，这里基本能说明局部变量 i 和形参 i 指向了同一个存储地址！

#### 4、经典案例四

```javascript
/*全局（window）域下的一段代码*/
var i=10;
function a() {
    alert(i);
    var i = 2;
    alert(i);
};
a();```
疑问：上面的代码又会输出什么呢？（小子，看这回整不死你！哇哈哈，就不给你选项）
答案：在FireBug中的运行结果是 undefined, 2，下面简单说一下具体执行过程

> 第一个alert输出undefined
> 第二个alert输出 2

思考：到底怎么回事儿？

#### 5、经典案例五…………..N

看到上面的几个例子，你可能会想，怎么可能，我写了几年的 js 了，怎么这么简单例子也会犹豫，结果可能还答错了。其实可能原因是：我们能很快的写出一个方法，但到底方法内部是怎么执行的呢？执行的细节又是怎么样的呢？你可能没有进行过深入的学习和了解。要了解这些细节，那就需要了解 JS 引擎的工作方式，所以下面我们就把 JS 引擎对一个方法的解析过程进行一个稍微深入一些的介绍

## 代码解析过程

#### 1、javascript执行顺序

编译型语言，编译步骤分为：词法分析、语法分析、语义检查、代码优化和字节生成。
解释型语言，通过词法分析和语法分析得到语法分析树后，就可以开始解释执行了。这里是一个简单原始的关于解析过程的原理，仅作为参考，详细的解析过程（各种JS引擎还有不同）还需要更深一步的研究

**JavaScript**执行过程，如果一个文档流中包含多个script代码段（用script标签分隔的js代码或引入的js文件），它们的运行顺序是：

1.  读入第一个代码段（js执行引擎并非一行一行地执行程序，而是一段一段地分析执行的）
2.  做词法分析和语法分析，有错则报语法错误（比如括号不匹配等），并跳转到步骤5
3.  对【var】变量和【function】定义做“预解析“（永远不会报错的，因为只解析正确的声明）
4.  执行代码段，有错则报错（比如变量未定义）
5.  如果还有下一个代码段，则读入下一个代码段，重复步骤2
6.  结束

#### 2、特殊说明

全局域（window）域下所有JS代码可以被看成是一个“匿名方法“，它会被自动执行，而此“匿名方法“内的其它方法则是在被显示调用的时候才被执行

#### 3、关键步骤

上面的过程，我们主要是分成两个阶段

**javascript解析**：就是通过语法分析和预解析构造合法的语法分析树。
**javascript执行**：执行具体的某个function，JS引擎在执行每个函数实例时，都会创建一个执行环境（ExecutionContext）和活动对象（activeObject）（它们属于宿主对象，与函数实例的生命周期保持一致）

#### 3、关键概念

到这里，我们再更强调以下一些概念，这些概念都会在下面用一个一个的实体来表示，便于大家理解

**语法分析树**（SyntaxTree）：可以直观地表示出这段代码的相关信息,具体的实现就是JS引擎创建了一些表，用来记录每个方法内的变量集（variables），方法集（functions）和作用域（scope）等。

**执行环境**（ExecutionContext）：可理解为一个记录当前执行的方法【外部描述信息】的对象,记录所执行方法的类型，名称，参数和活动对象（activeObject）。

**活动对象**（activeObject）：可理解为一个记录当前执行的方法【内部执行信息】的对象,记录内部变量集（variables）、内嵌函数集（functions）、实参（arguments）、作用域链（scopeChain）等执行所需信息，其中内部变量集（variables）、内嵌函数集（functions）是直接从第一步建立的语法分析树复制过来的。

**词法作用域**：变量的作用域是在定义时决定而不是执行时决定，也就是说词法作用域取决于源码，通过静态分析就能确定，因此词法作用域也叫做静态作用域。 with和eval除外，所以只能说JS的作用域机制非常接近词法作用域（Lexical scope）。

**作用域链**：词法作用域的实现机制就是作用域链（scopeChain）。作用域链是一套按名称查找（Name Lookup）的机制，首先在当前执行环境的 ActiveObject 中寻找，没找到，则顺着作用域链到父 ActiveObject 中寻找，一直找到全局调用对象（Global Object）。

#### 4、实体表示

## javascript解析模拟

估计，看到这儿，大家还是很朦胧吧，什么是语法分析树，语法分析树到底长什么样子，作用域链又怎么实现的，活动对象又有什么内容等等，还是不是太清晰，下面我们就通过一段实际的代码来模拟整个解析过程，我们就把语法分析树，活动对象实实在在的创建出来，理解作用域，作用域链的到底是怎么实现的

#### 1、模拟代码

```javascript
/*全局（window）域下的一段代码*/
var i = 1,j = 2,k = 3;
function a(o,p,x,q){
    var x = 4;
        alert(i);
    function b(r,s) {
        var i = 11,y = 5;
            alert(i);
        function c(t){
          var z = 6;
                alert(i);
        };
            //函数表达式
        var d = function(){
                alert(y);
            };
            c(60);
            d();
    };
        b(40,50);
}
a(10,20,30);
```

#### 2、语法分析树

上面的代码很简单，就是先定义了一些全局变量和全局方法，接着在方法内再定义局部变量和局部方法，现在JS解释器读入这段代码开始解析，前面提到 JS 引擎会先通过语法分析和预解析得到语法分析树，至于语法分析树长什么样儿，都有些什么信息。

下面我们以一种简单的结构：一个 JS 对象(为了清晰表示个各种对象间的引用关系，这里的只是伪对象表示，可能无法运行)来描述语法分析树（这是我们比较熟悉的，实际结构我们不去深究，肯定复杂得多，这里是为了帮助理解解析过程而特意简化）。
```javascript
/**
* 模拟建立一棵语法分析树，存储function内的变量和方法
*/
var SyntaxTree = {
        // 全局对象在语法分析树中的表示
    window: {
        variables:{
            i:{ value:1},
            j:{ value:2},
            k:{ value:3}
        },
        functions:{
            a: this.a
        }
    },

    a:{
        variables:{
            x:'undefined'
        },
        functions:{
            b: this.b
        },
        scope: this.window
    },

    b:{
        variables:{
            y:'undefined'
        },
        functions:{
            c: this.c,
            d: this.d
        },
        scope: this.a
    },

    c:{
        variables:{
            z:'undefined'
        },
        functions:{},
        scope: this.b
    },

    d:{
        variables:{},
        functions:{},
        scope: {
           myname:d,
           scope: this.b
        }
    }
};
```
上面就是关于语法分析树的一个简单表示，正如我们前面分析的，语法分析树主要记录了每个 function 中的变量集（variables），方法集（functions）和作用域（scope）。

### 语法分析树关键点

1.  变量集（variables）中，只有变量定义，没有变量值，这时候的变量值全部为“undefined”
2.  作用域（scope），根据词法作用域的特点，这个时候每个变量的作用域就已经明确了，而不会随执行时的环境而改变。【什么意思呢？就是我们经常将一个方法 return 回去，然后在另外一个方法中去执行，执行时，方法中变量的作用域是按照方法定义时的作用域走。其实这里想表达的意思就是不管你在多么复杂，多么远的地方执行该方法，最终判断方法中变量能否被访问还是得回到方法定义时的地方查证】
3.  作用域（scope）建立规则:
&nbsp;&nbsp;&nbsp;&nbsp;a.对于函数声明和匿名函数表达式来说，[scope]就是它创建时的作用域
&nbsp;&nbsp;&nbsp;&nbsp;b.对于有名字的函数表达式，[scope]顶端是一个新的JS对象（也就是继承了Object.prototype），这个对象有两个属性，第一个是自身的名称，第二个是定义的作用域，第一个函数名称是为了确保函数内部的代码可以无误地访问自己的函数名进行递归。

#### 3、执行环境与活动对象

语法分析完成，开始执行代码。我们调用每一个方法的时候，JS 引擎都会自动为其建立一个执行环境和一个活动对象，它们和方法实例的生命周期保持一致，为方法执行提供必要的执行支持，针对上面的几个方法，我们这里统一为其建立了活动对象（按道理是在执行方法的时候才会生成活动对象，为了便于演示，这里一下子定义了所有方法的活动对象），具体如下：
执行环境
```javascript
/**
* 执行环境:函数执行时创建的执行环境
*/
var ExecutionContext = {
    window: {
        type: 'global',
        name: 'global',
        body: ActiveObject.window
    },

    a:{
        type: 'function',
        name: 'a',
        body: ActiveObject.a,
        scopeChain: this.window.body
    },

    b:{
        type: 'function',
        name: 'b',
        body: ActiveObject.b,
        scopeChain: this.a.body
    },

    c:{
        type: 'function',
        name: 'c',
        body: ActiveObject.c,
        scopeChain: this.b.body
    },

    d:{
        type: 'function',
        name: 'd',
        body: ActiveObject.d,
        scopeChain: this.b.body
    }
}
```
上面每一个方法的执行环境都存储了相应方法的类型（function）、方法名称（funcName）、活动对象（ActiveObject）、作用域链（scopeChain）等信息,其关键点如下：

body属性，直接指向当前方法的活动对象
scopeChain属性，作用域链，它是一个链表结构，根据语法分析树中当前方法对应的scope属性，它指向scope对应的方法的活动对象（ActivceObject），变量查找就是跟着这条链条查找的
活动对象
```javascript
/**
* 活动对象：函数执行时创建的活动对象列表
*/
var ActiveObject = {
        window: {
        variables:{
            i: { value:1},
            j: { value:2},
            k: { value:3}
        },
        functions:{
            a: this.a
        }
    },

    a:{
        variables:{
            x: {value:4}
        },
        functions:{
            b: SyntaxTree.b
        },
        parameters:{
            o: {value: 10},
            p: {value: 20},
            x: this.variables.x,
            q: 'undefined'
        },
        arguments:[this.parameters.o,this.parameters.p,this.parameters.x]
    },

    b:{
        variables:{
            y:{ value:5}
        },
        functions:{
            c: SyntaxTree.c,
            d: SyntaxTree.d
        },
        parameters:{
            r:{value:40},
            s:{value:50}
        },
        arguments:[this.parameters.r,this.parameters.s]
    },

    c:{
        variables:{
            z:{ value:6}
        },
        functions:{},
        parameters:{
            u:{value:70}
        },
        arguments:[this.parameters.u]
    },

    d:{
        variables:{},
        functions:{},
        parameters:{},
        arguments:[]
    }
}
```
上面每一个活动对象都存储了相应方法的内部变量集（variables）、内嵌函数集（functions）、形参（parameters）、实参（arguments）等执行所需信息，活动对象关键点

创建活动对象，从语法分析树复制方法的内部变量集（variables）和内嵌函数集（functions）
方法开始执行，活动对象里的内部变量集全部被重置为 undefined

创建形参（parameters）和实参（arguments）对象，同名的实参，形参和变量之间是【引用】关系
执行方法内的赋值语句，这才会对变量集中的变量进行赋值处理

变量查找规则是首先在当前执行环境的 ActiveObject 中寻找，没找到，则顺着执行环境中属性 ScopeChain 指向的 ActiveObject 中寻找，一直到 Global Object（window）

方法执行完成后，内部变量值不会被重置，至于变量什么时候被销毁，请参考下面一条
方法内变量的生存周期取决于方法实例是否存在活动引用，如没有就销毁活动对象
6和7 是使闭包能访问到外部变量的根本原因

## 重释经典案例

#### 案列一二三

根据【在一个方法中，同名的实参，形参和变量之间是引用关系，也就是JS引擎的处理是同名变量和形参都引用同一个内存地址】，所以才会有二中的修改arguments会影响到局部变量的情况出现

#### 案例四

根据【JS引擎变量查找规则，首先在当前执行环境的 ActiveObject 中寻找，没找到，则顺着执行环境中属性 ScopeChain 指向的 ActiveObject 中寻找，一直到 Global Object（window）】，所以在四中，因为在当前的ActiveObject中找到了有变量 i 的定义，只是值为 “undefined”，所以直接输出 “undefined” 了

## 总结

以上是我在学习和使用了JS一段时间后,为了更深入的了解它, 也为了更好的把握对它的应用, 从而在对闭包的学习过程中,自己对于词法作用域的一些理解和总结,中间可能有一些地方和真实的JS解释引擎有差异,因为我只是站在一个刚入门的前端开发人员而不是系统设计者的角度上去分析这个问题，希望能对JS开发者理解此法作用域带来一些帮助！


