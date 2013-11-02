title: "ECMAScript 262 5th ：执行环境一些概念解释"
id: 1093
date: 2013-01-01 03:12:37
tags:
- ecmascript
- 执行环境
categories:
- 读书笔记
---

## 可执行代码

**ECMAScript 5th**规定了3种**可执行代码**：Global code、Eval code和Function code。

根据名字就已经知道，`Global code`和`Eval code`分别对应全局代码和`eval`函数中执行的代码。

三种可执行代码中最为复杂的就是`Function code`，即函数代码。因为javascript的特性，所以`Function code`中还可以嵌入`Function code`，导致了`Function`的执行环境会较为复杂。

## 执行环境（执行上下文）

当javascript引擎开始执行（进入）一段可执行代码时，就会生成一个**执行环境**（`Execution Context`，或称**执行上下文**）。

javascript引擎通过一个栈（`Stack`）来维护执行环境，当进入一个执行环境，则将当前运行的执行环境压入到这个栈的顶部，代码表示：
```javascript
var ECStack = [];//维护执行环境的栈
function enterExecutabCode(){
    var ec = new ExecutionContext();
    ECStack.push(ec);
}
```

一个执行环境是由：`LexicalEnvironment`、`VariableEvironment`和`ThisBinding`组成的。
```javascript
function ExecutionContext(){
    return {
        LexicalEnvironment,
        VariableEnvironment,
        ThisBinding
    }
}
```

## 词法环境（Lexical Environments）注意是复数哦~

一个词法环境对象包括：环境数据（`Environment  Record`）和外部环境（`outer Lexical Environment`）。

### 外部环境（outer Lexical Environment）

表示外层函数的词法环境，有两种：`null`（`global`环境），或者外层函数的词法环境（嵌套函数）

### 环境数据(记录)（Environment Record）

有两种环境数据：`declarative environment records` 和 `object environment records`，因为存在两种类型的环境数据，所以词法环境的实现类型包括了两种：`DecarativeEnvironment`和`ObjectEnvironment`。

#### Declarative environment records

常见标识符绑定基本都是这个类型，例如函数定义，`var`声明，`try`的`catch`子句

#### Object environment records

包括两种一种是程序级别的（`Program`），另外一种是with语句，因为这两种绑定标识符过程需要传入一个对象做为环境数据的属性值。

继续说环境数据，环境数据存在于词法环境或者变量环境中，它包含了一个绑定对象（`bindingObject`），这个对象是一种键值对象，即有`name`和value一一对应关系，其中`name`就是标识符，`value`则为对应的变量值。

既然环境数据是保存数据的地方，必然有一些方法用于存储数据和读取数据。所以环境数据常见的方法有：
<!--more-->

> **HasBinding(N)**：是否绑定一个标识符？返回`true`或者`false`
> **CreateMutableBinding(N, D)**：创建一个名字为N的新记录，并且初始值为undefined，D表示是否可删除，`true`为可以删除（通过运算符delete操作），即对应的`DontDelete`
> **SetMutableBinding(N, V, S)**：给N设置值V，S为严格模式的标志，如果为`true`，并且绑定（可以认为是一种赋值）不能完成，则抛出`TypeError`的异常
> **GetBindingValue(N, S)**：获取N的值，当S为`true`时，如果绑定不存在或者未初始化则抛出`ReferenceError`异常
> **DeleteBinding(N)**：删除N的绑定，如果存在N的绑定则删除，并且返回`true`，如果绑定不存在则返回`true`，如果绑定存在并且不能删除（`DontDelete=true`）则返回false
> **ImplicitThisValue**：返回this的值，如果是Declarative Environment Records则总是返回`undefined`；如果是Object Environment Records：`provideThis==true`则返回bindingObject，否则返回`undefined`

此外Declarative Environment Records有两个额外的方法：


> **CreateImmutableBinding(N)**：创建一个名字为N的新的不初始化的绑定
> **InitializeImmutableBinding(N, V)**：设置一个存在的并且未初始化的N的值为V

