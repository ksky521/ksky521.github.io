title: "使用socket.io和node.js搭建websocket应用"
id: 784
date: 2011-09-28 23:42:21
tags:
- websocket
- nodejs
categories:
- 前端开发
---

**websocket**是HTML5的一种新的通信协议，它是实现了浏览器与服务器的双向通讯。在 WebSocket API 中，浏览器和服务器只需要要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。
关于websocket的更多信息，请移步[维基百科](http://zh.wikipedia.org/wiki/WebSocket)

## 使用WebSocket

在客户端使用websocket需要创建WebSocket对象，通过提供的open、send、message、close等方法实现创建、发送、监听信息、关闭连接。例如下面的代码：
```javascript
if('WebSocket' in window){
	// 创建websocket实例
	var socket = new WebSocket('ws://localhost:8080');
	//打开
	socket.onopen = function(event) {
	  // 发送
	  socket.send('I am the client and I\'m listening!');
	  // 监听
	  socket.onmessage = function(event) {
		console.log('Client received a message',event);
	  };
	  // 关闭监听
	  socket.onclose = function(event) {
		console.log('Client notified socket has closed',event);
	  };
	  // 关闭
	  //socket.close()
	};
}else{
	alert('本浏览器不支持WebSocket哦~');
}
```
现在chrome、firefox等浏览器都已经支持了websocket，而IE却没有。下面我们来简单说说服务器端对websocket的支持。

服务器端支持**websocket**的语言不少，而且都有相关的开源项目，例如php的phpwebsockets：[http://code.google.com/p/phpwebsockets/](http://code.google.com/p/phpwebsockets/)，java的jWebsocket：[http://jwebsocket.org/](http://jwebsocket.org/)。
更多的信息可以浏览这篇文章：[Start Using HTML5 WebSockets Today](http://net.tutsplus.com/tutorials/javascript-ajax/start-using-html5-websockets-today/)

## socket.io

**socket.IO**是一个websocket库，包括了客户端的js和服务器端的nodejs。官方地址：[http://socket.io](http://socket.io)

### 客户端使用socket.io

去github clone socket.io的最新版本，或者直接饮用使用socket.io的CDN服务：
```html
<script src="http://cdn.socket.io/stable/socket.io.js"></script>
```

下面可以创建使用socket.io库来创建客户端js代码了：
```javascript
var socket = io.connect('http://localhost');
socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', { my: 'data' });
});
```
socket.on是监听，收到服务器端发来的news的内容，则运行function，其中data就是请求回来的数据，socket.emit是发送消息给服务器端的方法。

### 使用socket.io和nodejs搭建websocket服务器端

socket.io不仅可以搭建客户端的websocket服务，而且支持nodejs服务器端的websocket。

### nodejs安装socket.io

使用node插件管理包，运行下面的命令就可以安装成功socket.io

> npm install socket.io

没有npm的或者windows用户可以使用github下载socket.io并且放入到node_modules文件夹中，具体配置可以参考文章：《nodejs教程：配置nodejs.exe的windows目录结构》

### nodejs建立socket.io服务

通过nodejs的http模块就可以方便的搭建websocket服务器环境，例如下面的代码：
```javascript
// 引入需要的模块：http和socket.io
var http = require('http'), io = require('socket.io');
//创建server
var server = http.createServer(function(req, res){
  // Send HTML headers and message
  res.writeHead(200,{ 'Content-Type': 'text/html' });
  res.end('

# Hello Socket Lover!
');
});
//端口8000
server.listen(8080);
//创建socket
var socket = io.listen(server);
//添加连接监听
socket.on('connection', function(client){
	//连接成功则执行下面的监听
	client.on('message',function(event){
		console.log('Received message from client!',event);
	});
	//断开连接callback
	client.on('disconnect',function(){
		console.log('Server has disconnected');
	});
});
```
<!--more-->
保存为socket.js然后在命令行执行：`node socket.js` 即可启动服务器，现在访问localhost:8000就可以了。

### 使用express和socket.io

前篇文章我提到了nodejs的web框架：express，下面的代码就可以创建一个基于express和socket.io的socket应用

```javascript
var app = require('express').createServer(),
	io = require('socket.io').listen(app);
app.listen(80);
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});
io.sockets.on('connection', function (socket) {
	//发送消息给客户端
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
	//广播信息给除当前用户之外的用户
	socket.broadcast.emit('user connected');
	//广播给全体客户端
	io.sockets.emit('all users');
});
```
和客户端的方法一样，socket.io的监听都是使用on方法，发送使用emit方法。另外提供了广播功能：broadcast

## 写在最后

最近写文章比较勤，主要是怕自己十一放假回来头绪就乱了，所以在十一之前整理出来最近胡乱学习nodejs的一些心得体会，国内的nodejs资料太少了，学习成本挺高的。
前天晚上写的一个[基于express+socket.io的聊天室](http://1.nodejsdemo.sinaapp.com/chat/chat.zip)已经放到了网上，欢迎大家下载测试：[http://1.nodejsdemo.sinaapp.com/chat/chat.zip](http://1.nodejsdemo.sinaapp.com/chat/chat.zip)

下篇文章可能要写在express和socket.io中实现session认证。

因为上面的聊天室用到了session判断用户是否登录。另外自己写了个nodejs的斗地主，可是逻辑相当的复杂，于是代码也就越写越烂，写到最后测试逻辑就开始混淆，有空还要整理下才能放出来哦~省的拿出去丢人。羞愧啊~
