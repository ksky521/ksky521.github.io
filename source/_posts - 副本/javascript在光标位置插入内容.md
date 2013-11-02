title: "javascript在光标位置插入内容"
id: 538
date: 2010-05-13 20:46:30
tags: 
categories: 
- JavaScript
---

之前我写过一篇文章是通过javascript获取**光标**的位置——[javascript获取光标位置以及设置光标位置](http://js8.in/466.html "javascript获取光标位置以及设置光标位置")。由于产品需要在留言板的光标处上插入表情，这样就用到了**javascript**在光标位置插入内容的功能了~其实原理很简单，IE下可以通过**document.selection.createRange**();来实现，而Firefox（火狐）浏览器则需要首先获取光标位置，然后对value进行字符串截取处理。不多说了~直接上我写的一个**jQuery**在光标位置插入内容插件吧~

### jQuery在光标位置插入内容插件代码

<!--more-->
> <pre lang="javascript">(function($){
> 	$.fn.extend({
> 		insertAtCaret: function(myValue){
> 			var $t=$(this)[0];
> 			if (document.selection) {
> 				this.focus();
> 				sel = document.selection.createRange();
> 				sel.text = myValue;
> 				this.focus();
> 			}
> 			else 
> 				if ($t.selectionStart || $t.selectionStart == '0') {
> 					var startPos = $t.selectionStart;
> 					var endPos = $t.selectionEnd;
> 					var scrollTop = $t.scrollTop;
> 					$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
> 					this.focus();
> 					$t.selectionStart = startPos + myValue.length;
> 					$t.selectionEnd = startPos + myValue.length;
> 					$t.scrollTop = scrollTop;
> 				}
> 				else {
> 					this.value += myValue;
> 					this.focus();
> 				}
> 		}
> 	})	
> })(jQuery);</pre>

### 使用方法

<pre lang="javascript">$(selector).insertAtCaret("value");</pre>