所以运用我们的原型知识和面向对象知识，我们可以将上面的过程设计成下面的代码（当然这个过程不是这么简单的，至少对于ObjectEnvironmentRecord是不对的）：
```javascript
function DeclarativeEnvironmentRecord(){
    this.bindingObject = {};
}
function ObjectEnvironmentRecord(O){
    this.bindingObject = O;
    this.provideThis = false;
}
DeclarativeEnvironmentRecord.prototype = new EnvironmentRecord();
ObjectEnvironmentRecord.prototype = new EnvironmentRecord();

EnvironmentRecord.prototype.CreateImmutableBinding = function(N){
    var envRec = this.bindingObject;
    //断言！
    if(!this.HasBinding(N)){
        envRec[N] = {
            uninitialised: true,//未初始化
            type:'immutable'
        }
    }
}
EnvironmentRecord.prototype.InitializeImmutableBinding = function(N,V) {
    var envRec = this.bindingObject;
    //断言！
    if(this.HasBinding(N) && envRec[N].initialised === false){
        envRec[N].value = V;
        envRec[N].initialised = true;
    }
}
EnvironmentRecord.prototype.HasBinding = function(N){
    var envRec = this.bindingObject;
    if(N in envRec){
        return true;
    }else{
        return false;
    }
}
EnvironmentRecord.prototype.CreateMutableBinding = function(N, D){
    var envRec = this.bindingObject;
    //有个断言
    if(!this.HasBinding(N)){
        envRec[N] = {
            value:undefined,
            type:'mutable',//是否可变
            DontDelete:D
        }
    }

}
EnvironmentRecord.prototype.SetMutableBinding = function(N, V, S){
    var envRec = this.bindingObject;
    //有个断言
    if(this.HasBinding(N)){
        if(envRec[N].type === 'mutable'){
            envRec[N].value = V;
        }else{
            //有修改immutable的企图
            if( S === true ){
                throw new TypeError();
            }
        }
    }

}

EnvironmentRecord.prototype.GetBindingValue = function(N, S){
    var envRec = this.bindingObject;
    //有个断言
    if(this.HasBinding(N)){
        if(envRec[N].type === 'immutable' && envRec[N].initialised===false){
            if( S === false){
                return undefined;
            }else{
                throw new ReferenceError();
            }
        }else{
            return envRec[N];
        }
    }

}

EnvironmentRecord.prototype.DeleteBinding = function(N){
    var envRec = this.bindingObject;
    if(!this.HasBinding(N)){
        return true;
    }
    if(envRec[N].DontDelete === true){
        return false;
    }
    delete envRec[N];
    return true;
}

EnvironmentRecord.prototype.ImplicitThisValue = function(){
    return undefined;
}

EnvironmentRecord.prototype.ImplicitThisValue = function(){
    if(this.provideThis===true){
        return this.bindingObject;
    }
    return undefined;
}
```

### 创建词法环境

因为词法环境的**环境数据**有两种，所以也存在两种对应的词法环境创建方式：`NewDeclarativeEnvironment` 和 `NewObjectEnvironment`

```javascript

function NewDeclarativeEnvironment(E){
    var env = new LexicalEnvironment();
    var envRec = new DeclarativeEnvironmentRecord();
    env.EnvironmentRecord = envRec;
    env.outerLexicalEnvironment = E;
    return env;
}

function NewObjectEnvironment(O, E) {
    var env = new LexicalEnvironment();
    var envRec = new ObjectEnvironmentRecord(O);
    env.EnvironmentRecord = envRec;
    env.outerLexicalEnvironment = E;
    return env;
}
```

### 执行环境的LexicalEnvironment

在每个执行环境都有并且只有一个与之关联的词法环境`LexicalEnvironment`， `LexicalEnvironment `是一个 `LexicalEnvironments` （注意这是个复数）队形。
在代码执行过程中，如果需要解析变量，从词法环境对象中进行解析，需要取值，则从词法环境的环境数据（`Environment  Record`）中读取，所以

### 执行环境的变量环境VariableEnvironment

一个执行环境中的变量环境也是唯一的，变量环境和词法环境（`LexicalEnvironment`）一样都是一个`LexicalEnvironments`（注意是复数）对象，（这个地方有点绕，所以注意是中间不带空格的），而且两者一开始是相等的，即是一个东西！词法环境在执行过程中可能改变，但是变量环境是不变化的。

ps：`ECMA 5th`出现了`LexicalEnvironment`和`VariableEnvironment`的两个差不多相同的概念，两者都可以看城市一个`LexicalEnvironments`的实例，并且刚开始是相等的。

### This绑定

很简单，可以看成this关键字的绑定。

## 全局环境（Global Environment）

全局环境是一种特别的词法环境，它的`Environment Record`是`Object Environment` Record类型，并且是global对象（如宿主对象`window`），`outer` 是`null`。

## 变量的查找

下面来说说变量是怎样查找的，通过前面的介绍，我们知道，变量不是单独存在的，而是依附在一个`EnvironmentRecord`的`bindingObject`中，进一步说：一个变量的取值是关系到它自己所处的环境的，这个环境就是执行环境的词法环境（`LexicalEnvironment`）。所以要找一个变量还要确认在哪里找，即从哪个执行环境的`LexicalEnvironment`中找。

确定了执行环境，还要知道变量名（即一个标识符），然后在`EnvironmentRecord中查找，如果找不到，则从`outer Lexical Environment`中查找，如此一直找到`null`，如果找不到，则返回`undefined`。

```javascript
function GetIdentifierReference(env, name){
    if(env===null){
        return new Reference(name,undefined);
    }
    var envRec = env.LexicalEnvironment.EnvironmentRecord;

    if (envRec.hasBinding(name)) {
        return new Reference(name, envRec);
    }
    return GetIdentifierReference(env.outerLexicalEnvironment, name);
}
function Reference(name, base, strict){
    this.base = base;
    this.name = name;
    this.strict = strict || false;
}
function GetValue(V){
    //other
    if(V.base instanceof EnvironmentRecord){
        return V.base.GetBindingValue(V.name, V.strict);
    }
}
```
