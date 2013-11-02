title: "IE6下javascript不能隐藏select标签的bug"
id: 686
date: 2011-05-13 23:50:57
tags: 
categories: 
- JavaScript
- web前端开发
---

昨天做了一个简单的项目，要求有三级联动的select菜单，可是伤不起的IE6下就出现了**不能隐藏select**的bug，之前我也介绍过IE6下select层高的问题，可以通过隐藏select或者[使用iframe遮挡](http://js8.in/553.html "解决IE6 select z-index无效，遮挡div的bug")的方式来解决，今天的bug不同以前，大家如果在用js控制select显示隐藏的时候可能会经常遇到，调试一下午终于找到了解决的方案，特此记录一下。

### IE6不能隐藏select重现代码

建立两个关联的select，通过javascript控制第一个select 发生变化后，第二个select根据第一个value重新添加options，如果为空则隐藏第二个select（示例中判断除第一个之外都隐藏），则由第一个select的第三个value切换到第二个value则第二个select就不会隐藏。
具体效果见下面的实例：

[IE6 select隐藏bug](//js8.in/mywork/ie6selectbug.html)

### IE6下不能隐藏select标签解决方案

1.  可以通过先设置select为显示，后设置为none的方式
2.  通过给select添加class来控制显示
具体方法，见示例代码源码注释的地方。