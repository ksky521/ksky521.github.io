title: "pngfix.js可能导致xss攻击"
id: 1010
date: 2012-06-12 02:20:19
tags:
- xss
categories:
- 前端开发
---

今天看了国外大佬Spanner的一篇关于pngfix的文章，已经到下班时间，就简单说说pngfix的xss攻击。

## pngfix.js

`pngfix.js`是IE6中解决png不透明的js方案，原理其实就是遍历了页面的img，然后使用滤镜来解决。

## pngfix导致xss

pngfix.js使用了如下的代码：
```javascript
var imgID = (img.id) ? "id='" + img.id + "' " : "";

img.outerHTML = strNewHTML
```
如果使用如下的代码就会出现xss：

```html
<img src=1.png id="'&gt;&lt;img src=1 onerror=alert(/png_fixed!/)&gt;">
```

详细原文地址：http://www.thespanner.co.uk/2012/06/12/pngfix/
