title: "Ubuntu安装Samba实现跟windows文件共享"
id: 526
date: 2010-04-19 16:40:45
tags: 
categories: 
- 软件心得
---

为了开发项目的方便，要实现Ubuntu跟windows文件共享，需要在Ubuntu下搭建samba服务器，下面来说说Ubuntu下安装、配置Samba的详细步骤~

### Ubuntu下安装Samba

可以使用新立得来搜索Samba安装~没有请更新软件源，或者使用如下命令来安装Samba
> sudo apt-get install samba
> sudo apt-get install smbfs

### 建立Samba共享文件夹

假如要创建/home/用户名/share首先创建这个文件夹 （这个用户名就是你的用户名，为了方便易懂我才这样写的，到时记得自己改啊）
新建share文件夹，终端命令如下:
> mkdir /home/用户名/share
设置该文件夹的权限使其让所有用户可读可写可运行，终端命令如下:
> chmod 777 /home/用户名/share

### 配置Samba服务器

编辑smb.conf允许网络用户访问，终端代码如下:
> sudo gedit /etc/samba/smb.conf
搜寻这一行文字代码“security = user",修改为：
> security = user
> username map = /etc/samba/smbusers
<!--more-->
将下列几行新增到文件的最后面，假设允许访问的用户为：new。而文件夹的共享名为 Share ＃这里之所以这么写就是因为后面我们要创建一个smb用户new，并且让XP用户通过这个new来和我们进行数据交流。当然你可以写为自己喜欢的名字 只不过前后要一致就可以了:
> [Share]
> comment = Shared Folder with username and password
> path = /home/用户名/share
> public = yes
> writable = yes
> valid users = new
> create mask = 0700
> directory mask = 0700
> force user = nobody
> force group = nogroup
> available = yes
> browseable = yes
然后顺便把这里改一下，找到［**global**］把 workgroup = MSHOME 改成代码:
> workgroup = WORKGROUP
> display charset = UTF-8
> unix charset = UTF-8
> dos charset = cp936
_后面的三行是为了防止出现中文目录乱码的情况_。

现在要添加new这个网络访问帐户。如果系统中当前没有这个帐户，需要创建一个用户，终端命令:
> sudo useradd new
要注意，上面只是增加了new这个用户，却没有给用户赋予本机登录密码。所以这个用户将只能从远程访问，不能从本机登录。而且samba的登录密码可以和本机登录密码不一样。现在要新增网络使用者的帐号：

设置你的new密码，这个密码不是开机登录时候用的，是你要访问WIN共享文件或者WIN共享文件访问你的时候要填的密码，命令:
> sudo smbpasswd -a new
> 
> sudo gedit /etc/samba/smbusers
在新建立的文件内加入下面这一行并保存:
> new = “network username”
如果将来需要更改new的网络访问密码，也用这个命令更改
代码:
> sudo smbpasswd -a new
删除网络使用者的帐号的命令把上面的 -a 改成 -x
> sudo smbpasswd -x new
测试并重启samba，终端命令:
> sudo testparm
> sudo /etc/init.d/samba restart

### windows访问共享文件夹

1.  在浏览器之内直接输入\\serverName\share
2.  网上邻居→右键→映射网络驱动器...→根据提示填上serverName就可以了~