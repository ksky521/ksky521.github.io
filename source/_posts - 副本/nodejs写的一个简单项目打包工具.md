title: "nodejs写的一个简单项目打包工具"
id: 1062
date: 2012-09-28 01:49:17
tags:
- nodejs
- 前端工具
categories:
- 前端开发
---

项目是模块加载的，类似`require.js`的用法，所以简单写了一个js打包工具。
项目的模块加载和定义部分代码是这样的：
```javascript
XX.define('ns',['tool/cookie'],function(){
});
//或者
XX.define('ns.ns2','tool/cookie,tool/abc',function(){
})
//或者
XX.define('ns',function(){
})
```
所用到的js打包工具就是扫描文件，然后匹配出来需要加载的模块，然后先加载模块代码。
主要的nodejs打包工具代码如下：
<!--more-->
```javascript
//通用模块
var Util = require('util'),
    FS = require('fs'),
    getDeps = require('./getDeps'),
    Uglify = require('./uglify/uglify-js'),
    removeBOMChar = require('./removeBOM').removeBOMChar,
    PATH =require('path');

var packagedObj = {};//是否已经打包过

module.exports = function(filePath, rootPath, opts){
    opts = opts || {};

    var str = jscombo(filePath,rootPath);
    if(opts.unzip){
        return str;
    }else{
        return Uglify(str);
    }
};

function jscombo(filePaths, rootPath){
    if(Util.isArray(filePaths)){
        return filePaths.map(function(filePath){
            filePath = PATH.join(rootPath,filePath);

            //只打包一次
            if(packagedObj[filePath]){
                return '';
            }
            packagedObj[filePath] = 1;

            //是否存在
            if(FS.existsSync(filePath)){
                //异步读取内容
                var str = FS.readFileSync(filePath, 'utf-8');
                //移出BOM头
                str = removeBOMChar(str);
                var result = getDeps(str, rootPath);
                var content = result.content;
                content = '//'+filePath+'\n'+content;

                //递归打包
                if(result.list){
                    return jscombo(result.list, rootPath) + content;
                }
                //返回内容
                return content;
            }else{
                //文件不存在错误信息
                console.error('jsCombo Error: ' + filePath + ' does not exsist! the path is:'+rootPath);
                return ';alert("' + filePath + ' does not exsist!");';
            }
        }).join(';\n');

    }else{
        return jscombo([filePaths],rootPath);
    }
}
```
对于nodejs之前一直没认真学习，都是边查文档，编写的，所以代码很青涩~
