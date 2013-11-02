title: "IE6中a标签触发图片和ajax请求被abort"
id: 944
date: 2012-02-03 23:28:10
tags:
- IE6
- a标签
categories:
- 前端开发
---

## IE6 a标签的请求被abort的原因

最近项目中掉进IE6 a标签abort两次坑，第一次是a标签绑定一个事件，`href='javascript:;'`这样a标签触发了事件，切换验证码图片，结果验证码图片总是显示不出来，通过抓包显示状态为**abort**。

其实这个的原因可以从IE6中a标签执行顺序说起，IE6中a标签执行onclick在执行默认事件（即href跳转）之前，当触发了绑定的事件之后，那么处理完事件之后，如果不`return false`或者阻止默认事件，则会继续执行href跳转，IE6会认为页面跳转到其他页面或者页面重新刷新，则abort之前**onclick**事件中的请求。
<!--more-->

所以当onclick时，做出的获取最新验证码图片的请求，会因为下一步href的触发而abort。同时，如果你在a绑定的事件中做ajax请求，那么也会被无情的`abort`。

## IE6 a标签的请求被abort的解决方案

解决的方法就是在onclick或者绑定事件中`return false`来阻止a标签跳转的默认事件。
例如下面的代码：
```html
<a href="javascript:void(0)">Test</a>
```

或者你也可以给a标签的href写成“#”，即当前页面的锚点，这样页面就不会跳转，自然不会abort请求。

最好的方式还是两种都用，保险！
