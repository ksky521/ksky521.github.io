title: "将uglifyjs添加到鼠标右键菜单"
id: 1012
date: 2012-06-13 01:48:29
tags:
- uglifyjs
- 前端工具
categories:
- 前端开发
---

之前几天根据YUICompressor和TBCompressor整合到鼠标右键菜单自己将**uglifyjs**也添加到了右键菜单，下面简单记录下过程。效果如下

[![uglifyjs添加到鼠标右键菜单](/uploads/2012/06/uglifyjsmenu.png "uglifyjs添加到鼠标右键菜单")](/uploads/2012/06/uglifyjsmenu.png)

## 配置windows nodepath环境

鼠标右键我的电脑，选择属性→高级属性管理→高级选项卡→环境变量，添加新的环境变量，名字为`NODE_PATH`，变量值为**nodejs**的安装路径，例如下面
```shell
C:\Program Files\nodejs
```

然后保存退出

## 安装uglifyjs

在命令行安装uglifyjs，

```shell
npm install uglify-js -g
```

## 安装uglifyjs到鼠标右键菜单

找到第二步安装的**uglifyjs**的路径下的bin文件夹，例如我的安装在：

```shell
C:\Program Files\nodejs\node_modules\npm\node_modules\uglify-js\bin
```

然后下载uglifyjs的安装文件解压到这个文件夹

[uglifyjs到鼠标右键菜单安装文件](http://4.qdemo.sinaapp.com/tool/uglifyjsmenu.zip)

* 双击运行`install.cmd`就可以安装了。
* 卸载运行`uninstall.cmd`就可以卸载。

主要的代码还是根据YUICompressor的安装文件改的，压缩的时候首先将源文件copy为dev作为备份，然后压缩替换原文件。例如a.js,压缩后变成a.dev.js原文件和压缩后的js文件。美化则是将美化后的代码存到bea.js，即a.js美化后为a.bea.js
<!--more-->
主要压缩的批处理代码如下：

```bash
@echo off
color 03
REM =====================================
REM    Uglify-js 1.2.6
REM
REM =====================================
SETLOCAL ENABLEEXTENSIONS

echo.
echo Uglify-js v1.2.6

REM 过滤文件后缀，只压缩js和css
if "%~x1" NEQ ".js" (
    echo.
    echo **** 请选择JS文件
    echo.
    goto End
)

REM 检查NODE_PATH
if "%NODE_PATH%" == "" goto NoNodePath
if not exist "%NODE_PATH%\node.exe" goto NoNodePath

copy %~n1%~x1 %~n1.dev%~x1
set RESULT_FILE=%~n1%~x1

REM 调用Uglify-js压缩文件
"%NODE_PATH%\node.exe" "%~dp0uglifyjs" "%~n1.dev%~x1" > "%RESULT_FILE%"
echo.
echo **** ~O(∩_∩)O~ 压缩成功 ****
echo.
goto End

:NoNodePath
echo.
echo **** 请先安装nodeJS和Uglify-js并设置NODE_PATH环境变量 ****
echo.

:End
ENDLOCAL
pause
```

美化的批处理文件如下：

```bash
@echo off
color 03
REM =====================================
REM    Uglify-js 1.2.6
REM
REM =====================================
SETLOCAL ENABLEEXTENSIONS

echo.
echo Uglify-js v1.2.6

REM 过滤文件后缀，只压缩js和css
if "%~x1" NEQ ".js" (
    echo.
    echo **** 请选择JS文件
    echo.
    goto End
)

REM 检查NODE_PATH
if "%NODE_PATH%" == "" goto NoNodePath
if not exist "%NODE_PATH%\node.exe" goto NoNodePath

set RESULT_FILE=%~n1.bea.%~x1

REM 调用Uglify-js压缩文件
"%NODE_PATH%\node.exe" "%~dp0uglifyjs" -b "%~n1%~x1" > "%RESULT_FILE%"
echo.
echo **** ~O(∩_∩)O~ 美化成功 ****
echo.
goto End

:NoNodePath
echo.
echo **** 请先安装nodeJS和Uglify-js并设置NODE_PATH环境变量 ****
echo.

:End
ENDLOCAL
pause
```

安装信息文件内容如下：

```shell
[Version]
Signature="$CHICAGO$"
Provider=ksky521@gmail.com, 2012

[DefaultInstall]
AddReg=Install_AddReg

[DefaultUnInstall]
DelReg=Uninstall_DelReg

[Uninstall_DelReg]
hkcr,"*\Shell\Uglifyjs"
hkcr,"*\Shell\Beautifyjs"

[Install_AddReg]
hkcr,"*\Shell\Uglifyjs",,,"Compress by &Uglifyjs"
hkcr,"*\Shell\Uglifyjs\command",,,"""%01%\compressor.cmd"" ""%%1"""
hkcr,"*\Shell\Beautifyjs",,,"Beautify by &Uglifyjs"
hkcr,"*\Shell\Beautifyjs\command",,,"""%01%\beautify.cmd"" ""%%1"""
```
