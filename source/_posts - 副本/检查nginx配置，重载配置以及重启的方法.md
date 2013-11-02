title: "检查nginx配置，重载配置以及重启的方法"
id: 885
date: 2011-10-29 18:13:47
tags:
- nginx
- linux
categories:
- 后端运维
---

一直使用apache，新的vps使用的是**nginx**，于是开始折腾nginx了，今天查到了检查nginx配置是否正确和重启的方法，记录下，高手飘过。我的nginx安装在/usr/local/nginx，系统为ubuntu

## 几个常用的nginx命令

Nginx 安装后只有一个程序文件，本身并不提供各种管理程序，它是使用参数和系统信号机制对 Nginx 进程本身进行控制的。 Nginx 的参数包括有如下几个：

可以这样使用

```bash
/usr/local/nginx/sbin/nginx  -参数
```

* -c <path_to_config>：使用指定的配置文件而不是 conf 目录下的 nginx.conf 。
* -t：测试配置文件是否正确，在运行时需要重新加载配置的时候，此命令非常重要，用来检测所修改的配置文件是否有语法错误。
* -s reload 重载
* -s stop 停止

### nginx启动/重启/停止

这个很简单，就是运行命令：

<!--more-->
```bash
sudo /etc/init.d/nginx {start|restart|stop}
```

## nginx检查配置

```bash
/usr/local/nginx/sbin/nginx -t nginx.conf
```

## nginx修改配置后重载

```bash
/usr/local/nginx/sbin/nginx -s reload
```
