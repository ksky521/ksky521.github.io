title: "VPS 上配置 iptables 防火墙"
id: 1076
date: 2012-10-19 00:02:51
tags:
- VPS
- iptables
- linux
categories:
- 后端运维
---

今天vps告急，ssh都登录不上去，上去很艰难的查了日志，发现几个ip访问异常，应该是某插件的爬虫，之前把图简单`iptables`禁用了，只能再次开启，主要命令如下：

```bash
# 查看状态
$ service iptables status

# 查看规则
$ iptables -L -n

# 清除默认规则
$ iptables -F
$ iptables -X
$ iptables -Z

#####建立新的规则######
# 允许本地回环 127.0.0.1
$ iptables -A INPUT -i lo -p all -j ACCEPT

# 允许已经建立的所有连接
$ iptables -A INPUT -p all -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许所有向外发起的连接
$ iptables -A OUTPUT -j ACCEPT

# 拒绝 ping
$ iptables -A INPUT -p icmp -m icmp --icmp-type 8 -j REJECT

# 允许 SSH 服务端口（一定要打开，不然就不能ssh了）
$ iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 允许 Web 服务端口
$ iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# 拒绝其他所有未被允许的连接
$ iptables -A INPUT -j REJECT
$ iptables -A FORWARD -j REJECT

# 禁用ip
$ iptables -I INPUT -s 124.115.0.199 -j DROP
# 封IP段的命令是
$ iptables -I INPUT -s 124.115.0.0/16 -j DROP
# 封整个段的命令是
$ iptables -I INPUT -s 194.42.0.0/8 -j DROP
# 封几个段的命令是
$ iptables -I INPUT -s 61.37.80.0/24 -j DROP
$ iptables -I INPUT -s 61.37.81.0/24 -j DROP
```

`dport`表示目的，`sport`表示来源，`output`表示本机出，`input`表示访问本机

<!-- more -->


然后就是保存和开机启动centos

```shell
# 保存
$ service iptables save
# 重启
$ service iptables restart
# 确认服务会随开机自动启动
$ chkconfig iptables on
```
