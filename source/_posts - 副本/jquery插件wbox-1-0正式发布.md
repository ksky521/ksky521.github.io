title: "jQuery弹出框插件wBox 1.0正式发布"
id: 539
date: 2010-05-24 19:19:11
tags: 
categories: 
- JavaScript
- 网络技术
---

jQuery插件**wBox **1.0正式发布——经过一系列的wBox需求分析，进行了wBox的代码重构，去除了一些鸡肋的功能~根据公司项目的需要进行了功能的调整，并且在界面上进行了美化处理~

[caption id="attachment_540" align="aligncenter" width="442" caption="wBox截图"][![wBox截图](http://js8.in/wp-content/uploads/2010/05/Snap2.jpg "wBox截图")](http://js8.in/wp-content/uploads/2010/05/Snap2.jpg)[/caption]

[查看wBox代码实例](http://js8.in/wbox/)[wBox1.0下载](http://code.google.com/p/jquery-wbox/downloads/list)

### wBox新功能及其变化

1.  优化代码~
2.  美化界面~
3.  默认可拖动，drag为false关闭
4.  新增**wBox**关闭方法：wBox.close()
5.  新增wBox打开方法：wBox.showBox()
6.  新增wBox定时关闭设置：通过参数timeout设置定时关闭时间
7.  新增在不触发click事件的前提，显示wBox，$(s).wBox({show:true})
8.  去除灯箱功能（准备做一个单独的jQuery灯箱插件）
9.  去除设置窗口位置
<!--more-->

### wBox功能特点

1.  背景透明度可以根据实际情况进行调节
2.  可以根据需要添加wBox标题
3.  支持callback函数
4.  支持html内容自定义
5.  支持在wBox显示#ID的内容
6.  支持Ajax页面内容
7.  支持iframe
8.  支持wBox拖拽功能
9.  ESC键，或者在背景上双击即可关闭wBox
10.  Class为wBox_close点击可以关闭wBox，无论是组装的html，还是隐藏的html，甚至于iframe的内容中的.wBox_close

[查看wBox代码实例](http://js8.in/wbox/)[wBox1.0下载](http://code.google.com/p/jquery-wbox/downloads/list)