title: "javascript contains方法来判断元素包含关系"
id: 934
date: 2012-01-04 17:49:20
tags:
- javascript
- DOM
categories:
- 前端开发
---

IE中的**contains**方法可以判断A元素是否包含B元素，如果包含则返回true，否则返回false，在开发中会在事件代理处理上面用到。W3C的方法是**compareDocumentPosition**，所以综上来说：JS通过contains和compareDocumentPosition方法来确定DOM节点间的关系,判断一个元素(对象)是否为另一个元素的子元素。
IE的contains方法很简单，但是W3C的`DOMElement.contains(DOMNode)`方法会返回却是一个数值。

## DOMElement.contains(DOMNode)

link：[https://developer.mozilla.org/En/DOM/Node.compareDocumentPosition](https://developer.mozilla.org/En/DOM/Node.compareDocumentPosition)。

`DOMElement.contains(DOMNode)`

返回的不是一个布尔值，而是一个很奇怪的数值，它是通过如下方式累加计算出来的：

Bits | Number | Meaning
---- | ------ | ------
000000 | 0 | 元素一致
000001 | 1 | 节点在不同的文档（或者一个在文档之外）
000010 | 2 | 节点 B 在节点 A 之前
000100 | 4 | 节点 A 在节点 B 之前
001000 | 8 | 节点 B 包含节点 A
010000 | 16 | 节点 A 包含节点 B
100000 | 32 | 浏览器的私有使用


<!--more-->
综上，来个@司徒正美 大大的方案：
```javascript
var contains  = function(root, el) {
	 if (root.compareDocumentPosition)
		 return root === el || !!(root.compareDocumentPosition(el) & 16);
	 if (root.contains && el.nodeType === 1){
		 return root.contains(el) && root !== el;
	 }
	 while ((el = el.parentNode))
		 if (el === root) return true;
	 return false;
 }
```
