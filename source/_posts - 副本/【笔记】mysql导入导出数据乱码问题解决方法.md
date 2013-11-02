title: "mysql导入导出数据乱码问题解决方法"
id: 1071
date: 2012-10-08 17:44:54
tags:
- mysql
categories:
- 后端运维
---

最近在linux上面用mysqldump导出数据，放在windows系统中导入就会出现中文乱码，然后就会导致出现： `Unknown MySQL server host`和`Can't connect to the server`的错误。

解决mysql导入导出数据乱码问题就是统一导入导出的编码，linux默认的是utf8编码，而windows是gbk编码，所以会出现上面的乱码问题。

## 解决mysql导入导出数据乱码问题

首先要做的是要确定你导出数据的编码格式，使用mysqldump的时候需要加上`--default-character-set=utf8`，例如下面的代码：
<!--more-->

```shell
mysqldump   -uroot  -p  --default-character-set=utf8   dbname tablename  >  bak.sql
```
那么导入数据的时候也要使用`--default-character-set=utf8`：
```shell
mysql -uroot -p --default-character-set=utf8 dbname < bak.sql
```

这样统一编码就解决了mysql数据迁移中的乱码问题了
