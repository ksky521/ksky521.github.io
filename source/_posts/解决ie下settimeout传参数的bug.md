title: "解决IE下setTimeout传参数的bug"
id: 593
date: 2010-08-28 03:43:47
tags:
- javascript
categories:
- 前端开发
---
最近一次的开发中遇到了IE下**setTimeout**传参数的问题，在**IE**下setTimeout是不会传参数的，例如下面的代码，在IE下就不会传入a,b两个参数

```javascript

setTimeout(function(a,b){
alert(a+b);
},1000,'hello,','world!'); 
```
在实际项目中我们有些需求必须传入参数要**setTimeout**的function进行处理，那么我们就需要利用js的call及其apply的方法，来解决IE下的setTimeout传参bug：
<!--more-->

```javascript

 if(!+[1,]) { 
     (function(f){  
         window.setTimeout =f(window.setTimeout);  
         window.setInterval =f(window.setInterval);  
     })(function(f){  
         return function(c,t){  
             var a=[].slice.call(arguments,2);  
             return f(function(){  
                 c.apply(this,a)},t)  
             }  
     });  
 } 
```

[![断桥残雪部落格最新的订阅地址](/uploads/2010/08/logo_147x47.gif "断桥残雪部落格最新的订阅地址")](http://feed.feedsky.com/r57c)