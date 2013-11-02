title: "真正的jQuery的radio与checkbox取值"
id: 238
date: 2009-09-30 13:26:05
tags: 
categories: 
- 网络技术
---

今天闲着没事想把[爱墙](http://love.2fool.cn)做成好友飞信通知的功能，遇到一个checkbox的选择问题，由于自己喜欢使用**jQuery**来开发~所以对于jQuery对checkbox的取值很想搞清楚~

我试着使用网上比较多的版本，比如：$("input[name='fetion']").attr("checked")，

### 下面代码是网上的

多选框**checkbox**：
<pre lang="javascript"> $("#chk1").attr("checked",'');//不打勾
$("#chk2").attr("checked",true);//打勾
if($("#chk1").attr('checked')==undefined) //判断是否已经打勾</pre>
<p><!--more-->

对于上面的打勾与不打勾，是正确的~可是判断呢？错误！至少是在Firefox下错误！（我用Firefox开发）

试着其他几种方式就是不行啊~没有办法，只能搜索结果啦~

找到一篇老外的文章，他判断是否已经打勾的方式是：

$("input[name='fetion']").is(":checked"))

如果打勾返回为true，没有则返回为false~

而我实现的功能是，如果选中则返回一个函数，比如：选中打开一次隐藏的层，而不选中则关闭一个层~

这是我想到了change函数，

### 最终代码如下

<pre lang="javascript">
$("input[name='fetion']").change( function() {
var fbox=$("#facebox .content");
if(fbox.find("input[name='fetion']").is(":checked")){
fbox.find("#myfetion").show();
}else{
fbox.find("#myfetion").hide();
}
});</pre>

这使我想起了**radio**的取值与赋值问题：

取值：$("input:radio[name='adR']:checked").val()

赋值：$("input:radio[name='adT']").eq(0).attr("checked",true);