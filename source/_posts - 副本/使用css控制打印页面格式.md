title: "使用CSS控制打印页面格式"
id: 351
date: 2009-12-01 01:12:39
tags: 
categories: 
- CSS
---

之前做[地图](http://ditu.pujia.com/preview)打印页面的时候，经理要求打印时候把打印的按钮去掉。这个时候就用到了控制**打印**的**样式表**了。
&lt;link rel="stylesheet" type="text/css" media="print" href="print.css" /&gt;

正因为xhtml和css是分离的，所以我们可以在print.css里自由书写需要打印显示的内容和表现形式。那么这也要求我们在书写xhtml的时候更多考虑到打印显示效果的需求，良好的扩展标记和结构嵌套，使得我们轻松的使用display:none将内容设置为不显示。然后就是去书写 print.css内容的时候了，你象设置word一样去写你想打印的页面吧。
后来想了想，其实单独写一个css增加了请求次数，就想到**了@media print**{}的作用，代码如下
<pre lang="css">@media print{
 .printdesc
{
    right: 0;
    width: 685px;
    height: 69px;
    background-color: #FFFFFF;
    float:left;
    overflow:auto;
    border:0px;
}
.text{
    float:right;
    width: 688px;
    margin-top:20px;
}
.printlink{
    height:0px;
    display:none;
    width:0px;
    z-index:-10;

}
.printlink a{
    display:none;
}
}</pre>
后来想到如果打印页面的某一部分，可以使用iframe来进行操作，现在的打印页面的局部内容基本上就是使用iframe进行处理的~特此记录一下