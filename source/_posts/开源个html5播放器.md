title: "开源个html5播放器"
id: 1083
date: 2012-11-08 04:53:15
tags:
- html5
- audio
categories:
- 王婆卖瓜
---

前言：人家都说没有几个项目在github，都不好意思说自己混前端的……

好吧，看见越来越多的人都推自己的github主页，我也把自己的之前写的一些东西整理下，从sae的svn迁移到github上，开了几个项目，虽然说代码的确乱糟糟的，但是也凑凑数吧，今天开源的是html5音乐播放器

## html5音乐播放器

* github地址：[https://github.com/ksky521/player](https://github.com/ksky521/player)
* 在线演示地址：[http://4.qdemo.sinaapp.com/html5/chrome/](http://4.qdemo.sinaapp.com/html5/chrome/)

截图如下：
![](http://ww2.sinaimg.cn/bmiddle/796f423btw1dvbr7xm7xdj.jpg "html5 player")

之前放出的是jquery版本的，见文章《[写了一个html5音乐播放器](http://js8.in/1023.html)》也整理到了[这个项目](https://github.com/ksky521/player)中，文件夹是`withjQuery`内。
<!--more-->

### 功能说明

* 支持iOS设备，但是iOS不支持自动下一曲，这是iOS本身限制，支持touch事件
* 支持播放模式：循环，单曲循环
* 支持歌词实时显示，包括显示到title
* 支持静音，iOS不支持……

#### 简单说下歌词显示算法

首先异步获取lrc内容（loadLrc），然后使用正则解析lrc（parseLrc），得到格式如下：
```javascript
{
    words:[],//歌词数组
    times:[],//时间数组
    data:{}//歌曲信息：作者、歌手、长度；有些lrc不会包括此部分，或者不全
}
```

然后循环去除word（歌词）和time（歌词对应时间），生成html，其中会计算出来marginTop位置：


当歌曲播放时，实时获取当前播放时间audio.currentTime（为了提高歌词响应速度会提前100ms），然后遍历歌词nodelist，通过计算data-lrctime，取出当前播放进度对应的P元素，根据此P元素data-lrctop设置marginTop，通过css3实现动画。

### html5版 音乐播放器github地址

[https://github.com/ksky521/player](https://github.com/ksky521/player)
