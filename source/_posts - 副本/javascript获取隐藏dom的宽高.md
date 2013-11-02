title: "javascript获取隐藏dom的宽高"
id: 781
date: 2011-09-27 22:50:15
tags:
- DOM
- javascript
categories:
- 前端开发
---

一个隐藏的DOM是获取不到宽高的，如果想要获取，采用下面的方法：
首先clone一个DOM，设置`position:absolute`，然后设置top为一个比较大的负值，然后使其显示出来，最后获取到了DOM的宽高后，将其remove。

具体代码如下：
<!--more-->

```javascript
function getCss(elem, css){
	if (window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[css];
	}else if (elem.currentStyle) {
		return elem.currentStyle[css];
	}else {
		return elem.style[css];
	}
}
function getWH(dom){
	var get = function(elem){
		var wh = {};
		'Width Height'.replace(/[^ ]+/g, function(i){
			var a = i.toLowerCase();
			wh[a] = elem['offset' + i] || elem['client' + i];
		});
		return wh;
	};
	if (getCss(dom, 'display') === 'none') {
		var nDom = dom.cloneNode(true);
		nDom.style.position = 'absolute';
		nDom.style.top = '-3000px';
		nDom.style.display = 'block';
		document.getElementsByTagName('body')[0].appendChild(nDom);
		var wh = get(nDom);
		nDom.parentNode.removeChild(nDom);
		return wh;
	}
	return get(dom);
}
//test
console.log(getWH(document.getElementById('content')));
var domA = document.createElement("a"), _ostyle = "position:absolute;z-index:999999;width:92px;height:22px;position:absolute;display:none;";
domA.setAttribute("style", _ostyle);
domA.style.cssText = _ostyle;
domA.setAttribute("href", "javascript:void(0);");
document.getElementsByTagName('body')[0].appendChild(o);
console.log(getWH(domA));
```
还有其他更好的方法欢迎提出来。
