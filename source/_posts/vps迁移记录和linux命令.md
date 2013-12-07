title: vps迁移记录和linux命令
date: 2013-12-07 14:18:21
tags:
- linux
- vps
categories:
- 后端运维
---

因为之前的乐谷云集找不到老巢了，官网都挂了，网上说是跑路了，虽然之前有人联系过我说是有他们公司接管，但是等出现问题联系的时候，却是找不到人。所以决定更换vps。简单记录下用到的这次vps迁移用到的命令。

新的vps是用的centos 32。
## 登陆后更换密码
连上ssh之后，第一件事情就是更换root密码，用到的命令是``passwd``

连续两次输入新的密码就可以。
### 添加新用户www

``passwd www`` 继续数据www的密码。就可以添加

## 安装软件包命令Yum
ubuntu的包管理软件是``app-get``，centos的包管理软件是``yum``，因为我的vps是centos，所以使用``yum``。

```bash
# 安装
yum install xxx
# 删除
yum remove httpd
```

因为我使用的是lnmp，所以对于默认安装的apache可以删除，使用``yum remove httpd``。

## 使用screen来管理对话
经常就是遇见网络连接不好，ssh中断，那么执行的程序就不知道会不会成功，所以有了``screen``。如果使用``screen --help``没有命令，那么需要安装下：

``yum install screen``

### screen常用命令

```bash
# 创建screen对话
screen -S lnmp
# 查看现在运行的screen
screen -ls
# 读取某个screen
screen -r lnmp
# 退出screen，在当前screen中执行exit
exit
```

<!--more-->

## 安装lnmp
CentOS系统下执行：``wget -c http://soft.vpser.net/lnmp/lnmp1.0-full.tar.gz && tar zxvf lnmp1.0-full.tar.gz && cd lnmp1.0-full && ./centos.sh``
Debian系统下执行：``wget -c http://soft.vpser.net/lnmp/lnmp1.0-full.tar.gz && tar zxvf lnmp1.0-full.tar.gz && cd lnmp1.0-full && ./debian.sh``
Ubuntu系统下执行：``wget -c http://soft.vpser.net/lnmp/lnmp1.0-full.tar.gz && tar zxvf lnmp1.0-full.tar.gz && cd lnmp1.0-full && ./ubuntu.sh``

中间会要你选择php版本，mysql版本，mysql root密码
### lnmp状态管理命令

* LNMP状态管理： ``/root/lnmp {start|stop|reload|restart|kill|status}``
* Nginx状态管理：``/etc/init.d/nginx {start|stop|reload|restart}``
* MySQL状态管理：``/etc/init.d/mysql {start|stop|restart|reload|force-reload|status}``
* Memcached状态管理：``/etc/init.d/memcached {start|stop|restart}``
* PHP-FPM状态管理：``/etc/init.d/php-fpm {start|stop|quit|restart|reload|logrotate}``
* PureFTPd状态管理： ``/etc/init.d/pureftpd {start|stop|restart|kill|status}``
* ProFTPd状态管理：`` /etc/init.d/proftpd {start|stop|restart|reload}``

如重启LNMP，输入命令：``/root/lnmp restart`` 即可，单独重启mysql：``/etc/init.d/mysql restart``

大约要经过一个小时（看自己的vps的网速了）

### LNMP相关软件安装目录
Nginx 目录: /usr/local/nginx/
MySQL 目录 : /usr/local/mysql/
MySQL数据库所在目录：/usr/local/mysql/var/
PHP目录 : /usr/local/php/
PHPMyAdmin目录 : 0.9版为/home/wwwroot/phpmyadmin/ 1.0版为 /home/wwwroot/default/phpmyadmin/ 强烈建议将此目录重命名为其不容易猜到的名字。phpmyadmin可自己从官网下载新版替换。
默认网站目录 : 0.9版为 /home/wwwroot/ 1.0版为 /home/wwwroot/default/
Nginx日志目录：/home/wwwlogs/
/root/vhost.sh添加的虚拟主机配置文件所在目录：/usr/local/nginx/conf/vhost/
PureFtpd 目录：/usr/local/pureftpd/
PureFtpd web管理目录： 0.9版为/home/wwwroot/default/ftp/ 1.0版为 /home/wwwroot/default/ftp/
Proftpd 目录：/usr/local/proftpd/
### LNMP相关配置文件位置
Nginx主配置文件：/usr/local/nginx/conf/nginx.conf
/root/vhost.sh添加的虚拟主机配置文件：/usr/local/nginx/conf/vhost/域名.conf
MySQL配置文件：/etc/my.cnf
PHP配置文件：/usr/local/php/etc/php.ini
php-fpm配置文件：/usr/local/php/etc/php-fpm.conf
PureFtpd配置文件：/usr/local/pureftpd/pure-ftpd.conf
PureFtpd MySQL配置文件：/usr/local/pureftpd/pureftpd-mysql.conf
Proftpd配置文件：/usr/local/proftpd/etc/proftpd.conf
Proftpd 用户配置文件：/usr/local/proftpd/etc/vhost/用户名.conf

### LNMPA相关目录文件位置
Apache目录：/usr/local/apache/
Apache配置文件：/usr/local/apache/conf/httpd.conf
Apache虚拟主机配置文件目录：/usr/local/apache/conf/vhost/

