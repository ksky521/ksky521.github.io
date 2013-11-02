title: "nodejs教程：安装express及配置app.js文件"
id: 774
date: 2011-09-27 06:35:52
tags:
- express
- nodejs
categories:
- 前端开发
---

**express.js**是nodejs的一个MVC开发框架，并且支持jade等多种模板。下面简单来说说express的安装和app.js文件的配置，然后在今后的教程中一步一步使用express.js搭建个聊天室。

## 安装express.js

如果你安装了npm，安装变得很简单，只需要在终端中运行下面的代码即可：
> npm install express -gd
-g代表安装到NODE_PATH的lib里面，而-d代表把相依性套件也一起安装。如果沒有-g的话会安装目前所在的目录(会建立一个node_modules的文件夹)，你可以透过以下指令来比较两者的不同：

> npm list -g
> npm list

如果没有npm，那么我可以使用github来git下来最新的express。
好了，现在你可以通过`express testapp`来建立express实例。以下是示例：

> cd ~
> express testapp
> cd testapp
> node app.js
这样就建立了一个testapp的**nodejs**应用，而app.js是默认的应用主js。下面来详细的说说app.js中的各项配置。

## 引入模块

```javascript
var express = require('express');
 var app = module.exports = express.createServer();
```
require()是node.js提供的函数，可以让你引入其他模块以调用模块的函数和变量，默认下node.js会在$NODE_PATH和目前js所在目录下的node_modules文件夹下去寻找模块。require也可以用来载入自己写的模块哦~这样涉及到node.js的模块机制，后面有机会就在介绍。

第二行的express.createServer()就是在建立server，而中间的module.exports也是涉及到node.js的模块机制，以后再说。

## express的app.js的详细配置说明

express.js继承自connect模块，所以如果你的node_modules文件夹下没有connect模块也是不行的。

### 设置views路径和模板

我们再来看下面两行：

```javascript
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
```
<!--more-->
上面两行是设置views文件夹，即模板文件夹，__dirname是node.js里面的全局变量，即取得执行的js所在的路径，另外__filename是目前执行的js文件名。所以，app.set(‘views’, __dirname + ‘/views’);是设置views的文件夹。

而`app.set('view engine', 'jade');`是设置express.js所使用的render engine。除了Jade之外，express.js还支持EJS(embedded javascript)、Haml、CoffeScript和jQuery template等js模板。

### app.use配置

```javascript
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
```
express.bodyParser()是Connect內建的middleware，设置此处可以将client提交过来的post请求放入request.body中。
express.methodOverride()也是Connect內建的，可以协助处理POST请求伪装PUT、DELETE和其他HTTP methods。
app.router()是route requests，但express.js的官方文件是这句可有可无，并且经过测试还真的是这样，不过还是写上吧。
express.static()也是一个Connect內建的middleware来处理静态的requests，例如css、js、img文件等。所以static()里面指定的文件夹中的文件会直接作为静态资源吐出来。

### app.configure设置

```javascript
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});```
express.errorHandler()是Connect內建的middleware来協助處理例外。這裡也揭露了app.configure()的令一个用法，第一个參數是node.js的環境設定，如此我們就可以設定在不同的執行環境使用不同程度的dump。PS：node.js是透過NODE_ENV這个環境變數来取得環境設定，e.g.:在命令列，NODE_ENV=production node app.js就可以進入production環境。

### 路由和request的处理

ok，下面是nodejs处理request的内容：
```javascript
app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});```
上面的代码意思是，get请求根目录则调用views文件夹中的index模板，并且传入参数title为“Express”，这个title就可以在模板文件中直接使用。

在express中要处理post请求，需要使用app.post()。如下面的代码：
```javascript
app.post('/add', function(req,res){
  res.render('add', {
    sum: req.body.a + req.body.b
  });
});
```
前面我们提到了req.body是express.bodyParser()把POST参数处理后的结果。

另外除了get和post方法，还有app.all()意思就是所有的请求处理。

### 添加listen，启动nodejs服务器

```javascript
app.listen(3000);
console.log(
    "Express server listening on port %d in %s mode",
    app.address().port,
    app.settings.env);
```
到目前为止，我们就基本全明白了**express配置**了，也就不会像以前那样跟别人都写个hello world却不知道各行代码的含义了。
