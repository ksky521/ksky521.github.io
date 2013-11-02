title: "Javascript事件触发列表与详解"
id: 480
date: 2010-02-09 17:06:53
tags: 
categories: 
- JavaScript
- 网络技术
---

今天在司徒正美（[原文](http://www.cnblogs.com/rubylouvre/archive/2010/02/09/1632990.html)）的博客上看见一个关于javascript事件触发列表的文章，感觉不错，拿来给大家分享一下，本文中涉及到了很多javascript的事件，有不同浏览器差异的事件，大家必要的时候可以做以下参考
<!--more-->
<table border=1 cellspacing=0 cellpadding=3 width="100%"> 
        <tbody> 
          <tr> 
          <th colspan=3 align=left><font color=#990000>**一般事件**</font></th></tr> 
          <tr> 
            <th>**<font size=2>事件</font>**</th> 
            <th>**<font size=2>浏览器支持</font>**</th> 
          <th>**<font size=2>描述</font>**</th></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onclick</font>**</th> 
            <td valign=top nowrap>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser: **<font color=#cc0000>ie3&nbsp;</font>**|**<font color=#cc0000>&nbsp;n2&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>鼠标点击事件，多用在某个对象控制的范围内的鼠标点击</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondblclick</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>鼠标双击事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onmousedown</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>鼠标上的按钮被按下了</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onmouseup</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>鼠标按下后，松开时激发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onmouseover</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie3&nbsp;</font>**|**<font color=#cc0000>&nbsp;n2&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>当鼠标移动到某对象范围的上方时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onmousemove</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>鼠标移动时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onmouseout</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n3&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>当鼠标离开某对象范围时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onkeypress</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>当键盘上的某个键被按下并且释放时触发的事件.[注意:页面内必须有被聚焦的对象]</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onkeydown</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>当键盘上某个按键被按下时触发的事件[注意:页面内必须有被聚焦的对象]</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onkeyup</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>当键盘上某个按键被按放开时触发的事件[注意:页面内必须有被聚焦的对象]</td></tr> 
          <tr> 
          <th colspan=3 align=left><font color=#990000>**页面相关事件**</font></th></tr> 
          <tr> 
            <th>**<font size=2>事件</font>**</th> 
            <th>**<font size=2>浏览器支持</font>**</th> 
          <th>**<font size=2>描述</font>**</th></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onabort</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n3&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>图片在下载时被用户中断</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onbeforeunload</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当前页面的内容将要被改变时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onerror</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n3&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>捕抓当前页面因为某种原因而出现的错误，如脚本错误与外部数据引用的错误</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onload</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie3&nbsp;</font>**|**<font color=#cc0000>&nbsp;n2&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>页面内空完成传送到浏览器时触发的事件，包括外部文件引入完成</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onmove</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:&nbsp;ie&nbsp;|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>浏览器的窗口被移动时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onresize</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>当浏览器的窗口大小被改变时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onscroll</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>浏览器的滚动条位置发生变化时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onstop</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>浏览器的停止按钮被按下时触发的事件或者正在下载的文件被中断</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onunload</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie3&nbsp;</font>**|**<font color=#cc0000>&nbsp;n2&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>当前页面将被改变时触发的事件</td></tr> 
          <tr> 
          <th colspan=3 align=left><font color=#990000>**表单相关事件**</font></th></tr> 
          <tr> 
            <th>**<font size=2>事件</font>**</th> 
            <th>**<font size=2>浏览器支持</font>**</th> 
          <th>**<font size=2>描述</font>**</th></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onblur</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie3&nbsp;</font>**|**<font color=#cc0000>&nbsp;n2&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>当前元素失去焦点时触发的事件 [鼠标与键盘的触发均可]</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onchange</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie3&nbsp;</font>**|**<font color=#cc0000>&nbsp;n2&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>当前元素失去焦点并且元素的内容发生改变而触发的事件 [鼠标与键盘的触发均可]</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onfocus</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie3&nbsp;</font>**|**<font color=#cc0000>&nbsp;n2&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>当某个元素获得焦点时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onreset</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|**<font color=#cc0000>&nbsp;n3&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>当表单中reset的属性被激发时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onsubmit</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie3&nbsp;</font>**|**<font color=#cc0000>&nbsp;n2&nbsp;</font>**|**<font color=#cc0000>&nbsp;o3&nbsp;</font>**</td> 
          <td>一个表单被递交时触发的事件</td></tr> 
          <tr> 
          <th colspan=3 align=left><font color=#990000>**滚动字幕事件**</font></th></tr> 
          <tr> 
            <th>**<font size=2>事件</font>**</th> 
            <th>**<font size=2>浏览器支持</font>**</th> 
          <th>**<font size=2>描述</font>**</th></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onbounce</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>在marquee内的内容移动至marquee显示范围之外时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onfinish</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当marquee元素完成需要显示的内容后触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onstart</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当marquee元素开始显示内容时触发的事件</td></tr> 
          <tr> 
          <th colspan=3 align=left><font color=#990000>**编辑事件**</font></th></tr> 
          <tr> 
            <th>**<font size=2>事件</font>**</th> 
            <th>**<font size=2>浏览器支持</font>**</th> 
          <th>**<font size=2>描述</font>**</th></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onbeforecopy</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当页面当前的被选择内容将要复制到浏览者系统的剪贴板前触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onbeforecut</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当页面中的一部分或者全部的内容将被移离当前页面[剪贴]并移动到浏览者的系统剪贴板时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onbeforeeditfocus</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当前元素将要进入编辑状态</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onbeforepaste</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>内容将要从浏览者的系统剪贴板传送[粘贴]到页面中时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onbeforeupdate</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当浏览者粘贴系统剪贴板中的内容时通知目标对象</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>oncontextmenu</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当浏览者按下鼠标右键出现菜单时或者通过键盘的按键触发页面菜单时触发的事件 [试试在页面中的&lt;body&gt;中加入oncontentmenu="return false"就可禁止使用鼠标右键了]</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>oncopy</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当页面当前的被选择内容被复制后触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>oncut</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当页面当前的被选择内容被剪切时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondrag</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当某个对象被拖动时触发的事件 [活动事件]</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondragdrop</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:&nbsp;ie&nbsp;|**<font color=#cc0000>&nbsp;n4&nbsp;</font>**|&nbsp;o&nbsp;</td> 
          <td>一个外部对象被鼠标拖进当前窗口或者帧</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondragend</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当鼠标拖动结束时触发的事件，即鼠标的按钮被释放了</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondragenter</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当对象被鼠标拖动的对象进入其容器范围内时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondragleave</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当对象被鼠标拖动的对象离开其容器范围内时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondragover</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当某被拖动的对象在另一对象容器范围内拖动时触发的事件 [活动事件]</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondragstart</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当某对象将被拖动时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondrop</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>在一个拖动过程中，释放鼠标键时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onlosecapture</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当元素失去鼠标移动所形成的选择焦点时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onpaste</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当内容被粘贴时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onselect</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|**<font color=#cc0000>&nbsp;4&nbsp;</font>**
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当文本内容被选择时的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onselectstart</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o&nbsp;</td> 
          <td>当文本内容选择将开始发生时触发的事件</td></tr> 
          <tr> 
          <th colspan=3 align=left><font color=#990000>**数据绑定**</font></th></tr> 
          <tr> 
            <th>**<font size=2>事件</font>**</th> 
            <th>**<font size=2>浏览器支持</font>**</th> 
          <th>**<font size=2>描述</font>**</th></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onafterupdate</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当数据完成由数据源到对象的传送时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>oncellchange</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当数据来源发生变化时</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondataavailable</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当数据接收完成时触发事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondatasetchanged</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>数据在数据源发生变化时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>ondatasetcomplete</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当来子数据源的全部有效数据读取完毕时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onerrorupdate</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当使用onbeforeupdate事件触发取消了数据传送时，代替onafterupdate事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onrowenter</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当前数据源的数据发生变化并且有新的有效数据时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onrowexit</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当前数据源的数据将要发生变化时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onrowsdelete</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当前数据记录将被删除时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onrowsinserted</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当前数据源将要插入新数据记录时触发的事件</td></tr> 
          <tr> 
          <th colspan=3 align=left><font color=#990000>**外部事件**</font></th></tr> 
          <tr> 
            <th>**<font size=2>事件</font>**</th> 
            <th>**<font size=2>浏览器支持</font>**</th> 
          <th>**<font size=2>描述</font>**</th></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onafterprint</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当文档被打印后触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onbeforeprint</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当文档即将打印时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onfilterchange</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当某个对象的滤镜效果发生变化时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onhelp</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当浏览者按下f1或者浏览器的帮助选择时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onpropertychange</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie5&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
          <td>当对象的属性之一发生变化时触发的事件</td></tr> 
          <tr> 
            <th valign=top align=left>**<font size=2>onreadystatechange</font>**</th> 
            <td valign=top>html: 2&nbsp;|&nbsp;3&nbsp;|&nbsp;3.2&nbsp;|&nbsp;4&nbsp;
browser:**<font color=#cc0000>&nbsp;ie4&nbsp;</font>**|&nbsp;n&nbsp;|&nbsp;o</td> 
    <td>当对象的初始化属性值发生变化时触发的事件</td> 
  </tr> 
 </tbody> 
</table>