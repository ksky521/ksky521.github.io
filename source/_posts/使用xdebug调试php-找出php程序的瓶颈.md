title: "使用xdebug调试PHP 找出PHP程序的瓶颈"
id: 674
date: 2011-02-14 23:24:17
tags:
- php
categories:
- 后端运维
---
**xdebug**是PHP的一个扩展应用，有了xdebug就可以轻松的调试PHP程序，有了它，我们就不用使用`var_dump()`，`print_r()`之类的傻瓜调试函数了。
Xdebug则提供了更多的功能，能全方位的对PHP脚本进行调试。**Xdebug**主要的功能如下：

1.  堆栈追踪和函数追踪；
2.  错误信息；
3.  内存分配；
4.  剖析php脚本的信息；
5.  代码覆盖率分析；
6.  远程调试分析；

### 1、Ubuntu搭建xdebug调试环境

#### 安装Xdebug模块

在终端中使用apt-get安装xdebug，命令如下
> sudo apt-get install php5-dev php-pear
> sudo apt-get install php5-xdebug
然后打开php.ini文件(例如gedit /etc/php5/apache2/php.ini)。进行如下配置；
> ;加载xdebug动态链接库
> extension=xdebug.so
> ;xdebug分析文件输出路径
> xdebug.profiler_output_dir = "/var/www/xdebug/"
> ;分析器默认是关闭，调试的时候在url中加入XDEBUG_PROFILE=true即可
> xdebug.profiler_enable = Off
> xdebug.profiler_enable_trigger = 1
重启apache，这样就可以使用xdebug调试PHP了。

### 2、windows下安装xdebug

以PHP5.1.4，Windows平台为例（其它PHP版本，其它平台请参看官网文档）：
1． 登录www.xdebug.org，在首页右侧有一个Windows modules，选择其中的PHP5.1.2+，下载php_xdebug-5.1.2-2.0.0beta6.dll文件；
2． 将下载的php_xdebug-5.1.2-2.0.0beta6.dll放到C:\php5\ext目录，重命名为php_xdebug.dll；
3． 编辑php.ini，加入下面几行：
> extension=php_xdebug.dll
> [Xdebug]
> xdebug.profiler_enable=on
> xdebug.trace_output_dir="I:\Projects\xdebug"
> xdebug.profiler_output_dir="I:\Projects\xdebug"
> xdebug.dump.GET=*
> xdebug.show_local_vars=1
具体参数PHP.ini说明参见ubuntu下的注释。

### 3、使用xdebug进行PHP调试

#### xdebug调试变量更加友好

Xdebug重写了php里面`var_dump()`函数。
xdebug里的var_dump()给变量对象有不同的颜色，显示类型长度，还可以控制显示层次，显示的方式经过格式化，清晰友好。
需要使用此功能，有如下参数需注意。
<!--more-->
> ;是否覆盖php里面的函数var_dump();默认是开启的，值为1；设为0，则关闭；
> xdebug.overload_var_dump = 1
> ;控制数组子元素显示的大小默认为256
> xdebug.var_display_max_children = 256
> ;控制变量打印的大小，默认为512
> xdebug.var_display_max_data = 512
> ;控制数组和对象元素显示的层级。默认为3
> xdebug.var_display_max_depth = 3

#### xdebug的堆栈追踪功能

如果脚本中出现函数参数不正确，方法重复，语法错误等错误的时候。xdebug能追踪其错误产生的产生的过程。

