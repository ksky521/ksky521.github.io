title: "使用Apache htpasswd.exe来管理SVN帐户"
id: 518
date: 2010-04-11 21:07:40
tags: 
categories: 
- 网络技术
---

安装完SVN，需要配置到Apache，需要建立一个账户管理文件如：**passwd**，可是建立了passwd，需要添加SVN用户的时候，我们应该怎么操作呢？这时我们就要用到Apache下的DOS文件——**htpasswd**.exe啦！

### 1、htpasswd基本语法

htpasswd.exe在**Apache**文件夹下的bin中，htpasswd的基本**语法**是：
> **htpasswd [-cmdpsD] passwordfile username
> htpasswd -b[cmdpsD] passwordfile username password**
如我们要在G盘创建一个passwd的文件，需要用到下面的**命令**
> htpasswd -c G:\\passwd wyq
回车会出现提示，要你输入wyq的密码，输入两次后，就可以在G盘看到刚才我们创建的passwd文件了~其中密码是md5加密的~
如果我们不想输入密码，就可以直接使用下面的命令：
> htpasswd -c G:\\passwd wyq wyq
<!--more-->

### 2、htpasswd删除用户

**htpasswd -D passwordfile username**
例如要删除wyq的用户：
> htpasswd -D G:\\passwd wyq

### 3、htpasswd添加用户

**htpasswd  passwordfile username**
例如要添加wyq的用户：
> htpasswd G:\\passwd wyq

### 4、htpasswd更改密码

**htpasswd passwordfile username**
例如要更改wyq的密码：
> htpasswd G:\\passwd wyq