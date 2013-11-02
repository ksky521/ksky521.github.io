title: "使用ZeroClipboard解决跨浏览器复制到剪贴板的问题"
id: 407
date: 2009-12-24 01:48:06
tags: 
categories: 
- JavaScript
- 网络技术
---

### 导言

之前在开发[普加](http://www.pujia.com)09年国庆中秋祝福页面复制链接功能时，遇见在Firefox，Chrome，Opera，Safari能复制链接的**兼容性**问题，而在近期上线的[普加地图](http://ditu.pujia.com/preview)产品中使用的是Flash的**flashvars**来传入参数来解决了这个问题。其实开发中经常会用到复制的功能，在 IE 下通过JavaScript的**window.clipboardData.setData**可以简单实现复制到剪贴板功能。最后终于找到了终极解决方式：使用jhuckaby写的Zero Clipboard的js类库。此方法利用 Flash完成进行复制内容到剪贴板，所以只要浏览器装有Flash 就可以复制内容。

### Zero Clipboard的实现原理

**Zero Clipboard **利用透明的Flash让其漂浮在复制按钮之上，这样其实点击的不是按钮而是 Flash ，这样将需要的内容传入Flash，再通过Flash的复制功能把传入的内容复制到**剪贴板**。

### Zero Clipboard的安装方法

其实也不算安装啦，就是使用前的准备工作。
首先需要下载 Zero Clipboard的压缩包，解压后把文件夹中两个文件：ZeroClipboard.js 和 ZeroClipboard.swf 放入到你的项目中。
> Zero Clipboard : [[项目主页](http://code.google.com/p/zeroclipboard/)] [[zip下载](http://code.google.com/p/zeroclipboard/downloads/list)] [[在线演示](http://bowser.macminicolo.net/~jhuckaby/zeroclipboard/)]
<!--more-->
然后把在你要使用复制功能的页面中引入Zero Clipboard的js文件：ZeroClipboard.js 
如下代码：
> <pre lang="html"><script type="text/javascript" src="ZeroClipboard.js"></script></pre>

注意：以上 ZeroClipboard.js, ZeroClipboard.swf需要放在同一路径下。如果不在同一路径，可使用ZeroClipboard.setMoviePath( "Flash路径" );来设置ZeroClipboard.swf 地址

### Zero Clipboard实现简单**跨浏览器**复制

> <pre lang="javascript">var clip = new ZeroClipboard.Client(); // 新建一个对象
> clip.setHandCursor( true ); // 设置鼠标为手型
> clip.setText("哈哈"); // 设置要复制的文本。
> // 注册一个 button，参数为 id。点击这个 button 就会复制。
> //这个 button 不一定要求是一个 input 按钮，也可以是其他 DOM 元素。
> clip.glue("copy-botton"); // 和上一句位置不可调换</pre>

这样，这样基本功能实现了，点击按钮就可以复制设置好的文本了。你可能注意到了，待复制的文本是固定的，如果想要动态改变的怎么办，比如复制一个输入框中的内容。不用担心，下面会讲到的。

#### Zero Clipboard的高级功能

**1、reposition() 方法**

因为按钮上漂浮有一个 Flash 按钮，所以当页面大小发生变化时，Flash 按钮可能会错位，这样就点不着了。 不要紧，Zero Clipboard 提供了一个 reposition() 方法，可以重新计算 Flash 按钮的位置。我们可以将它绑定到 resize 事件上。如下面代码是在jQuery下实现的resize事件重新设置按钮位置：> <pre lang="javascript">$(window).resize(function(){
>     clip.reposition();
> });</pre>

**2、hide() 和 show() 方法**

这两个方法可以隐藏和显示 Flash 按钮 。其中 show() 方法会调用 reposition() 方法。

**3、setCSSEffects() 方法**

当鼠标移到按钮上或点击时，由于有 Flash 按钮的遮挡，所以像 css ":hover", ":active" 等伪类可能会失效。setCSSEffects() 方法就是解决这个问题。首先我们需要将伪类改成类，比如：
> <pre lang="css">
> #copy-botton:hover{
>    border-color:#FF6633;
> }
> // 可以改成下面的 ":hover" 改成 ".hover"
> #copy-botton.hover{
>    border-color:#FF6633;
> }</pre>

我们可以调用 clip.setCSSEffects( true ); 这样 Zero Clipboard 会自动为我们处理：将类 .hover 当成伪类 :hover 。

**4、getHTML() 方法**

如果你想自己实例一个 Flash ，不用 Zero Clipboard 的附着方法，那么这个方法就可以帮上忙了。它接受两个参数，分别为 Flash 的宽度和高度。返回的是 Flash 对应的 HTML 代码。例如：
> <pre lang="javascript">
> var html = clip.getHTML( 150, 20 );</pre>

你可以用 innerHTML 或直接 document.write(); 进行输出。
以下是测试输出的组装完毕的HTML 代码：
> <pre lang="html">
> <embed id="ZeroClipboardMovie_1" src="zeroclipboard/ZeroClipboard.swf" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="150" height="20" name="ZeroClipboardMovie_1" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="id=1&width=150&height=20" wmode="transparent" /></pre>

IE 的 Flash JavaScript 通信接口上有一个 bug 。你必须插入一个 object 标签到一个已存在的 DOM 元素中。并且在写入 innerHTML 之前请确保该元素已经 appendChild 方法插入到 DOM 中。

### Zero Clipboard 事件处理

**Zero Clipboard** 提供了一些事件，你可以自定义函数处理这些事件。Zero Clipboard 事件处理函数为 addEventListener(); 例如当 Flash 完全载入后会触发一个事件 "load" 。
> <pre lang="javascript">
> clip.addEventListener( "load", function(client) {
>     alert("Flash 加载完毕！");
> });</pre>

Zero Clipboard 会将 clip 对象作为参数传入。即上例中的 "client" 。
还有 "load" 也可以写成 "onLoad"，其他的事件也可以这样。
其他事件还包括：

mouseOver 鼠标移上事件
mouseOut 鼠标移出事件
mouseDown 鼠标按下事件
mouseUp 鼠标松开事件
complete 复制成功事件

其中 mouseOver 事件和 complete 事件比较常用。
前面说过，如果需要动态改变待复制的内容，那 mouseOver 事件就可以派上用场了。例如需要动态复制一个 id 为 test 的输入框中的值，我们可以在鼠标 over 的时候重新设置值。
> <pre lang="javascript">
> clip.addEventListener( "mouseOver", function(client) {
>     var test = document.getElementById("test");
>     client.setText( test.value ); // 重新设置要复制的值
> });
> //复制成功：
> clip.addEventListener( "complete", function(){
>     alert("复制成功！");
> });
> </pre>