## 安装nodejs
作为前端，当然要安装nodejs啦，可是centos不能像ubuntu那么方便使用``apt-get``，而需要自己编译，后来在nodejs官网看到了centos也可以使用包管理：[https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

依次在命令行中执行：
```bash
yum repolist
curl -O http://download-i2.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
sudo rpm -ivh epel-release-6-8.noarch.rpm
sudo yum install npm --enablerepo=epel
```

经过上面折腾，一般就可以了，使用``node -v`` 和 ``npm -v``就可以了。

这时候可以试下安装nodeppt是否成功：``npm install -g nodeppt``

## 备份之前的vps数据
打包之前的web程序，使用zip。

```bash
# 打包
zip -r www.zip www
# 解压
unzip www.zip
```

### 备份数据库

``mysqldump -u root -p --default-character-set=utf8 --all-databases > all1207.sql``

为了传输方便，可以使用zip将all1207.sql打包

### vps之间传输数据scp
例如在B上要将A在``/home/root/all.zip``传输到``/home``：

``scp root@A:/home/root/all.zip /home``

如果需要传输的是文件夹，那么需要添加``-r``

``scp -r root@A:/home/root/ /home``

### 导入数据库

进入mysql：``mysql -u root -p``， 导入数据：

``mysql>source /home/root/all.sql``

## lnmp优化
lnmp虽然已经优化的不错了，但是根据自己的vps特点，比如多核、内存大小，可以调整下自己的lnmp配置。
### 安装eAccelerator

**eAccelerator**是我用的php加速器，lnmp中安装还是很简单的，进入lnmp的下载包，然后执行``./eaccelerator.sh ``，根据提示选择对应的eAccelerator的版本就好，我因为是php5.3所以选择了``new``。
#### 配置eAccelerator

安装后可以下载eAccelerator的管理php，首先打开php，修改下登录用户名和密码，然后放在自己的网络根目录就可以访问了。默认设置缓存是1M，感觉有点小，可以参考下《[linux安装PHP加速器eAccelerator](http://js8.in/2011/11/03/linux%E5%AE%89%E8%A3%85php%E5%8A%A0%E9%80%9F%E5%99%A8eaccelerator/) 》修改下配置。

### 安装memcached
memcached是内存缓存，可以将查询出来的mysql之类的数据，存入memcached来减少IO操作。在lnmp中安装也是很简单的，同样是进入lnmp的包，执行``./memcached.sh``，就可以了

#### 启动memcached

``/usr/local/memcached/bin/memcached -d -p 11214 -u root -m 10 -c 1024 -t 8 -P /tmp/memcached.pid``

### 关闭mysql日志
mysql的日志功能，一般没啥用，之前我的vps曾经因为mysql日志太多导致硬盘报警，所以这次我就直接关闭了：

#### 删除日志
执行：``/usr/local/mysql/bin/mysql -u root -p``
输入密码登录后再执行：``reset master;``

修改``/etc/my.cnf`` 文件，找到
```
log-bin=mysql-bin
binlog_format=mixed
```

### 开机自启动
修改``/etc/rc.d/rc.local``。需要用vi执行：``vi /etc/rc.d/rc.local``，比如要将memcached添加到自启动任务重，需要给``rc.local`` 添加下面的命令：

```bash
/usr/local/memcached/bin/memcached -d -p 11214 -u root -m 10 -c 1024 -t 8 -P /tmp/memcached.pid
/usr/local/memcached/bin/memcached -d -p 11211 -u root -m 14 -c 1024 -t 8 -P /tmp/memcached-main.pid
```

### crontab定时任务
在命令行中执行``crontab -e`` 进入定时任务页面，跟vi使用一样，编辑好了``:wq``就可以了。通过crontab 可以做日志切割，负载过高自动重启。
#### 切割日志
```bash
#!/bin/bash
# This script run at 00:00

# The Nginx logs path
logs_path="/xxx/logs/"

mkdir -p ${logs_path}$(date -d "yesterday" +"%Y%m%d")/


mv /home/wwwlogs/* ${logs_path}$(date -d "yesterday" +"%Y%m%d")/
kill -USR1 `cat /usr/local/nginx/logs/nginx.pid`

```

添加crontab，每天凌晨0点执行：``00 00 * * * /bin/sh /xxx/bin/cut_nginx_logs.sh
``


#### 负载过高自动重启负载
```bash
#!/bin/bash
# script to check server for extremely high load and restart Apache if the condition is matched
check=`cat /proc/loadavg | sed 's/./ /' | awk '{print $1}'`
check=$( printf "%.0f" $check )
# define max load avarage when script is triggered
max_load=15
# log file
high_load_log='/root/lnmp_high_load_restart.log'

# location to Lnmp init script
lnmp='/root/lnmp'

if [ $check -gt "$max_load" ]; then
    $lnmp stop
    sleep 5
    $lnmp restart
    echo "$(date) : Lnmp Restart due to excessive load | $check |" >> $high_load_log
fi

```

添加crontab，没十分钟检测一次：``*/10 * * * * /bin/sh /root/lnmp_auto_restart.sh``

### 增强php安全
我使用了phpsecinfo来查看php的配置，具体可以查看下[http://phpsec.org/projects/phpsecinfo/](http://phpsec.org/projects/phpsecinfo/)。根据自己情况修改php.ini 然后重启php-fpm即可。

### 软连接ln

``ln -s /home/www/webroot /webroot``

### nginx reload
当配置了新的nginx 虚拟主机，或者修改了nginx配置文件，可以通过下面的命令reload配置，而不需要重启nginx造成网站中断：

``/usr/local/nginx/sbin/nginx -s reload``
