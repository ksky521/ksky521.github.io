title: "IE的fireEvent方法"
id: 731
date: 2011-08-05 03:51:20
tags:
- IE
- javascript
categories:
- 前端开发
---

在IE中提供了一个**fireEvent**方法，顾名思义就是触发某个事件发生的意思。刚开始我以为是会跟平时使用`onclick()`一样，没想到最近在写javascript入门ppt的时候发现了，原来自己太自以为是了！看来还有很多javascript的细节没有掌握好啊！

现在根据自己的总结详细的记录下fireEvent方法的使用。fireEvent是IE提供的一种方法，msdn文档地址：http://msdn.microsoft.com/en-us/library/ms536423(v=vs.85).aspx

### onclick()

我们先看第一段实例代码：
<pre lang="html">

*   i am one;
*   i am two;
*   i am three;
<button onclick='document.getElementById("id1").onclick();'>click me!</button>
</pre>
这段代码中我们没有个id1的li添加onclick事件，点击button，会报错，提示“对象不支持此属性或方法”。由此可见，DOM.onclick()需要添加onclick事件之后才能使用。

假如我们把以上的代码修改为：
<pre lang="html">

*   i am one;
*   i am two;
*   i am three;
<button onclick='document.getElementById("id1").onclick();'>click me!</button>
</pre>
<!--more-->
此时，点击button会触发onclick事件，但是ul的onclick没有触发，这就表明了DOM.onclick()不存在冒泡。

### fireEvent()

我们来看看fireEvent跟onclick()触发事件是否相同。看下面的代码：
<pre lang="html">

*   i am one;
*   i am two;
*   i am three;
<button onclick='document.getElementById("id1").fireEvent("onclick")'>fireEvent !</button>
</pre>
点击button后，触发ul的onclick事件，说明fireEvent会引起冒泡，而且没有发生像onclick()提示“对象不支持此属性或方法”，说明即使不添加id1的onclick事件也可以冒泡。
由此可以看出，IE中的fireEvent方法类似模拟用户的鼠标点击行为，而不是单纯的onclick。

### 总结fireEvent和onclick区别

通过上面的例子可以看出，DOM的fireEvent和onclick（这只是个代表）有以下区别：

1.  onclick需要DOM真正添加了onclick事件，否则会报“对象不支持此属性或方法”错误
2.  onclick不会引起IE的冒泡过程，而fireEvent会引起冒泡，fireEvent更贴近用户真实的行为触发
3.  由第二条得出，fireEvent在即使DOM没有click事件也可以fireEvent，而不会报错（更贴近用户真实行为）
最后可以拿下面的代码测试：
<pre lang="html">

*   i am one;
*   i am two;
*   i am three;
<button onclick='document.getElementById("id1").onclick();'>click me!</button>
<button onclick='document.getElementById("id1").fireEvent("onclick")'>fireEvent !</button>
</pre>
