title: "javascript获取光标位置以及设置光标位置"
id: 466
date: 2010-01-29 19:31:54
tags: 
categories: 
- JavaScript
- 网络技术
---

在项目开发中经常遇到**input**等设置光标位置到最后的问题，今天我查了一下Google，找到了在**IE**、**Firefox**、**Opera**等主流浏览器的获取光标位置（getCursortPosition）以及设置**光标位置**（setCursorPosition）的函数。
> <pre lang="javascript">function getCursortPosition (ctrl) {//获取光标位置函数
> 	var CaretPos = 0;	// IE Support
> 	if (document.selection) {
> 	ctrl.focus ();
> 		var Sel = document.selection.createRange ();
> 		Sel.moveStart ('character', -ctrl.value.length);
> 		CaretPos = Sel.text.length;
> 	}
> 	// Firefox support
> 	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
> 		CaretPos = ctrl.selectionStart;
> 	return (CaretPos);
> }</pre>
<!--more-->
PS：参数ctrl为input或者textarea对象
> <pre lang="javascript">function setCaretPosition(ctrl, pos){//设置光标位置函数
> 	if(ctrl.setSelectionRange)
> 	{
> 		ctrl.focus();
> 		ctrl.setSelectionRange(pos,pos);
> 	}
> 	else if (ctrl.createTextRange) {
> 		var range = ctrl.createTextRange();
> 		range.collapse(true);
> 		range.moveEnd('character', pos);
> 		range.moveStart('character', pos);
> 		range.select();
> 	}
> }</pre>
PS：参数ctrl为input或者textarea对象，pos为光标要移动到的位置。
深入阅读推荐：《[javascript设置光标位置到结尾并显示出来]( http://js8.in/466.html "Javascript设置光标位置到结尾并显示出来")》