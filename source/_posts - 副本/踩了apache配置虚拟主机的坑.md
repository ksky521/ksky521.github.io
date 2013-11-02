title: "踩了apache配置虚拟主机的坑"
id: 1003
date: 2012-06-07 21:46:11
tags:
- apache
- 虚拟主机
categories:
- 后端运维
---

一直使用xampp做apache服务器，可是新版的xampp添加了虚拟主机就访问`127.0.0.1`也跳转到了虚拟主机去了，比如：我添加了`www.demo.com`，路径是`e:\www\demo`，而我的添加完之后，访问`127.0.0.1`竟然也是跑到了`www.demo.com`下面去。

上网找了好多资料说是添加localhost的，于是在httpd.conf最后添加如下配置：

```shell
<VirtualHost *>
    DocumentRoot E:\www
    ServerName 127.0.0.1
#    ErrorLog logs/default-error_log
</VirtualHost>

<Directory "E:\www">
    Options Indexes FollowSymLinks Multiviews
    AllowOverride All
    Order Allow,Deny
    Allow from all
</Directory>
```

发现还是不行，继续查找，期间安装了PHPnow，也是类似的情况，后来无意中看到了NameVirtualHost这个配置，于是写成了：

```shell
NameVirtualHost *
```
重启apache竟然可以了，坑爹啊，记录下，防止下次踩坑！
