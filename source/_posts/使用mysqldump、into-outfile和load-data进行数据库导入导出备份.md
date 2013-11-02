title: "使用mysqldump、into outfile和load data进行数据库导入导出备份"
id: 642
date: 2010-12-03 19:02:53
tags:
- mysql
categories:
- 乱七八糟
---
遇到了大批量导入导出数据的时候真的比较麻烦，动则几G的数据，操作起来也是比较慢的，而且如果稍有不慎，还要重写处理，最简单的方法也是效率最低的方法就是使用PHP写导入导出数据程序，用Shell来跑PHP，可是大家一直忽略了**mysqldump**和mysql的**into outfile**与**load data**，如果这几个命令使用灵活了，对于数据库导入导出以及备份是很方便的。下面简单讲解一下，高手飘过，因为对于数据库操作我也是小白。

### 使用mysqldump 和 source导入导出备份数据

如果要导出整个数据库 或者某一个数据库的一个表，并且保持数据库中表的名字不变，再次导入到另外一个数据库的时候，可以使用mysqldump和source的方法。mysqldump的具体使用参数可以使用`mysqldump --help`来查看，这里我简单说下我常用的几种参数。

1、mysqldump导出整个表的数据，包括建表信息，这也是最基础的用法

```mysql
mysqldump -uusername -ppassword databasename tablename > /home/db/db_bak2012```
其中-u -p 和mysql的参数是一样的，分别代表了用户名和密码，后面跟着是数据库名和表明，>之后的是要导出的路径。

上面的导出数据要导入数据库的时候可以进入mysql，然后使用下面的命令来实现

```mysql
source /home/db/db_bak2012```
<!--more-->
PS:这种方法是导出整个表数据，并且带着建表信息，假如导入的数据库有同名的表，会被替换

2、使用mysqldump导出固定条件的数据库
**mysqldump**有一个参数where可以设置导出固定条件的数据库，where有个简写就是w，前者使用方法是--where后者是-w
例如，我要导出名字为data0数据库table0中status为1的记录，可以使用下面的命令
mysqldump -uusername -ppassword data0 table0 -wstatus=1 > /home/db/db_bak2012
3、前两种方法导出的数据都有建表数据，如果导出的数据只是追加，那么使用mysqldump的两个参数--no-create-info和--no-create-db，也就是下面的例子：

```mysql

mysqldump -uusername -ppassword databasename tablename --no-create-db --no-create-info > /home/db/db_bak2012
```

### 使用into outfile 和 load data infile导入导出备份数据

如果要导出一个表中的部分字段或者部分符合条件的记录，需要用到了mysql的**into outfile** 和** load data infile**。
例如下面的mysql命令是把select的mytable表中的数据导出到/home/db_bak2012文件。

```mysql

select * from mytable where status!=0 and name!='' into outfile '/home/db_bak2012' fields terminated by '|' enclosed by '"' lines terminated by '\r\n' ;
```
假如要导入刚才备份的数据，可以使用load file方法，例如下面的mysql命令，把导出的数据导入了mytable_bak的表中：

```mysql

load data infile  '/home/db_bak2012' into table mytable_bak fields terminated by '|' enclosed by '"' lines terminated by '\r\n' ;```

这种方法的好处是，导出的数据可以自己规定格式，并且导出的是纯数据，不存在建表信息，你可以直接导入另外一个同数据库的不同表中，相对于mysqldump比较灵活机动。