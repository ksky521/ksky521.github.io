title: "将nodejs打包工具整合到鼠标右键"
id: 1065
date: 2012-09-29 00:34:17
tags:
- nodejs
- 右键
categories:
- 前端开发
---

昨天放出了主要的nodejs打包代码(《[nodejs写的简单项目打包工具](/2012/09/28/nodejs%E5%86%99%E7%9A%84%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E9%A1%B9%E7%9B%AE%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7/)》)，今天放出整合到鼠标右键的代码，打包需要配置环境变量，添加NODE_PATH为node安装路径，打包用到的批处理文件代码如下：
```bash
@echo off
title Builder - 正在合并 ...

color 03
REM =====================================
REM     jsbuilder beta版
REM
REM =====================================
SETLOCAL ENABLEEXTENSIONS

echo.

REM 过滤文件后缀，只combo js文件
if "%~x1" NEQ ".js" (
    echo.
    echo **** 请选择JS文件
    echo.
    goto End
)

REM 检查NODE_PATH
if "%NODE_PATH%" == "" goto NoNodePath
if not exist "%NODE_PATH%\node.exe" goto NoNodePath

set RESULT_FILE=%~n1-combo%~x1

:ZIP_CHOICE

echo 选择是否【压缩】合并后的js文件?
set input=
set /p input= -^> 请选择(y/n):
if /i "%input%"=="n" goto UNZIP
if /i "%input%"=="y" goto ZIP

REM 调用build合并文件
:UNZIP
"%NODE_PATH%\node.exe" "%~dp0build.js" --unzip "%~n1%~x1" > "%RESULT_FILE%"
echo.
echo **** ~O(∩_∩)O~ 【合并】成功 ****
echo.
goto End

REM 调用build合并并且压缩文件
:ZIP
"%NODE_PATH%\node.exe" "%~dp0build.js" "%~n1%~x1" > "%RESULT_FILE%"
echo.
echo **** ~O(∩_∩)O~ 【合并并压缩】成功 ****
echo.
goto End

:NoNodePath
echo.
echo **** 请先安装NodeJS并设置NODE_PATH环境变量 ****
echo.

:End
ENDLOCAL
pause
```
<!--more-->
打包用的`build.js`代码如下：
```javascript
//加载配置
require('./config.js');
//用到的模块
var FS = require('fs'),
    PATH = require('path'),
    jscombo = require('./tool/jscombo'),
    Util = require('util');

//获取参数
var args = process.argv;
args = [].slice.call(args,2);

var opts = {};//配置
var curPath, rootPath = curPath = process.cwd();

//根据config.js的相对路径设置，变换rootPath
if(typeof relativePath!=='undefined'){
    rootPath = PATH.join(rootPath,relativePath);
}

var filename;//要处理的文件名字
//处理参数
out: while(args.length){
    var v = args.shift();
    switch(v){
        case '-uz':
        case '--unzip':
        //combo后压缩
            opts.unzip = true;
        break;
        default:
            filename = v;
            break out;
    }
}

// var filePath = PATH.join(rootPath,filename);
//将要压缩的js文件路径 转化为相对rootpath的路径
var rPath = PATH.relative(rootPath,PATH.join(curPath,filename));
var str = jscombo(rPath, rootPath, opts);

var fileout = process.stdout;
fileout.write(str);
```
