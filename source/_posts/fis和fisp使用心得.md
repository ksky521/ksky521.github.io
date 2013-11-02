title: FIS和FISP使用心得
date: 2013-11-02 18:20:10
tags:
- fis
- fisp
- 前端工具
categories:
- 前端开发
---

fis的wiki整理的不是很好，结合最近几天的体会，整理了FIS常用的功能，加上自己对fis的理解，整理了这篇文章

## FIS 和 FISP
fis是百度的开源的前端开发解决方案，另外还有个fisp（即fis-plus，前身是fis-pc），fisp可以说是百度业务定制版，主要集成（并扩展）了smarty模板，本地调试等功能。

fisp是在fis基础上做的一层封装，订制了一些 `config` 配置，所以一些fis的配置，在fisp里面是会自动忽略，不会生效的，比如说jswraper配置。

## FIS原理
fis其实是一个 `半成品` ，只有经过更多的包装（例如插件）才能发挥最大的作用，fis的核心是生成的 `map.json` ，很多想法可以通过 `map.json` 这个表来实现。比如我自己订制的require inline方式。

fisp结合 `map.json` 和 `FISSource.class.php` ，对smarty语法进行了扩展，扩展出来了 html、widget、require、script等smarty自定义标签。

想了解详情的童鞋，可以直接看下fisp的 `plugin` 。

## FISP环境部署
### 安装

* 安装node环境
* 配置java环境，并放入环境变量
* 安装php环境，并且将php.exe放进环境变量

然后进入cmd，依次执行：

```shell
#安装fis-plus
$ npm install -g fis-plus
#安装fis-plus调试环境
$ fisp server install pc
# 启动fisp
$ fisp server start
# 这时应该会自动打开系统默认浏览器访问127.0.0.1
# 查看www路径
$ fisp server open
# 清理www路径，慎用，会清理掉之前安装的调试环境
$ fisp server clean
```


<!--more-->

### fis部署

`fisp release` 有很多参数，具体可以通过 `fisp release -h` 查看下。

#### 常用的参数

* -o 压缩文件/优化图片等
* -w watch功能
* -m md功能

## FISP本地模板调试
fisp支持本地模板调试，每个模块下，可以放置test文件夹，作为调试数据，支持json和php格式，fe童鞋当然推荐JSON数据（注意严格json格式哦）了。

本地模板调试就是使用自己写的smarty模板变量，渲染出想要的页面，可以在phper没有拼好数据的前提下，将前端模板提前测试好。

### 安装chrome调试插件

为了方便，简单写了个 chrome调试插件，调试时，在当前tab下，点击下插件icon即可。如果其他浏览器，可以通过添加浏览器书签方式：


```javascript
javascript: (function() {var d = new Date();d.setFullYear(d.getFullYear() + 1);document.cookie='FIS_DEBUG_DATA=4f10e208f47bfb4d35a5e6f115a6df1a;path=/;expires=' + d.toGMTString() + '';location.reload(); })();
```

原理很简单，就是写个cookie，然后reload下页面。

### 添加要测试的数据
在调试数据页面，添加要测试的数据，点击 `save` 就会保存到对应的路径，点击顶部右上角的 `render` 按钮就可以看到添加了测试数据的页面。

如果要想把数据放入项目对应模块的test文件夹（专门测试文件夹，不会上线）中，可以手动copy出来（`fisp server open`打开路径，然后复制）。


## FIS高级教程
### fis-conf.js
fis的关键配置，具体配置查看下fis的wiki，另外可以看下其他fis项目学习下配置

### namespace-inline.json

这是自己写的插件生成的map，此map会收集js和css，然后集合在此文件中，方便require调用直接从此表中读取数据，而不用通过php的file_get_contents，提升性能。

此表生成方式：

```javascript
fis.config.set('modules.postpackager', function(ret, conf, settings, opt) {
    var inlineMap = fis.util.clone(ret.map);
    var sourceMap = {};
    //blablabla
    fis.util.map(inlineMap.res, function(id, res) {
        if (res.type === 'js' || res.type === 'css') {
            var id = ret.ids[id];
            sourceMap[res.uri] = {
                content: id.getContent(),
                hash: id.getHash()
            };
        } else {
            delete inlineMap.res[id];
        }
    });
    var ns = fis.config.get('namespace');
    var inlineMapFile = fis.file(fis.project.getProjectPath(ns + '-inline.json'));
    if (inlineMapFile.release) {
        inlineMapFile.setContent(JSON.stringify(sourceMap, null, opt.optimize ? null : 4));
        ret.pkg[inlineMapFile.subpath] = inlineMapFile;
    }
});
```

### server.conf
`server.conf` 是方便调试用的，对应编译到`server-conf/${namespace}-server.conf`目录下，`server.conf`的书写规则类似`.htaccess`。

在使用时，需要首先安装 `rewrite`:

```bash
$ fisp server install rewrite
```

如果安装了pc（`fisp server install pc`），那么会自动带有这个功能的。

1. 对外提供match方法，供其他调试模块调用，具体方法参考代码注释说明。
1. 默认读取根目录server.conf文件，书写方式是：
    * `rewrite`和`redirect`开头的会被翻译成一条匹配规则，自上而下的匹配。所有非rewrite和redirect开头的会被当做注释处理。
    * `rewrite`： 匹配规则后转发到一个文件
    * `redirect`： 匹配规则后重定向到另一个url


例如下面的：

```text
rewrite ^\/news\?.*tn\=[a-zA-Z0-9]+.* app/data/news.php
redirect ^\/index\?.* /photo/index/a
rewrite ^\/(.*)\?.*  app/data/$1.php
```

#### 调试原理

fis会将请求都扔给www目录下面的index.php，index.php 会引入rewrite模块来解析server.conf文件，如果解析成功就按照rewrite格式来转发请求。

## 参考文档
* [https://github.com/fis-dev/fis/wiki/](https://github.com/fis-dev/fis/wiki/)
