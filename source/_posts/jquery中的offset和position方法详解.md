title: "Jquery中的offset()和position()方法详解"
id: 602
date: 2010-09-15 18:25:34
tags:
- javascript
categories:
- 前端开发
---
再给普加地图添加搜索提示的时候，我使用了jQuery的offset方法，因为习惯了，结果出现了不对齐的bug，说明offset的方法获取的top和left值是错误的。后来想起了jQuery中**offset**和**position**的两个方法有所不同，就查了一下google，原来两者是在父节点的相对绝对定位相关的。于是整理了今天的文章。

我们首先来看看这两个方法的定义。

### jQuery的offset()方法

获取匹配元素在**当前视口**的相对偏移。
返回的对象包含两个整形属性：top 和 left。此方法只对可见元素有效。

### jQuery的position()方法

获取匹配元素**相对**父元素的偏移。
返回的对象包含两个整形属性：top 和 left。为精确计算结果，请在补白、边框和填充属性上使用像素单位。此方法只对可见元素有效。
<!--more-->

### 深入剖析jQuery的源代码

先来看看在jquery框架源码里面，是怎么获得offset()和position()的：

```javascript

// Get *real* offsetParent
var offsetParent = this.offsetParent(),

// Get correct offsets
offset       = this.offset(),
parentOffset = /^body|html$/i.test(offsetParent[0].tagName) ? { top: 0, left: 0 } : offsetParent.offset();

// Subtract element margins
// note: when an element has margin: auto the offsetLeft and marginLeft
// are the same in Safari causing offset.left to incorrectly be 0
offset.top  -= num( this, 'marginTop'  );
offset.left -= num( this, 'marginLeft' );

// Add offsetParent borders
parentOffset.top  += num( offsetParent, 'borderTopWidth'  );
parentOffset.left += num( offsetParent, 'borderLeftWidth' );

// Subtract the two offsets
results = {
top:  offset.top  - parentOffset.top,
left: offset.left - parentOffset.left
};
```
点击下面的链接可以测试一下两个的区别

[jQuery的offset()和position()方法差异性测试](http://js8.in/mywork/offset_position/test.html)

### 通过上面的页面测试的结果可以得出结论

<ol>
<li>使用position()方法时事实上是把该元素当绝对定位来处理，获取的是该元素相当于最近的一个拥有绝对或者相对定位的父元素的偏移位置</li>
<li>使用position()方法时如果其所有的父元素都为默认定位（static）方式，则其处理方式和offset()一样，是当前窗口的相对偏移</li>
<li>使用offset()方法不管该元素如何定位，也不管其父元素如何定位，都是获取的该元素相对于当前视口的偏移</li>

### 正确使用offset和postion

就我个人的经验，通常获取一个元素（A）的位置是为了让另外的一个元素（B）正好出现在A元素的附近。通常有2种情况：

1.要显示的元素B存放在DOM的最顶端或者最底端（即其父元素就是body）.这个时候用offset()是最好的。示例验证：

[用offset 正常显示的例子](http://js8.in/mywork/offset_position/1.html) | [用position无法正常显示的例子](http://js8.in/mywork/offset_position/2.html)

在以上两个例子中，元素B都存放在Dom 结构的最下面，由于其父元素就是BODY，所以，不管元素A如何定位，只要找的A相当与整个窗口的偏移位置，就可以解决问题。

2.若要显示的元素B存放在元素A的同一父元素下（即B为A的兄弟节点），这个时候使用position() 是最合适的。

[用position正常显示的例](http://js8.in/mywork/offset_position/3.html) | [用offset无法正常显示的例子](http://js8.in/mywork/offset_position/4.html)

综上所述，应该使用**position()**还是**offset()**取决于你被控制的元素**B DOM**所在的位置。