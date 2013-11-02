title: "一道js正则笔试题"
id: 683
date: 2011-04-21 06:12:51
tags:
- javascript
- 正则
categories:
- 前端开发
---

### 写在前面

终于找到工作了，现在在新浪微博工作，谢谢这段时间来帮我找工作的朋友。北京的生活的确压力很大，最起码心累，自己慢慢适应就好了。

不得不提的是拆那ZF的办事效率，我回家转户口，青岛老家来回跑了三四天，竟然还是没有给我搞定，最后说青岛户口已经起出来了，老家还要等十五天之后才可以看到结果，然后才能给我落户口！难道ZF的技术就那么差劲啊！数据库还是不统一的，还是故意要老百姓多跑几次，以调动内需？哎……

### 一道javascript正则笔试题目

在笔试的时候碰到了一道**正则**的题目，自己不会，后来查了很多资料也没找到，经过在Qwrap的QQ群里提问终于明白了是什么回事，特地记录一下。原题大致如下：

```javascript
var a = new RegExp("123","g");
var b = "abc#123";

console.log(a.test(b));//true
console.log(a.test(b));//false
console.log(a.test(b));//true
console.log(a.test(b));//false
```

问为什么会输出`true`，`false`，`true`，`false`？
<!--more-->
原来正则表达式中**g**标记有个lastIndex属性，该属性存放一个整数，它声明的是上一次匹配文本之后的第一个字符的位置。上次匹配的结果是由方法 `RegExp.exec()` 和` RegExp.test()` 找到的，它们都以 **lastIndex **属性所指的位置作为下次检索的起始点。这样，就可以通过反复调用这两个方法来遍历一个字符串中的所有匹配文本。该属性是可读可写的。只要目标字符串的下一次搜索开始，就可以对它进行设置。当方法 exec() 或 test() 再也找不到可以匹配的文本时，它们会自动把 lastIndex 属性重置为 0。

如下面js代码输出RegExp的lastIndex，就可以很清楚的说明这个问题了：

```javascript
var a = new RegExp("123","g");
var b = "abc#123";
console.log(a.test(b));//true
console.log(a.lastIndex);//7
console.log(a.test(b));//false
console.log(a.lastIndex);//0
console.log(a.test(b));//true
console.log(a.lastIndex);//7
console.log(a.test(b));//false
console.log(a.lastIndex);//0
```

看来对于**javascript**的了解还是不够全面啊！继续虚心学习吧！