参数配置请参考[http://xdebug.com/docs/stack_trace](http://xdebug.com/docs/stack_trace)；一般来说，很少需要配置。

### 4、使用xdebug进行脚本性能测试

在php.ini做如下配置
> ;默认为0,不开启xdebug调试器；
> xdebug.profiler_enable = 0
> ;默认为0；这里设为1，可以通过XDEBUG_PROFILE参数通过GET/POST传递
> xdebug.profiler_enable_trigger = 1

#### 测试性能结果查看工具

测试完毕后，我们需要查看下测试结果，从而找到PHP的瓶颈。
这里推荐使用两款查看工具，ubuntu下可以使用**KCachegrind**，windows下可以使用**[WinCacheGrind](http://sourceforge.net/projects/wincachegrind/)**。具体查看xdebug测试结果工具使用方法自己谷歌，很简单。懂点E文就可以看懂的。

### 5、xdebug使用注意及相关参数说明

#### xdebug使用注意

如果您在 phpinfo() 的输出中没有看到 **Xdebug **部分，则 Xdebug 装入失败。Apache 错误日志会列出原因。常见错误包括 zend_extension 的路径错误或者与其他扩展发生冲突。例如，如果需要使用 XCache 和 Xdebug，一定要先装入 XCache。但是，由于 Xdebug 适于在开发时使用并假定 xdebug.so 的路径正确，因此需要禁用其他扩展并重试。然后您可以重新启用扩展以执行其他测试，如缓存的效果。

Xdebug 站点还有其他一些故障检修技巧。

#### xdebug相关参数设置

##### xdebug.default_enable

类型：布尔型 默认值：On
如果这项设置为On，堆栈跟踪将被默认的显示在错误事件中。你可以通过在代码中使用xdebug_disable()来禁止堆叠跟踪的显示。因为这是xdebug基本功能之一，将这项参数设置为On是比较明智的。

##### xdebug.max_nesting_level

类型：整型 默认值：100
The value of this setting is the maximum level of nested functions that are allowed before the script will be aborted.
限制无限递归的访问深度。这项参数设置的值是脚本失败前所允许的嵌套程序的最大访问深度。

##### xdebug.dump_globals

类型：布尔型 默认值：1
限制是否显示被xdebug.dump.*设置定义的超全局变量的值
例如，xdebug.dump.SERVER = REQUEST_METHOD,REQUEST_URI,HTTP_USER_AGENT 将打印 PHP 超全局变量 $_SERVER['REQUEST_METHOD']、$_SERVER['REQUEST_URI'] 和 $_SERVER['HTTP_USER_AGENT']。

##### xdebug.dump_once

类型：布尔型 默认值：1
限制是否超全局变量的值应该转储在所有出错环境(设置为Off时)或仅仅在开始的地方(设置为On时)

##### xdebug.dump_undefined

类型：布尔型 默认值：0
如果你想从超全局变量中转储未定义的值，你应该把这个参数设置成On，否则就设置成Off

##### xdebug.show_exception_trace

类型：整型 默认值：0
当这个参数被设置为1时，即使捕捉到异常，xdebug仍将强制执行异常跟踪当一个异常出现时。

##### xdebug.show_local_vars

类型：整型 默认值：0
当这个参数被设置为不等于0时，xdebug在错环境中所产生的堆栈转储还将显示所有局部变量，包括尚未初始化的变量在最上面。要注意的是这将产生大量的信息，也因此默认情况下是关闭的。

##### xdebug.profiler_append

类型：整型 默认值：0
当这个参数被设置为1时，文件将不会被追加当一个新的需求到一个相同的文件时(依靠xdebug.profiler_output_name的设置)。相反的设置的话，文件将被附加成一个新文件。

##### xdebug.profiler_enable

类型：整型 默认值：0
开放xdebug文件的权限，就是在文件输出目录中创建文件。那些文件可以通过KCacheGrind来阅读来展现你的数据。这个设置不能通过在你的脚本中调用ini_set()来设置。

##### xdebug.profiler_output_dir

类型：字符串 默认值：/tmp
这个文件是profiler文件输出写入的，确信PHP用户对这个目录有写入的权限。这个设置不能通过在你的脚本中调用ini_set()来设置。

##### xdebug.profiler_output_name

类型：字符串 默认值：cachegrind.out%p
这个设置决定了转储跟踪写入的文件的名称。

##### xdebug.remote_autostart

类型：布尔型 默认值：0
一般来说，你需要使用明确的HTTP GET/POST变量来开启远程debug。而当这个参数设置为On，xdebug将经常试图去开启一个远程debug session并试图去连接客户端，即使GET/POST/COOKIE变量不是当前的。

##### xdebug.remote_enable

类型：布尔型 默认值：0
这个开关控制xdebug是否应该试着去连接一个按照xdebug.remote_host和xdebug.remote_port来设置监听主机和端口的debug客户端。

##### xdebug.remote_host

类型：字符串 默认值：localhost
选择debug客户端正在运行的主机，你不仅可以使用主机名还可以使用IP地址

##### xdebug.remote_port

类型：整型 默认值：9000
这个端口是xdebug试着去连接远程主机的。9000是一般客户端和被绑定的debug客户端默认的端口。许多客户端都使用这个端口数字，最好不要去修改这个设置。

注意：所有以上参数修改后，要重启Apache才能生效！