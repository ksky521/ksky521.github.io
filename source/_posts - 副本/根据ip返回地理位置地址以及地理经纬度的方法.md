title: "根据IP返回地理位置地址以及地理经纬度的方法"
id: 308
date: 2009-10-28 17:58:27
tags: 
categories: 
- 网络技术
---

今天做了一个[基于**Google**地图的根据IP返回地理位置的接口](http://js8.in/mywork/ipsearch/)，效果演示地址：http://js8.in/mywork/ipsearch/

可以输入域名，如：js8.in，既可以返回**地理位置**，并且把地理位置定位到Google地图上，并且在地图上打开气泡显示经纬度。

效果图：
[![根据IP返回地理位置接口](http://js8.in/wp-content/uploads/2009/10/Snap1-300x240.jpg "根据IP返回地理位置接口")](http://js8.in/mywork/ipsearch/)

关于这个**IP查询**接口的调用方法：http://js8.in/mywork/ipsearch/ipsearch.php?ip=你要查询的IP地址或者域名（如js8.in）

程序说明：

1、IP数据库采用了纯真IP数据库10.25日最新版，可能有时间就更新一下数据库内容。
2、获取的经纬度是根据Google的地图接口，返回的数据~对于国内的**经纬度**应该有一定的偏移（国家法律规定的），但是在Google上使用应该是可以的~