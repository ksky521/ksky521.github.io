title: "双屏切图：使用livereload实现自动刷新"
id: 1122
date: 2013-04-07 20:49:27
tags:
- javascript
- 前端工具
- livereload
categories:
- 前端开发
---

**livereload**是一个web开发辅助工具，当我们修改完html、css和js的时候会自动刷新浏览器，解放码农的双手。这样在双屏切图、写js代码的时候会提高很多效率。livereload有很多版本，比如基于ruby的版本，我们今天介绍的是node+grunt+chrome插件一体化方案。

我们使用的这个livereload的基本原理是试用node开启一个websocket服务，并且检测文件变化，浏览器打开一个页面时候，引入固定的livereload.js（chrome插件会帮忙加上）会建立ws请求，当node检测到文件变化，则自动推送消息给浏览器，实现刷新。

## livereload环境搭建

* nodejs安装
* grunt安装
* grunt-contrib-watch：npm install grunt-contrib-watch --save-dev
* grunt-livereload：npm install grunt-livereload --save-dev
* chrome插件：[安装](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

### 编写grunt的Gruntfile.js文件

进入项目根目录，安装grunt基本服务（参考grunt使用介绍），然后修改Gruntfile.js内容，添加如下：
```javascript
livereload: {
    options: {
        base: 'public',
    },
    files: ['src/**/*']
}
watch: {
    all:{
        files: ['src/js/touch.js', 'src/sass/*.scss'],
        tasks: ['jshint', 'compass:dev'],
    },
    //grunt watch:js|css
    js:{
        files: ['src/js/touch.js'],
        tasks: ['jshint'],
    },
    css:{
        files: ['src/sass/*.scss'],
        tasks: ['compass:dev'],
    }
}
grunt.loadNpmTasks('grunt-livereload');
grunt.registerTask('live', ['livereload', 'watch:css']);
```
建立一个live的任务，开启livereload服务，同时watch css任务，当css文件发生变化的时候，执行compass:dev任务（即compass编译任务）。

### 执行grunt任务

当我们进行切图（或者其他事情的时候），执行cmd进入项目目录，执行下面命令来启动grunt的live任务：

```shell
$ grunt live
```

浏览器端使用chrome插件打开要自动刷新的页面，例如：http://127.0.0.1/test.html，

点击chrome插件livereload的icon，仔细观察会发现icon的中间空心圆点变成了实心的。 这样就可以自动刷新了。

### 使用livereload

完成上面的步骤，这时候我们修改src/**/*下的文件就会自动刷新页面，我修改了test.scss文件，

首先触发的是watch:css任务，执行compass:dev任务，即编译css文件为test.css，

这时触发livereload，实现自动刷新
