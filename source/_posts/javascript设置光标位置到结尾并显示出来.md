title: "Javascript设置光标位置到结尾并显示出来"
id: 467
date: 2010-01-29 20:58:13
tags:
- javascript
- 网络技术
categories:
- 前端开发
---
今天同事问一个关于**光标**移动到输入框最后的问题，问题得到了解决（详情请见《[Javascript获取光标位置以及设置光标位置](https://developer.mozilla.org/en/DOM/event.initKeyEvent "Javascript获取光标位置以及设置光标位置")》），并且兼容IE、Firefox、Opera，可是又有了新问题：假如输入的内容过多，而**Input**已经不能显示最后部分的内容，光标即使移动到了最后，也是不能显示出来的。他要的效果是，类似于输入那种效果，当输入文字之后，内容往左走，这样光标就一直在最后显示，而不会出现光标虽然出现在输入框最后可是不能显示出来的现象。

### 原理

在Firefox我想的方法是模拟一次**键盘事件**：
如先建立**document.createEvent("KeyboardEvent")**，然后光标移动到输入框最后，然后输入一个空格，在删除空格，这样子光标就会有在输入框最后不出现变为出现了~详细方法请见：[Mozilla Developer Center](https://developer.mozilla.org/en/DOM/event.initKeyEvent)

### JS代码

函数setCaretPosition代码如下：
<!--more-->> 
```javascript
function setCaretPosition(elemId){
> 	var elem = document.getElementById(elemId);
> 	var caretPos = elem.value.length;
> 	if (elem != null) {
> 		if (elem.createTextRange) {
> 			var range = elem.createTextRange();
> 			range.move('character', caretPos);
> 			range.select();
> 		}
> 		else {
> 				elem.setSelectionRange(caretPos, caretPos);
> 				elem.focus();
> 
> 				//空格键
> 				var evt = document.createEvent("KeyboardEvent");
> 				evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 0, 32);
> 				elem.dispatchEvent(evt);
> 				// 退格键
> 				evt = document.createEvent("KeyboardEvent");
> 				evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 8, 0);
> 				elem.dispatchEvent(evt);
> 		}
> 	}
> }```
> [查看DEMO演示](http://js8.in/mywork/caret.html "设置光标位置到结尾并且显示DEMO")