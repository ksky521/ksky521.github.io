title: "windows下安装基于Apache的SVN服务器"
id: 519
date: 2010-04-12 06:10:51
tags:
- 网络技术
categories:
- 乱七八糟
---
新本本是win7的系统，安装了PHPnow+SVN，可是配置Apache把我好折腾一遍~反了好多好多的文章，最后终于搞定了~今天特地把windows7（XP）下安装SVN+Apache配置的经验进行分享~
首先安装Apache+subversion ，怎么安装，就不要问我啦~网上教程多的去，可以使用xampp，或者PHPnow等……

### 1、httpd.conf的SVN安装配置

PS：<del datetime="2010-04-12T06:35:33+00:00">_如果你先安装Apache，再安装Subversion，正常情况下下面的复制工作，Subversion安装程序已经帮你完成了，不过为了安全期间，大家还是按部就班的检查遍吧~_</del>

*   在配置httpd.conf 之前我们需要把加载的模块复制到Apache的modules目录下：

1.  进入Sibversion的安装目录（通常为c:\program files\Subversion），找到文件httpd/mod_dav_svn.so和mod_authz_svn.so，将它们拷贝到Apache的 modules目录中es）。
2.  从Subversion的安装目录拷贝文件libdb43.dll（或者libdb44.dll，根据自己的版本决定）到Apache的modules目录。

*   编辑Apache的配置文件httpd.conf，找到以下内容：
> #LoadModule dav_fs_module modules/mod_dav_fs.so
> #LoadModule dav_module modules/mod_dav.so
修改为：
> LoadModule dav_fs_module modules/mod_dav_fs.so
> LoadModule dav_module modules/mod_dav.so
即去掉前面的注释符号“#”，没有上面两句，请自行添加。并且在LoadModule 之后添加如下内容：
<!--more-->
> LoadModule dav_svn_module modules/mod_dav_svn.so
> LoadModule authz_svn_module modules/mod_authz_svn.so

### 2、httpd.conf的SVN路径配置

PS：<del datetime="2010-04-12T06:50:46+00:00">_假如我要在D盘建立一个SVN的管理目录，所有的版本库都放在D盘的svn文件夹下，例如项目demo的版本库路径是：D:\\svn\\demo。那么我们就要把D盘的SVN目录作为SVNParentPath，即D:\svn！_</del>

打开之前修改的httpd.conf文件，在最后添加如下内容：
> &lt;Location /svn&gt;
> DAV svn
> SVNParentPath D:\\SVN
> AuthType Basic
> AuthName "Subversion repositories"
> AuthUserFile D:\\passwd
> #AuthzSVNAccessFile D:\svnaccessfile
> Require valid-user
> &lt;/Location&gt;
这样配置表示：你所有的版本库将位于D:\\SVN目录下，要访问你的版本库可以使用这样的URL：http://MyServer/svn/，访问权限将由passwd文件中的用户名/密码来限制。

要创建passwd文件，可以打开命令行(DOS窗口)，将当前目录切换到Apache目录，然后打入以下命令以创建文件：
> bin\\htpasswd -c passwd  username
此命令执行bin目录下的htpasswd.exe来创建一个密码文件（关于htpasswd命令的详细方法，请移步：[http://js8.in/518.html](http://js8.in/518.html)），重启Apache服务。

将你的浏览器指向http://MyServer/svn/demo(demo是你之前创建的Subversion版本库)。如果一切正常，你将被提示输入用户名密码，输入正确的用户名密码后你就可以看到版本库中的内容了。

### 3、补充说明

如果你想让所有用户对版本库都有读的权限而只有特定的用户才有写的权限，你可以将这行
> Require valid-user
改为
> &lt;LimitExcept GET PROPFIND OPTIONS REPORT&gt;
> Require valid-user
> &lt;/LimitExcept&gt;