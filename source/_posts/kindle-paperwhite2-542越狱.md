title: kindle paperwhite2 5.4.2越狱
date: 2013-12-29 17:28:58
tags:
- 越狱
- kindle
categories:
- 折腾一下
---
买了kindle有一段时间了，发现电池并没有官方说的那么给力，我的pw2是从日本托朋友代购的，发现充电满了一天就差不多掉1/3的样子，曾经打电话给国内的亚马逊寻求帮助，但是国内亚马逊以国内还没上线为由没给我处理，要我自己到日亚提问？！

上网查了下，听说关掉索引会解决这个问题，于是我就一直琢磨这怎么越狱。


## kindle越狱工具

我的越狱工具是从mobileread下载的：[http://www.mobileread.com/forums/showthread.php?t=186645](http://www.mobileread.com/forums/showthread.php?t=186645)。

## kindle越狱

首先解压上面下载的kindle-jailbreak.zip越狱工具，得到三个文件：

* bridge.sh
* jb.sh
* update_jb_$(cd mnt && cd us && sh jb.sh).bin

将这个这三个文件copy到kindle的根目录下，然后*断开USB*连接，返回kindle[主页]，点击[菜单]中的[设置]，进入设置页面之后，再点击[菜单]选择[更新设备]，这时候会执行bin文件，过一会儿之后，你就会在这个界面下面看到

**** JAILBREAK ****

就表示已经越狱成功了

## 安装启动器KUAL

安装插件之前需要安装KUAL作为启动器。启动器下载地址：[http://www.mobileread.com/forums/showthread.php?t=203326](http://www.mobileread.com/forums/showthread.php?t=203326)

<!--more-->
下载prerequisites-all-supported-devices.zip，解压会得到类似update_kindlet-xxxx_install.bin，将该bin文件拷贝至KPW根目录，然后断开KPW的USB连接，然后按照之前的操作，选择[更新你的设备]更新Kindle。如果有重启，请不要担心哦~

下载：KUAL.V.2.2.zip ，解压得到一个azw2的格式文件，这个就是KUAL启动器了，将这个文件copy到kindle的`documents`文件下，就可以了。

这时候你再打开自己的kindle就会发现多了一本书：`KindleLauncher`。其实这个就是KUAL启动器了。

## 安装kindle扩展插件
基于KUAL启动器有很多扩展，这些扩展基本都是绿色版的，即将文件copy到kindle的`extensions`文件夹下，然后在`KindleLauncher`中启动就好了

## 安装USBNetwork

USBNetwork是kindle的一个扩展，可以查到kindle的ip信息，甚至实现wifi传书和远程ssh功能。

还是在第一个[帖子地址](http://www.mobileread.com/forums/showthread.php?t=186645)，下载kindle-usbnet-0.15.N.zip 这个文件，解压得到一个类似update_usbnet_XXX_install.bin的bin文件，copy到kindle的根目录，端口USB，按照前面的操作[更新你的设备]，等重启后就安装好了。

重启后，进入KUAL，就看到多了个USBNetwork菜单，点击进去，依次选择：

* Allow SSH Over WiFi
* Restrict SSH to WIFI, stay in USBMS

这样就开启了SSH功能。

### 查看kindle连接wifi信息

在搜索的输入框内，输入`;711` 点击搜索，就进入了Wifi详情页。如果有多页，可以滑动切换到下一页，在这里你就可以找到自己kindle在当前wifi的ip地址了。



