title: "WinHttp.WinHttpRequest.5.1—可以用作抓取的msxml 4.0底层对象"
id: 681
date: 2011-03-17 21:10:00
tags: 
categories: 
- JavaScript
- web前端开发
---

前些日子在博客园上看到的一篇文章（现在搜索不到了，尽转载的），介绍了下WinHttp.WinHttpRequest.5.1。自己也查了一些资料，写了个vbscript脚本，来添加[新浪微博](http://js8.in/634.html "Sina App Engine开发实例：天气预报的定时短信（二）")好友。**WinHttp.WinHttpRequest**的介绍可以去微软官方查看，也有个介绍的网站：http://www.neilstuff.com/winhttp/。感兴趣的可以移步去围观一下。

简单看一下我改的博客园文章的代码，用于新浪微博自动添加好友，因为是前些日子写的。[申请离职](http://js8.in/resume.html "_blank")之后，害怕自己的以前的一些代码丢失，特发到网上来备案一下。简单解释在代码中，加上之前的php的[curl函数](http://js8.in/379.html)，WinHttp.WinHttpRequest.5.1应该对以后一些研究会有帮助。而且WinHttp.WinHttpRequest也可以设置refer，cookie，user-agent，proxy……，关键是他可以在cmd里面跑，感觉比较酷（当然php也可以做到，但是不熟悉php的可以用js写出来代替curl）。不废话了，直接上代码。

<pre lang="javascript">
function RemoteCall(method, url, param, header){  
    var obj = new ActiveXObject("WinHttp.WinHttpRequest.5.1");  
    obj.Open(method||"GET", url, false);  
    obj.Option(4) = 13056;  
    obj.Option(6) = false;  
    obj.setRequestHeader("Cookie", "string");//先设置一个cookie，防止出错，见官方文档
    obj.setRequestHeader("Cookie","你的新浪微博cookie");
    obj.setRequestHeader("Host","t.sina.com.cn");
    obj.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
    obj.setRequestHeader("User-Agent","Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8 QQDownload/1.7 FirePHP/0.5");
    obj.Send(param);  
    return obj;  
}
function post(url,param){
    var obj = new ActiveXObject("WinHttp.WinHttpRequest.5.1");  
    obj.Open("POST", url, false);  
    obj.Option(4) = 13056;  
    obj.Option(6) = false;  
    obj.setRequestHeader("Cookie", "string");
    obj.setRequestHeader("Cookie","你的新浪微博cookie");
    obj.setRequestHeader("Host","t.sina.com.cn");
    obj.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    obj.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
    obj.setRequestHeader("User-Agent","Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8 QQDownload/1.7 FirePHP/0.5");
    obj.Send(param);  
    return obj; 
}

</pre>
<!--more-->
新浪自动加粉丝代码就不放出了，比较邪恶，不过新浪微博每天有200个限制，我也就释然了，简单说说思路：

1.  先获取自己的cookie
2.  然后去的某个人的粉丝或者其他方式的微博用户列表
3.  正则匹配出来用户ID，循环开始post加好友请求
当然其他的语言也可以来使用**WinHttp.WinHttpRequest**实现一些限制访问功能。

记录一下，以后备用