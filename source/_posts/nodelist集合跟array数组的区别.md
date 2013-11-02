title: "NodeList集合跟Array数组的区别"
id: 689
date: 2011-05-20 17:27:16
tags:
- javascript
categories:
- 前端开发
---
首先来看看什么是**NodeList**，NodeList跟arguments都不是普通的数组，他们有数组的一些基本属性但是又不完全是数组。下面是在[Mozilla](https://developer.mozilla.org/En/DOM/NodeList)上面找到的定义：
> This is a commonly used type which is a collection of nodes returned by getElementsByTagName, getElementsByTagNameNS, and Node.childNodes. The list is live, so changes to it internally or externally will cause the items they reference to be updated as well. Unlike NamedNodeMap, NodeList maintains a particular order (document order). The nodes in a NodeList are indexed starting with zero, similarly to JavaScript arrays, but a NodeList is not an array.
由字面意思来看**NodeList**是DOM操作（getElementsByTagName等）取出来的集合，是集合而不是普通的数组，但是他们有数组的一些属性，例如length、下标索引，但是他们也有自己的属性，例如item，另外NodeList最大的特点就是时效性（live）。

### NodeList的时效性

我们来看下面的代码：

```html


*   index0
*   index1
*   index2
*   index3
*   index4
```
javascript代码如下：

```javascript

var myUl = document.getElementById('nodelist');
var lis = myUl.getElementsByTagName('li');
```
lis是一个NodeList集合，具有时效性，所谓的时效性就是我们在修改li的同时，会反映到lis上来，这与array是不同的，例如我们把第一个li插入到ul的底部，那么lis也会发生相应的变化：

```javascript

//把第一个li插入的ul的底部
myUl.appendChild(myUl.getElementsByTagName('li').item(0));
console.log(lis[0]);//输出的是原来ul的第二个li
```
所以我们应该在写代码的时候注意**NodeList**的时效性，不然就会犯一些错误，<!--more-->
例如下面的代码（来自[Jeff Wong](http://www.cnblogs.com/jeffwongishandsome/archive/2010/07/07/1773144.html)）：

```html

<div id="divAnchor">
        [link test](http://js8.in)
</div>
```

```javascript

var anchors = document.getElementsByTagName("a"); 
for (i = 0; i < anchors.length; i++) {
var ele= document.createElement("a");
ele.setAttribute("href", "http://js8.in/"); 
ele.appendChild(document.createTextNode("new link test"));
document.getElementById("divAnchor").appendChild(ele); //div附加一个新链接
}  
```
本意是在div内，已经存在的a元素后再附加一个a元素。但是，您可以运行一下，浏览器crash掉了吧？楼猪这里IE直接挂掉，FF提示脚本正忙，是否停止脚本运行，点击停止后，页面内已经生成了n多个a链接。这是因为NodeList的length会不断变化上升，循环循环再循环，最后成了个死循环。

### NodeList转化为数组

NodeList具有length，下标索引这些数组的属性特征，但是我们不可以使用数组的push、pop、shift、unshift等数组原生的方法，这样我们就不能使用数组的原生方法来操作NodeList，所以我们要吧NodeList转化为数组，方便操作。下面的代码就可以把NodeList转化为普通的数组。

```javascript

function collectionToArray(collection){  
    var ary = [];  
    for(var i=0, len = collection.length; i < len; i++){  
        ary.push(collection[i]);  
    }  
    return ary;  
}  
```