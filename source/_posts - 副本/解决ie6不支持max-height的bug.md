title: "解决IE6不支持max-height的bug"
id: 606
date: 2010-09-02 21:06:30
tags: 
categories: 
- JavaScript
- 网络技术
---

罪恶的IE6不支持**max-height**属性，不过我们可以通过jQuery来解决IE6不支持max-height，**jQuery**的代码如下：
<pre lang="javascript">$(".entry").each(function(){
    if($(this)[0].scrollHeight>500)
     $(this).css({"height":"500px"});
});</pre>
**原理**: 在IE6中可以通过设定height来达到**max-height**的效果. 循环所有要加max-height属性的DOM元素,判断他的scrollHeight大于你要设置的最大高度 如果超过了就通过设置height为最大高度，我这里使用的是[0]，获取的是的DOM对象，而不是jQuery对象，详细说明见：《[jQuery选择器使用详解](http://js8.in/416.html)》

上面的代码还没有加入IE6的判断,完整代码如下:
<pre lang="javascript">if($.browser.msie&amp;&amp;($.browser.version === "6.0")){
$(".entry").each(function(){
if($(this)[0].scrollHeight>500)
$(this).css({"height":"500px","overflow":"hidden"});
});}</pre>

当然你也可以通过**css表达式**来实现**IE6**支持max-height属性
<pre lang="css">.entry{
//我烧验证woshao_985140e4b71711df9e5e000c295b2b8d
height: expression( this.scrollHeight > 500 ? "500px" : "auto" ); /* sets max-height for IE */
}</pre>