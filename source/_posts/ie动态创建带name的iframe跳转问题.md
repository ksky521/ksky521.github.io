title: "IE动态创建带name的iframe跳转问题"
id: 998
date: 2012-05-21 17:24:10
tags:
- iframe
- name
categories:
- 前端开发
---

在一些**前端**项目中可能要用到动态创建iframe的需求，例如无刷新ajax上传文件。但是在IE下创建**带有name的iframe**会有个bug，创建的代码如下：
```javascript
var iframe = document.createElement('iframe');
iframe.name = 'test';
```
上面的这段javascript代码在IE下赋不了**name属性**!!!即`iframe.name = 'test';`这段代码未执行。

在IE中我们可以使用下面的代码来动态创建带有name的iframe：
```javascript
var iframe = document.createElement('<iframe name="test">');
```
但是上面的代码在非IE浏览器下却报错，这时候我们可以使用判断IE，如果是ie则使用第二段方法**动态创建iframe**，或者我们可以捕获异常，如下面的代码：
<!--more-->
```javascript
var iframe;
try {
    iframe = document.createElement('<iframe name="test">');
} catch (ex) {
    iframe = document.createElement('iframe');
}
iframe.name = 'test';
```
