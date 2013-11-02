title: "IE中iframe和document.selection.createRange导致跨域"
id: 1006
date: 2012-06-11 01:50:15
tags:
- 跨域
categories:
- 前端开发
---

帮忙在活动中找bug，两层iframe，经过调试发现是`document.selection.createRange`导致的错误，在浏览器中报“拒绝访问”，猜测是跨域导致的。于是加上`document.domain`主域就搞定了。

本来以为是两层iframe导致的（因为他们反映一层iframe没有问题），于是自己建了个demo，test.qq.com/qq1.html代码如下：

```html
<iframe src="http://demos.qq.com/qq2.html" frameborder="0" id="myIframe"></iframe>
```
demos.qq.com/qq2.html代码如下：

```html
<script type="text/javascript">
    //document.domain = 'qq.com';
    var a = document.selection.createRange();
</script>
```

这样在IE9中访问`test.qq.com/qq1.html`就会报错，而把`qq2.html`和`qq1.html`都添加`document.domain='qq.com';`就可以了。暂时原因不明了，记录在此备份下，懂得朋友可以来说道说道
