title: "JS写小游戏「跳一跳」外挂之自己动"
date: 2018-01-08 13:25:54
tags:
- Nodejs
- 游戏
- 练手
categories:
- 前端开发
---

上篇文章写道怎么通过Canvas识别跳转位置，本篇文章重点介绍怎样使用adb命令操作「小人」自己挑动。

## adb是什么
adb是`Andorid Debug Bridge`，可以将安卓手机打开USB调试模式，然后连接USB线到电脑，就可以通过adb执行调试命令。

### adb安装

mac下面使用brew安装

```bash
brew cask install android-platform-tools
```

windows下面去搜索下载，然后放到环境变量里面去，保证命令行执行adb可以成功。

### 测试连接成功

使用`adb devices`查看是否连接成功，如果连接成功会出现设备的编号。

## 小人跳转需要的命令

整个自动跳动的流程是这样的：

1. 调用adb命令获取手机当前屏幕截图
2. 拉取截图到本地路径
3. 通过js读取图片分析中心点位置计算跳转需要按压时长
4. 同adb命令发送长按命令

通过node的`child_process`核心代码执行adb的命令如下：

```bash
//截屏，放到sdcard的根目录下
adb shell screencap -p /sdcard/screencap.png
//拉取截图图片到本地电脑
//   将remote路径的图片拉取到本地的路径
adb pull ${SCREENCAP_REMOTE_PATH} ${SCREENCAP_PATH}/screencap.png
//发起长按，swipe后面是开始和结束的手指位置坐标，timeout是时长
adb shell input swipe ${r + 10} ${r + 20} ${r - 10} ${r - 2} ${timeout}
```

### 特殊说明
`2.04`是跳转系数，这个是从其他代码里面直接拿过来的，对应的是720宽度的手机会比较准确，可能不同的手机dpi和屏幕宽度会有不同的值，具体实践中需要根据自己手机情况调整一下。

我在红米4手机上面可以轻松几乎每次都是中心点，轻松过千。

可以看下面的红米机器的视频：

[https://v.qq.com/x/page/t1331wmep7e.html](https://v.qq.com/x/page/t1331wmep7e.html)