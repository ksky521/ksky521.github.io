title: "使用CSS设置文字反选的背景颜色"
id: 490
date: 2010-02-21 19:51:39
tags: 
categories: 
- CSS
- 网络技术
---

在计算机操作中经常会有**反选**出现，系统一般会根据选择区域的颜色，显示出补色。但windows默认的文字选择时，背景为蓝色，前景色为白色，如果背景是深色，则文字为蓝色，**背景**变成白色。如下图所示：

[caption id="attachment_489" align="aligncenter" width="508" caption="反选默认样式"][![反选默认样式](http://js8.in/wp-content/uploads/2010/02/b201022115279.gif "反选默认样式")](http://js8.in/wp-content/uploads/2010/02/b201022115279.gif)[/caption]

能不能改变选择的默认颜色呢，也许很多人对这个问题不是很在意，也可能你早就见到过这个效果了，但是却忽略了。[查看示例](http://www.quirksmode.org/css/selection.html)(<span style="color: #00ccff;">请在非IE浏览器下查看</span>)

从博客里可以看到PPK给出了如下的CSS代码：
> <pre lang="css">::-moz-selection{    /*针对Firefox*/
>     background:#cc0000;
>     color:#fff;
> }
> 
> ::selection {
>     background:#cc0000;
>     color:#fff;
> }
> 
> code::-moz-selection {  /*code是标签选择器，可以换成p或span等*/
>     background: #333333;
> }
> 
> code::selection {
>     background: #333333;
> }</pre>
通过以上代码可以看出，你完全可以给不同的容器定义不同的反选背景颜色，