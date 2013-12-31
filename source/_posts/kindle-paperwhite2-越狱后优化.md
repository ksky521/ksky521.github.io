title: kindle paperwhite2 越狱后优化
date: 2013-12-31 14:53:24
tags:
- 越狱
- kindle
categories:
- 折腾一下
---
上篇已经说了怎么越狱，因为我的pw2是日版的，发现很耗电，删除了很多书了，还是三四天就开始出没电报警了。通过越狱后可以关掉索引，这样耗电量就小好多了，到现在一周了，电量还没消耗掉50%（最近一天看书2小时左右），这对于我来说已经很满意了。
## ssh登录kindle
按照[上篇](http://js8.in/2013/12/29/kindle-paperwhite2-542%E8%B6%8A%E7%8B%B1/)操作，越狱之后 ，在搜索输入框内输入`;711` 就可以看到自己现在wifi的ip。

### 生成SSH密钥

为了每次方便，我使用了`puttygen.exe`生成了ssh密钥。操作跟github的一样，打开`puttygen.exe`，点击`Generate` 然后鼠标在key下面来回晃动，生成一个key，将生成的key复制，保存为：`authorized_keys`。点击`save private key`，将生成的密钥保存在硬盘上，例如：`c:\private-key-for -kpw.ppk`。

usb连上kindle，放在`usbnet/etc`文件夹下。

### SSH连接kindle
按照[上篇](http://js8.in/2013/12/29/kindle-paperwhite2-542%E8%B6%8A%E7%8B%B1/)中【安装USBNetwork】操作，打开wifi连接ssh。使用`;711`查询出kindle在现在网络的ip。

打开winscp，新建一个ssh会话，例如：sftp://192.168.xxx.xxx，用户名是root，端口22，用户密钥文件，选择上面保存的ppk地址，例如`c:\private-key-for -kpw.ppk`

然后点击登录，就可以登录kindle了。
## 关闭索引
kindle的索引是不停的在后台建立的，当书籍比较多或者书比较大的情况下，一般会碰见卡索引的问题，这时候需要关闭索引了，减少耗电！个人认为索引是比较鸡肋的功能。因人而异哈~

ssh连上kindle之后，执行

<!--more-->
```bash
mntroot rw
/etc/upstart/framework stop
vi etc/upstart/framework
```
编辑文件，查找`DENABLE_SEARCH_INDEXING_THREAD=true`，将后面的`true`改成`false`，保存退出。在执行：

```bash
mntroot ro
/etc/upstart/framework start
```

### 删除多余语言包，节省资源

/usr/java/bin/cvm 这个进程加载了很多jar包，从名字上看还都是语言包。可以将不用的语言包暂时转移出去，转移之前要做好备份哦

下面是转移的shell:
```bash
#!/bin/sh

/etc/upstart/framework stop

cd /opt/amazon/ebook/lib
mkdir -p /mnt/us/.backup/opt/amazon/ebook/lib
mv *de_DE.jar /mnt/us/.backup/opt/amazon/ebook/lib/
mv *es_ES.jar /mnt/us/.backup/opt/amazon/ebook/lib/
mv *fr_FR.jar /mnt/us/.backup/opt/amazon/ebook/lib/
mv *it_IT.jar /mnt/us/.backup/opt/amazon/ebook/lib/
mv *ja_JP.jar /mnt/us/.backup/opt/amazon/ebook/lib/
mv *pt_BR.jar /mnt/us/.backup/opt/amazon/ebook/lib/

/etc/upstart/framework start

reboot
```
保存在kindle上，然后执行下上面的shell就可以了
先在`mnt/us`下面建立一个.backup文件夹，用于备份，`mnt/us`就是平时使用usb链接kindle后的文件夹。

## 禁止OTA
编辑 `/etc/upstart/ota-update.conf `，在`source /etc/upstart/functions`下面添加
```bash
############## DISABLE OTA UPDATES ##############
if [ -e "/mnt/us/DISABLE_OTA" ]
then
f_log E ota-update check "" "####################################################"
f_log E ota-update check "" "# UPDATES DISABLED in /etc/upstart/ota-update.conf #"
f_log E ota-update check "" "# REMOVE FILE /mnt/us/DISABLE_OTA (in USB root) #"
f_log E ota-update check "" "####################################################"
return $ERR_LOW_BAT
fi
############## DISABLE OTA UPDATES ##############
```
如果要禁用OTA，那么在usb链接kindle后，在根目录放一个`DISABLE_OAT`就好了，如果没有这个文件，就不会禁用OTA，很方便哦

## 更换屏保
kindle的屏保看腻了？那就自己换个吧，依次执行下面的命令：
```bash
# 挂载系统可写
mntroot rw
# 备份自带的屏保
mv /usr/share/blanket/screensaver /usr/share/blanket/screensaver.bak
# 将屏保目录软链接到自定义目录
ln -s /mnt/us/screensaver /usr/share/blanket/screensaver
# 重新挂载文件系统为只读
mntroot ro
```
**注意**屏保文件名格式是bg_medium_ssxx.png,其中xx为编号，并且必须从00开始编号。原始壁纸为20张，但是自定义的目录不到20张也是可以的。操作完成之后如果屏保显示不正常，重启一下即可(重启的时候不要连电脑)。
