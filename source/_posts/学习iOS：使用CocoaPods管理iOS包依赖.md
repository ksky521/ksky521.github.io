title: 学习iOS：使用CocoaPods管理iOS包依赖
date: 2016-05-23 22:16:25
tags:
- iOS
- CocoaPods
categories:
- iOS开发
---

iOS的生态中CocoaPods是包依赖管理工具，等同于node生态中的npm，OSX中的brew，linux的apt-get、yum这些工具，下面介绍下CocoaPods的安装和基本使用方法

## 安装
首先要有ruby（Mac自带哦~），然后执行gem

```bash
sudo gem install cocoapads
pod setup
```

这时候估计会报：`Operation not permitted - /usr/bin/xcodeproj`错误，需要执行下面的操作：

```bash
 mkdir -p $HOME/Software/ruby
$ export GEM_HOME=$HOME/Software/ruby
$ gem install cocoapods
[...]
1 gem installed
$ export PATH=$PATH:$HOME/Software/ruby/bin
$ pod --version
1.0.0
```

我是修改了`.bash_profile`（zsh修改.zshrc），将`export GEM_HOME=$HOME/Software/ruby`放进去，把`$HOME/Software/ruby/bin`加入`PATH`。这时候在再执行`gem install cocoapads` 就不会报错了。

`pod setup`在执行时，会输出`Setting up CocoaPods master repo`，但是会等待比较久的时间。这步其实是 Cocoapods 在将它的信息下载到 `~/.cocoapods`目录下，如果你等太久，可以试着 cd 到那个目录，用`du -sh *`来查看下载进度。你也可以参考下面的 **使用 cocoapods 的镜像索引** 一节的内容来提高下载速度。

### 使用 CocoaPods 的镜像索引
所有的项目的 Podspec 文件都托管在`https://github.com/CocoaPods/Specs`。第一次执行pod setup时，CocoaPods 会将这些podspec索引文件更新到本地的 `~/.cocoapods/`目录下，这个索引文件比较大，有 80M 左右。所以第一次更新时非常慢，笔者就更新了将近 1 个小时才完成。
一个叫 [akinliu](http://akinliu.github.io/2014/05/03/cocoapods-specs-/) 的朋友在 gitcafe 和 oschina 上建立了 CocoaPods 索引库的镜像，因为 gitcafe 和 oschina 都是国内的服务器，所以在执行索引更新操作时，会快很多。如下操作可以将 CocoaPods 设置成使用 gitcafe 镜像：
```bash
pod repo remove master
pod repo add master https://gitcafe.com/akuandev/Specs.git
pod repo update
```
将以上代码中的 https://gitcafe.com/akuandev/Specs.git 替换成 http://git.oschina.net/akuandev/Specs.git 即可使用 oschina 上的镜像。

## 使用CocoaPads管理iOS依赖
CocoaPads的基本命令是`pod`，常用的方法如下

* 初始化：进入项目路径 `pod init `
* 安装：`pod MODULE_NAME`
* 安装特定版本的依赖：`pod MODULE_NAME, 版本`，例如：`pod 'Objection', '0.9'`
* 更新 `pod update`
* 搜索 `pod search MODULE_NAME`

## Podfile介绍
在`pod init`的时候会在你项目中创建一个`Podfile` 文件，很类似npm的 `package.json`，如果一个项目中已经有了`Podfile`， 就可以直接进入该目录然后执行 `pod install`，就会安装上`Podfile`中的依赖包

## Podfile.lock介绍
执行`pod install`之后会生成`Podfile.lock`放在目录中，为了保证每次执行`pod install`的版本一致性，所以建议把`Podfile.lock`放入版本库维护，如果需要更新某个包的版本，执行`pod update`，则`Podfile.lock`文件会发生变化，记得提交到版本库

## 参考文章

* https://guides.cocoapods.org/
* http://blog.devtang.com/2014/05/25/use-cocoapod-to-manage-ios-lib-dependency/
* http://studentdeng.github.io/blog/2013/09/13/cocoapods-tutorial/
* https://github.com/CocoaPods/CocoaPods/issues/3692

