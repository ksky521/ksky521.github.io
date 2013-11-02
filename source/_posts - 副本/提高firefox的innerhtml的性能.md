title: "提高Firefox的innerHTML()的性能"
id: 607
date: 2010-09-05 23:59:33
tags: 
categories: 
- JavaScript
- 网络技术
---

Firefox 下**innerHTML**在操作量大了以后性能下降很厉害,有人写了个提高innhtml性能的代替方法：
<pre lang="javascript">function replaceHtml(el, html) {
var oldEl = typeof el === "string" ? document.getElementById(el) : el;
/*@cc_on // 原始的 innerHTML 在 IE 中的性能好一点
oldEl.innerHTML = html;
return oldEl;
@*/
var newEl = oldEl.cloneNode(false);
newEl.innerHTML = html;
oldEl.parentNode.replaceChild(newEl, oldEl);
/* 一旦我们从 DOM 上移除老的元素，则返回新的元素引用。*/
return newEl;
};</pre>
可以直接用`el=replaceHtml(el, newHtml)`代替`el.innerHTML=newHtml`。

速度到底有多大提升，还得测试说话。作者提供了一个测试页面：http://stevenlevithan.com/demo/replaceHtml.html

此方法大大提高了 innerHTML 在 Firefox 和 Safari 上的性能。replaceHtml() 在 Firefox 2.0.0.6 里 destroy 与 replace 的速度各快了 473 倍以及 50 倍。而在 Safari 3.0.3 beta 上则是 create 100 倍，replace 50 倍。
<!--more-->
对于 Opera 也依然有性能提高，只是提高幅度没有上面两种浏览器惊人而已，

唯在 IE 中，则原始的 **innerHTML **的方法更效率点。

扩展阅读：

《[When innerHTML isn’t Fast Enoug](http://blog.stevenlevithan.com/archives/faster-than-innerhtml)h》| 《[innerHTML and DOM Methods](http://www.dustindiaz.com/innerhtml-vs-dom-methods/)》| [原文链接](http://www.planabc.net/2008/03/04/innerhtml_and_dom_methods/)