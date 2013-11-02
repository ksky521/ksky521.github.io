title: "nginx1.2.4: [warn] \"log_format\" directive used only on \"http\" level 解决方法"
id: 1073
date: 2012-10-18 18:21:25
tags:
- linux
- nginx
categories:
- 后端运维
---

将nginx升级到1.2.4稳定版之后，会发现之前的`vhost/*.conf`中的日志配置都报了如下的warn：

```text
nginx: [warn] the “log_format” directive may be used only on “http” level
```

上网搜索解决方案如下：

将/vhost/xxx.conf里server段里的下面代码移出该server段即可。

但是这样的又会产生一个问题，就是各子域名的日志文件都会记录所有请求的日志，等了好久都没找到解决方案，后来请教了飞飞之后终于找到解决的方法了。

原来`log_format`需要在`nginx.conf`的http层定义，然后在分域名下面就不用定义`log_format`，直接引用即可，即：
在nginx.conf中http层添加：

```text
log_format Main ‘$remote_addr – $remote_user [$time_local] “$request” ‘
‘$status $body_bytes_sent “$http_referer” ‘
‘”$http_user_agent” $http_x_forwarded_for $request_time’;
```

然后在vhost/*.conf中server中直接写：

```log
access_log ./logs/blog.log Main;
```

但是注意`include vhost/*.conf`要放在`log_format`之后哦，不然会找不到`Main`的
