title: "Gruntjs——前端任务管理工具"
id: 1124
date: 2013-04-16 21:09:34
tags:
- grunt
- 前端工具
categories:
- 前端开发
---

[Gruntjs](http://www.gruntjs.com)是前端项目构建工具，基于node的命令行工具。很多公司或者js项目都是用**gruntjs**来搭建，例如jQuery，twitter，Qunit等。主要功能有：

* 合并文件
* 压缩html/js/css/图片文件
* 语法检测
* 单元测试（基于Qunit）
* watch功能

相对于Ant的打包工具，grunt更加灵活，语法采用json，比xml语法更加简洁，作为前端工程师可能更喜欢写json。

## GruntJS的安装

Grunt是基于nodejs的，所以安装GruntJS之前，需要保证你的电脑有[nodejs环境](http://nodejs.org/)，node环境比之前安装简单多了，现在windows平台只需要下载node安装程序，一路next就可以了。

<!--more-->

#### 安装grunt-cli

在命令行中，执行`npm install -g grunt-cli`，来安装grunt-cli

#### 安装grunt插件

在项目路径下的命令行中，输入`npm install grunt-plugin-name --save-dev`就可以完成插件安装，或者直接修改grunt的package.json，然后执行`npm install`，npm会自动安装想用插件。

## 创建GruntJS管理项目

每个GruntJS都包括两个文件：

* package.json：依赖模块+你可能用到的变量和说明，例如：version、name
* Gruntfile.js：node module写法的任务管理文件


### package.json

一个典型的package.json内容如下：

```javascript
  {
    "name": "my-project-name",
    "version": "0.1.0",
    "devDependencies": {
      "grunt": "~0.4.0",
      "grunt-contrib-jshint": "~0.1.0",
      "grunt-contrib-concat": "~0.1.1",
      "grunt-contrib-uglify": "~0.1.0",
      "grunt-contrib-watch": "~0.1.4"
    }
  }
```

如果安装了新的插件，那么这个package.json会自动更新的，或者修改它，然后执行`npm install`，也可以安装对应的插件。

### Gruntfile.js

Gruntfile.js是node module格式的任务管理文件，例如：
```javascript
module.exports = function(grunt) {
  // 以下代码初始化Grunt任务
  grunt.initConfig({
    // js语法检查
    jshint: { /*…*/ },
    // 需要合并的任务
    concat: { /*…*/ },
    // 压缩
    uglify: { /*…*/ },
    // watch任务
    watch: { /*…*/ }
  });

  // 加载package.json中的想用插件
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 注册一个任务，第二参数可以是数组或者字符串
  // 默认会执行default任务.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
```

## 常用Grunt任务介绍

### 使用JSHint检查js语法

JSHint是JSLint的一个分支，可以用于js语法规则、错误检测。
```javascript
jshint: {
  files: ['Gruntfile.js', 'lib/**/*.js']
},
```
上面的代码可以检测lib文件夹下所有二级路径的js语法内容。另外后面可以使用watch任务，实时检测语法。

### 合并任务

concat是合并任务，可以合并打包js，css文件。
```javascript
concat: {
  js: {
    src: ['lib/module1.js', 'lib/module2.js', 'lib/plugin.js'],
    dest: 'dist/script.js'
  }
  css: {
    src: ['style/normalize.css', 'style/base.css', 'style/theme.css'],
    dest: 'dist/screen.css'
  }
},
```

### 使用uglifyjs压缩js文件

uglifyjs就不用介绍了，jQuery就是用它压缩的。
```javascript
uglify: {
  dist: {
    src: ['<%= concat.js.dest %>'],
    dest: 'dist/script.min.js'
  }
},
```

### watch功能

watch功能是Grunt的实时处理任务，当监控的文件发生变化的时候，则执行相应的任务。
```javascript
watch: {
  files: '<%= jshint.files %>',
  tasks: 'jshint'
},
```

除了上面的任务外，还有[很多插件](http://gruntjs.com/plugins)，参考文章《[双屏切图：使用livereload实现自动刷新](http://js8.in/1122.html)》
