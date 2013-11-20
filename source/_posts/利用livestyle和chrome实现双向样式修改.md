title: 利用livestyle和chrome实现双向样式修改
date: 2013-11-17 17:02:57
tags:
- 工具
- livestyle
categories:
- 前端开发
---

最近看[老外的ppt](http://t.cn/8DFQUsd)，看到了句话：

> Use tools. not rules!

所以今天介绍个利器：liveStyle，liveStyle是Emmet团队开发的，Emmet就是大名鼎鼎的zen coding啊。

其实在订阅的weekly里面早就介绍过livestyle，真正用起来还是看了上面老外的这个ppt，试用了下liveStyle，结果一下子就喜欢上了，如果你开发遇见了下面的问题就可以使用liveStyle了：

1. 在chrome DevTools中修改了样式，想同步到css文件中
1. 修改了css文件，不想刷新chrome，就可以实时看到效果

嗯，livestyle解决了这两个问题，提高了开发效率！

## livestyle安装

### 安装sublime text的liveStyle插件

在``package control``搜索``livestyle``就可以了，或者去[官方](http://livestyle.emmet.io/)下载

### 安装chrome扩展
通过[这个网址](https://chrome.google.com/webstore/detail/diebikgmpmeppiilkaijjbdgciafajmg)，安装livestyle，如果打不开，可能需要准备梯子，你懂的~ 感谢裆~

安装后，在chrome中按``F12``打开DevTools就可以看到在``console``后面多了个``LiveStyle``面板。

## 使用livestyle

1. 用sublime text 打开一个css文件，例如a.css
1. 随便打开个网址，然后``F12`` 切换到LiveStyle
1. 选中``Enable LiveStyle for current page``，这时会把页面的所有css都列出来
1. 选择一个需要替换的css，在下拉框中选择要替换掉的sublime打开的css文件，例如：a.css；或者点击``add file``按钮
1. 这时候在sublime中修改a.css，就可以在chrome中实时看到效果；在chrome修改样式，也可以将修改同步到a.css文件中

