title: "onbeforeunload与a标签在IE中的冲突bug"
id: 558
date: 2010-06-29 16:07:46
tags: 
categories: 
- JavaScript
- 网络技术
---

**onbeforeunload **是window的一个事件，目前Firefox，IE都支持，主要用来提示用户是否真的要离开该页面，通常在一些比较重要的数据提交之前，防止用户误操作导致数据丢失。典型的应用如gmail中，在写邮件的时候，如果刷新页面或者关闭页面，会出现提示。

但是在IE下点击一些**a标签**时，也会触发onbeforeunload事件。并且href中写`javascript:void(0)`也不行，而在Firefox中不会出现类似的情况。于是查资料对onbeforeunload事件重新认识了一下：

### a标签触发事件的顺序

**onclick**、onbeforeunload跟href三者之间的先后运行关系是这样的：onclick &gt; onbeforeunload &gt; href，知道了这个道理，我们就可以通过一些方法阻止onbeforeunload。另外在IE浏览器中，假如href为#，那么也不会触发onbeforeunload事件。
<!--more-->

### 怎么阻止onbeforeunload

在Ajax的同时，给a标签加上onclick事件，这样onclick在onbeforeunload之前运行，然后来个return false，就可以啦~

### 绕过onbeforeunload直接href

结合onclick事件，我们可以绕过onbeforeunload直接href，下面的代码就可以绕过onbeforeunload而执行href：
<pre lang="javascript">var a=1;
window.onbeforeunload=function()
{
    if(a)alert("onbeforeunload事件爆发了！");
}</pre>
只要我们在onclick事件加上一个a=0;就可以了~

### 实例

此处使用了window.onbeforeunload对onclick、onbeforeunload和href进行的测试，请在IE下进行测试：

[测试#](#) | [测试连接](http://js8.in) | [测试Click在onbeforeunload之前](javascript:void(0)) | [测试onbeforeunload在href之前](javascript:void(alert() | [避开onbeforeunload直接href](http://js8.in)