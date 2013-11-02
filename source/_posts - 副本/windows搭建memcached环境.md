title: "windows搭建memcached环境"
id: 946
date: 2012-02-06 16:55:26
tags:
- memcached
categories:
- 后端运维
---

最近练手php，一个地方需要缓存来支持，想来想去还是用**memcached**做缓存，可是电脑是windows系统，如果是linux系统安装memcached就比较容易，敲入几行shell就搞定，windows下还没搞过，于是记录下过程，备用。

## Windows下的Memcache安装

1、下载memcache for windows。下载地址：[http://jehiah.cz/projects/memcached-win32](http://jehiah.cz/projects/memcached-win32)，推荐下载binaries版本，解压(本例中解压到c:\\memcached)。

2、在命令行状态下输入：

```bash
c:\memcached\memcached.exe -d install
```
 至此memcached已经安装成windows服务

3、在命令行下输入：
```bash
c:\memcached\memcached.exe -d start
```

以启动**memcached服务**。当然也可以选择在windows服务中启动


你没看错，就是这么简单，简简单单的三步memcache的服务器端就准备完毕

## php安装Memcached模块支持

1、下载**php_memcache.dll**模块，你可以从[http://downloads.php.net/pierre/](http://downloads.php.net/pierre/)找到对应的版本，
php5.3的直接下载[http://shikii.net/blog/downloads/php_memcache-cvs-20090703-5.3-VC6-x86.zip](http://shikii.net/blog/downloads/php_memcache-cvs-20090703-5.3-VC6-x86.zip)

2、修改php.ini，添加如下内容：

```text
extension=php_memcache.dll
```
3、重启apache服务器，然后查看一下phpinfo，如果有memcache，那么就说明安装成功！

## 测试windows下的Memcached

测试代码如下：

```php
<?php
$mem = new Memcache;
$mem->connect("127.0.0.1", 11211);
$mem->set('key', 'Hello Memcached!', 0, 60);
$val = $mem->get('key');
echo $val;
```

更多测试代码，需要移步：
[http://www.php.net/manual/en/memcache.examples-overview.php](http://www.php.net/manual/en/memcache.examples-overview.php)

## Memcached的基本设置

<!--more-->

> -p 监听的端口
> -l 连接的IP地址, 默认是本机
> -d start 启动memcached服务
> -d restart 重起memcached服务
> -d stop|shutdown 关闭正在运行的memcached服务
> -d install 安装memcached服务
> -d uninstall 卸载memcached服务
> -u 以的身份运行 (仅在以root运行的时候有效)
> -m 最大内存使用，单位MB。默认64MB
> -M 内存耗尽时返回错误，而不是删除项
> -c 最大同时连接数，默认是1024
> -f 块大小增长因子，默认是1.25
> -n 最小分配空间，key+value+flags默认是48
> -h 显示帮助

### Memcache安装参考资源

* [http://www.codeforest.net/how-to-install-memcached-on-windows-machine](http://www.codeforest.net/how-to-install-memcached-on-windows-machine)
* [http://shikii.net/blog/installing-memcached-for-php-5-3-on-windows-7/](http://shikii.net/blog/installing-memcached-for-php-5-3-on-windows-7/)
