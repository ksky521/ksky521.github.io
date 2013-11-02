title: "关于wBox iFrame回调关闭问题的解决方案"
id: 620
date: 2010-09-06 21:05:39
tags: 
categories: 
- WordPress
---

最近很多使用我的**jQuery**弹出框插件wBox的人问我，关于wBox的关闭问题，例如一个页面中使用wBox **iframe**进来一个页面，而这个页面是进行用户登录，登录成功就关闭wBox，其实实现回调关闭[wBox](http://js8.in/wbox-jquery)的方法很简单，就是使用iframe的DOM操作即可，例如我们的代码这样写：
<pre lang="javascript">
//wbox赋值出来，然后使用wbox对象的close的方法关闭
var wbox=$("#iframe").wBox({
   	requestType: "iframe",
	target:"b.html"
   });</pre>
那么我们在页面b.html中进行了用户登录验证，我们验证成功，要关闭**wBox**，就可以在b.html中使用`parent.wbox.close()`来进行关闭，就像下面的代码，只要我们验证完毕运行closewBox就可以关闭了iframe：
<pre lang="javascript">function closewBox(){
    parent.wbox.close()
}</pre>
关于iframe子页面与父页面之间的**DOM**操作可以参考下面的文章：《[使用JavaScript在IE和Firefox下进行iframe的DOM操作](http://js8.in/463.html)》