title: "使用webbench做压力测试"
id: 930
date: 2012-01-03 23:37:38
tags:
- webbench
- 压力测试
categories:
- 后端运维
---

元旦假期帮朋友折腾VPS，安装了centOS和lnmp，网站部好了，而且定时任务也加上了，觉得应该做个压力测试，之前用过apache自带的ab，不过今天使用的是**webbench**做压力测试。备份下安装测试过程。

首先我们先来安装webbench吧, 为了测试准确，请将 webbench 安装在别的linux服务器上, 因为webbench 做压力测试时，自身也会消耗CPU和内存资源, 否则, 很可能把自己服务器搞挂掉。于是我切换到了ubuntu系统做**webbench测试**。

## 安装webbench

安装过程比较简单，如果你的机子之前安装过一些常用软件直接使用下面的命令就可以了：

```shell
wget http://home.tiscali.cz/~cz210552/distfiles/webbench-1.5.tar.gz
tar zxvf webbench-1.5.tar.gz
cd webbench-1.5
make && make install
```

## webbench安装报错

### 没有安装ctags

如果没有安装 ctags make 编译会报错：`/bin/sh: ctags: command not found`
这时当然是要安装ctags啦，于是：
```shell
apt-get install ctags
```
搞定

### 没有安装gcc

这时候可能会报错：

```bash
cc: Command not found
```

这时需要gcc：

```bash
apt-get install gcc
```

### 其他报错

如果出现下面的错误：

> cannot create regular file `/usr/local/man/man1': No such file or directory
<!--more-->
这时需要创建`/usr/local/man/man1`文件来解决：

> mkdir -m 644 -p /usr/local/man/man1

## 使用webbench做压力测试

经过上面的折腾，webbench终于安装好了，下面要做的就是做个**压力测试**了，在shell里面输入下面的命令：

```shell
webbench -c 500 -t 30 http://127.0.0.1/test.jpg
```

参数说明：-c表示并发数，-t表示时间(秒)

最后就会出现详细的测试信息了：

> Webbench - Simple Web Benchmark 1.5
> Copyright (c) Radim Kolar 1997-2004, GPL Open Source Software.
>
> Benchmarking: GET http://127.0.0.1/test.jpg
> 500 clients, running 30 sec.
>
> Speed=3230 pages/min, 11614212 bytes/sec.
> Requests: 1615 susceed, 0 failed.
