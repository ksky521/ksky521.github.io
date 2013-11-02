title: "使用Synergy实现多台电脑共享一套鼠标键盘"
id: 520
date: 2010-04-18 19:03:03
tags: 
categories: 
- 软件心得
---

公司闲置了一台电脑，开发的项目是在Ubuntu系统下配置的开发环境，而我开发的主要代码还是在windows下编写的，所以我使用synergy实现了两台电脑使用一套鼠标键盘的功能~这样自己就舒服多了~

**Synergy**是一款远程控制软件。一般的远程控制软件都是将服务器的画面提供给客户端使用， 而Synergy的创意很独特，它将客户端的键盘和鼠标提供给服务器使用。 这样如果你有多台电脑并且每台电脑都有自己的显示器，你可以通过 Synergy 用一组键盘和鼠标控制所有电脑， 而且每台电脑的屏幕可以连接起来，就像在同一台电脑上使用多个显示器一样。

Synergy可以运行在多个平台上，包括Unix/**Linux**,Mac OS X, Windows98/xp/vista/**windows7**，而且多台机器的操作系统不同也没有关系。唯一的要求就是这些机器都需要支持TCP/IP网络，彼此间可以通过IP访问。

### Synergy使用教程

假设我们有三台电脑，分别为 computerA、computerB、computerC。 我们要使用 computerA（服务器） 的鼠标键盘控制这三台电脑，并且屏幕的布局如下。
[![synergy00](http://js8.in/wp-content/uploads/2010/04/synergy00.png "synergy00")](http://js8.in/wp-content/uploads/2010/04/synergy00.png)
<!--more-->

#### 下载安装

请到Synergy官方提供的[下载点](http://synergy2.sourceforge.net/ "synergy下载地址")选择适合自己操作系统的Synergy版本下载。对于Windows是一个安装程序，Mac是个压缩包，提供给Linux的则是rpm包，不过好在这个软件不是很新了，Ubuntu/Debian下直接**apt-get install synergy**就行。

#### linux synergy服务器配置

新建一个synergy.conf，内容如下：
> section: screens
> linux:
> windows:
> end
> section: links
> linux:
> right = windows
> windows:
> left = linux
> end
断桥残雪建议，最好建立在用户具有权限的位置~
接着在客户端执行以下命令：
> synergys -f –config synergy.conf
synergy.conf的path位置

#### **windows服务器设置**

** **首先在 computerA 上启动 **Synergy**， 选择 **Share this computer’s keyboard and mouse (server)**。
然后单击下面的Configure...按钮，以配置各个屏幕。单击 Screens 下面的 + 按钮，输入 Screen Name 为 computerA，确定。同样的方法依次添加 computerB 和 computerC。

[![synergy01](http://js8.in/wp-content/uploads/2010/04/synergy01.png "synergy01")](http://js8.in/wp-content/uploads/2010/04/synergy01.png)

然后我们要设置这三个屏幕的布局。在 Links 的列表框下方有一排输入框和选择框，将其依次设置为以下的内容然后单击下方的 + 按钮。[](http://js8.in/wp-content/uploads/2010/04/synergy02.png)

* 0 to 100% of the left of computerA goes to 0 to 100% of computerB
* 0 to 100% of the right of computerB goes to 0 to 100% of computerA
* 0 to 100% of the left of computerC goes to 0 to 100% of computerA
* 0 to 100% of the right of computerA goes to 0 to 100% of computerC

这样我们就将三个屏幕设置为 B - A - C 的布局了。

_注意两个屏幕之间的连接是双向的，比如我们设置了 B &lt;- A，也要同时设置 B -&gt; A，否则鼠标从 A 移动到 B 之后就无法回到 A 了_。最终的结果如下。

[![synergy02](http://js8.in/wp-content/uploads/2010/04/synergy02.png "synergy02")](http://js8.in/wp-content/uploads/2010/04/synergy02.png)[](http://js8.in/wp-content/uploads/2010/04/synergy03.png)
回到主界面，单击 **Advanced**... 按钮，确认Screen Name的内容为 computerA，确定。
至此服务器端设置完毕，先不要关闭 Synergy 的对话框。

#### windows客户端设置

在 computerB 上启动 Synergy，选择Use another computer's shared keybord and mouse(client)，并在下面的主机名处填写 computerA。

然后单击 Advanced... 按钮，确认Screen Name的内容为 computerB。

[![synergy03](http://js8.in/wp-content/uploads/2010/04/synergy03.png "synergy03")](http://js8.in/wp-content/uploads/2010/04/synergy03.png)[](http://js8.in/wp-content/uploads/2010/04/synergy00.png)

在 computerC 上用同样的方法进行设置。

在 computerA 上单击 Test 按钮，然后依次在 computerB 和 computerC 上单击 Test 按钮。我们试着在 computerA 上将鼠标移动到屏幕左侧，就会看到鼠标移动到了 computerB 上，而此时键盘也在控制 computerB；然后将鼠标移动到 computerB 屏幕右侧，鼠标就会回到 computerA；再将鼠标移动到 computerA 右侧，鼠标就会移动到 computerC 上。

![synergy04](http://js8.in/wp-content/uploads/2010/04/synergy04.png "synergy04")

#### linux客户端配置

很简单，打开终端输入以下命令就可以连接上synergy服务器啦~
> synergyc -f server-host-name
**-f**的意思是可以在前台看到调试信息，server-host-name可以使用server-IP

#### synergy开机自启动

最后依次在每台电脑上单击 **AutoStart**... 按钮，选择登录时自动启动或者电脑启动时自动启动 Synergy，单击Install按钮。最后回到主界面，单击 Start 按钮关闭 Synergy 设置窗口即可。

#### synergy退出

1.  Windows系统直接关闭程序就好。
2.  Linux 如果你在关机前不行使用该程序了，使用kill或者killall命令手动杀进程即可（使用方法不说了吧）。查看进程使用：**ps -e** 指令。