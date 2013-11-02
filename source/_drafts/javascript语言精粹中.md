title: "javascript语言精粹中"
id: 699
date: 2011-06-19 17:05:03
tags: 
categories: 
- 网络技术
---

if(typeof Object.beget!=="function"){
	Object.beget = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	}
}

Function.prototype.method = function(name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
}