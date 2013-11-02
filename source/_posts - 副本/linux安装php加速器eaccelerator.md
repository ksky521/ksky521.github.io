title: "linux安装PHP加速器eAccelerator"
id: 888
date: 2011-11-03 06:42:53
tags:
- linux
- 加速器
- eAccelerator
categories:
- 后端运维
---

感慨下：做**前端开发**不少日子了，在前公司也使用过一段时间linux系统，对apache配置比较熟悉，可是对nginx配置还是不熟悉，毕竟自己是做前端开发的，大后端的事情还是比较排斥，以后多练习。前些日子vps到期了，换了空间，没配置好**eAccelerator**，本来想要朋友全权处理，可是他最近比较忙，只好自己处理了，现在将安装eAccelerator过程记录下，以后留用。

vps是centOS系统，php为nginx+fastcgi，nginx安装目录/usr/local/nginx，php安装目录/usr/local/php，开始在linux安装PHP加速器eAccelerator吧！

## 预编译安装eAccelerator

### 安装前准备

安装之前使用需要安装make和phpize，如果安装过，跳过此步骤。运行下面的命令

```bash
yum install make php5-dev
#ubuntu下用apt-get
```

### 安装eAccelerator

然后开始下载eAccelerator，配置安装编译：

```bash
wget http://bart.eaccelerator.net/source/0.9.6.1/eaccelerator-0.9.6.1.tar.bz2
tar xjf eaccelerator-0.9.6.1.tar.bz2
cd eaccelerator-0.9.6.1
/usr/bin/phpize
./configure -enable-eaccelerator=shared -with-php-config=/usr/bin/php-config
make
make install
```

这时会将eaccelerator安装到php目录中，屏幕会显示`eaccelerator.so`所在路径，例如：
<!--more-->
```bash
Installing shared extensions:/usr/local/webserver/php/lib/php/extensions/no-debug-non-zts-20060613/
```

记住这个路径，在后面的配置文件里面会用到。

### 配置eAccelerator缓存路径

```bash
mkdir /tmp/eaccelerator
chmod 777 /tmp/eaccelerator
```

## 配置eAccelerator

**安装eAccelerator**之后，需要配置才可以使用哦~所以我们需要在php.ini中添加eAccelerator的配置，当然你也可以新建个配置文件，在php.ini中引入配置文件即可。

```ini
[eaccelerator]
zend_extension="/usr/local/webserver/php/lib/php/extensions/no-debug-non-zts-20060613/eaccelerator.so"
eaccelerator.shm_size="8"
eaccelerator.cache_dir="/tmp/eaccelerator"
eaccelerator.enable="1"
eaccelerator.optimizer="1"
eaccelerator.check_mtime="1"
eaccelerator.debug="0"
eaccelerator.filter=""
eaccelerator.shm_max="0"
eaccelerator.shm_ttl="3600"
eaccelerator.shm_prune_period="3600"
eaccelerator.shm_only="0"
eaccelerator.compress="1"
eaccelerator.compress_level="9"
eaccelerator.keys = "disk_only"
eaccelerator.sessions = "disk_only"
eaccelerator.content = "disk_only"
```

### 几个重要配置说明

安装为 Zend extension 模式为上面的配置，如果你使用了thread safe模式安装的PHP，你必须使用 “zend_extension_ts” 替换第二行的 “zend_extension”，安装为 PHP extension 模式为“extension”。

* cache_dir:缓存的文件夹位置，就是上一步我们mkdir的路径。
* shm_size:缓存的大小，根据自己服务器实际情况设置
* enable:开启或关闭 eAccelerator，"1" 为开启，"0" 为关闭。默认值为 "1"。
* optimizer:启或关闭内部优化器，可以提升代码执行速度。"1" 为开启，"0" 为关闭。默认值为 "1"。
* check_mtime:打开或者关闭 PHP 的文件修改检查，"1" 是指打开，"0" 是指关闭。默认值是 "1"。
* debug:开启或关闭调试日志记录。"1" 为开启，"0" 为关闭。默认值为 "0"。会将缓存命中得记录写入日志。
* filter:判断哪些 PHP 文件必须缓存。可以指定缓存和不缓存的文件类型（如 "*.php *.phtml"等）如果参数以 "!" 开头，则匹配这些参数的文件被忽略缓存。默认值为 ""，即，所有 PHP 文件都将被缓存。
* shm_max:当使用 " eaccelerator_put() " 函数时禁止其向共享内存中存储过大的文件。该参数指定允许存储的最大值，单位：字节 (10240, 10K, 1M)。"0" 为不限制。默认值为 "0"。
* shm_ttl:当 eAccelerator 获取新脚本的共享内存大小失败时，它将从共享内存中删除所有在最后 "shm_ttl" 秒内没有存取的脚本缓存。默认值为"0"，为不从共享内存中删除任何缓存文件。
* shm_prune_period:当 eAccelerator 获取新脚本的共享内存大小失败时，他将试图从共享内存中删除早于"shm_prune_period" 秒的缓存脚本。默认值为 "0"，为不从共享内存中删除任何缓存文件。
* shm_only:允许或禁止将已编译脚本缓存在磁盘上。该选项对 session 数据和内容缓存无效。默认值为 "0"，为使用磁盘和共享内存进行缓存。
* compress:允许或禁止压缩内容缓存。默认值为 "1"，为允许压缩。
* compress_level:指定内容缓存的压缩等级。默认值为 "9"，为最高等级。

```ini
eaccelerator.keys = "disk_only"
eaccelerator.sessions = "disk_only"
eaccelerator.content = "disk_only"
```

设置内容缓存的存放的地方，可以设置为：
* shm_and_disk  在共享缓存和硬盘(默认值)
* shm      默认存在共享内存，如果共享内存已满或大小超过 "eaccelerator.shm_max" 的值，就存到硬盘
* shm_only    只存放在共享内存
* disk_only    只存放在硬盘
* none      不缓存数据

### 重启相关服务

```bash
# 重启nginx
/etc/init.d/nginx restart
# 重启PHP-CGI
/etc/init.d/php-fastcgi restart
```

## 查看eAccelerator运行情况

eAccelerator安装包里有一个control.php文件，把它复制到网站的任意目录，然后将路径添加到配置文件，就可以通过这个php文件可以用它查看和管理eAccelerator，这个必须指定，否则查看缓存内容的时候会出错，访问时候默认的用户名是：admin，密码：eAccelerator，用户名和密码可以在control.php中修改：

```ini
eaccelerator.allowed_admin_path = "/data/wsdata/wwwroot"
```

这样我们就可以通过访问`control.php`来查看eAccelerator的命中率了，还可以在线清理缓存目录，查看配置的缓存空间使用率。
