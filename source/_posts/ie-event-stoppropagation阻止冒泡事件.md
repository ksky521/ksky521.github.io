title: "IE event.stopPropagation()阻止冒泡事件"
id: 623
date: 2010-09-16 23:29:11
tags:
- javascript
categories:
- 前端开发
---
在火狐Firefox、opera、IE下阻止冒泡事件是不同的代码的，火狐下使用的是**event.stopPropagation()**，而IE下使用的是**cancelBubble**，jQuery 可以使用**e.stopPropagation()**就可以兼容了，如果是纯粹的JavaScript需要下面的代码来统一：

```javascript

if (event.stopPropagation) {
// this code is for Mozilla and Opera
event.stopPropagation();
}
else if (window.event) {
// this code is for IE
window.event.cancelBubble = true;
}
```