title: "在Express和Socket.IO中使用session"
id: 788
date: 2011-09-29 22:32:53
tags:
- nodejs
- session
categories:
- 前端开发
---

在nodejs项目中对于一些认证需要用到**session**，例如我写的nodejs 聊天室的demo，就是通过session实现的认证。当存在session，直接进入聊天室，而不会重新登录。

在网上也找到不少关于Express框架中的session调用方法，可是发现真正能用的不是很多，今天根据聊天室的制作过程，整理下Express和socket.IO中使用session的具体方法。

Express的session是通过cookie实现的，用到了connect中的两个module：parseCookie和MemoryStore，前者是用来解析cookie，后者用来存储sesion。

## 引入所需module

Express框架中使用session必须先引入上面的两个模块，例如下面的代码：
```javascript
var parseCookie = require('connect').utils.parseCookie,
	MemoryStore = require('connect/middleware/session/memory');
//建立一个memory store的实例
var storeMemory = new MemoryStore({
		reapInterval: 60000 * 10
	});
```

## Express中app的配置

在app需要添加如下的配置：
```javascript
app.configure(function(){
	app.use(express.bodyParser());//解析post
	app.use(express.cookieParser());//解析cookie
	//设置session
	app.use(express.session({
		secret: 'wyq',
		store:storeMemory
	}));
});
```

## 在请求中使用session

在请求中我们可以使用request.session来调用session，例如下面的代码：
```javascript
app.get('/',function(req,res){
	//使用request.session来判断是否登录
	if( req.session.name && req.session.name!==''){
		//需要判断下是否已经登录
		res.redirect('/chat');
	}else{
		//读取登录页面，要求登录
		var realpath = __dirname + '/views/' + url.parse('login.html').pathname;
		var txt = fs.readFileSync(realpath);
		res.end(txt);
	}
});
```

## websocket通信中使用session

在nodejs项目中，我们常常使用websockt来实现通信，所以websocket中也需要通过session来认证用户。本例使用socket.io来举例实现nodejs中websocket通信session的认证。关于socket.io的使用参考文章《[使用socket.io和node.js搭建websocket应用](http://js8.in/784.html)》

上面代码中引入了解析cookie的**parseCookie**，所以session是通过cookie来解析的。首先我们建立了socket的监听之后需要对监听到的头文件处理，解析出来cookie中的session。例如下面的代码：
```javascript
var io = sio.listen(app);
//设置session
io.set('authorization', function(handshakeData, callback){
	// 通过客户端的cookie字符串来获取其session数据
	handshakeData.cookie = parseCookie(handshakeData.headers.cookie)
	var connect_sid = handshakeData.cookie['connect.sid'];
	if (connect_sid) {
		storeMemory.get(connect_sid, function(error, session){
			if (error) {
				// if we cannot grab a session, turn down the connection
				callback(error.message, false);
			}
			else {
				// save the session data and accept the connection
				handshakeData.session = session;
				callback(null, true);
			}
		});
	}
	else {
		callback('nosession');
	}
});
```
<!--more-->
这样我们就可以在socket监听中使用session了，例如下面的代码：
```javascript
io.sockets.on('connection', function (socket){
	var session = socket.handshake.session;//session
	var name = session.name;
	console.log(name);
	socket.broadcast.emit('system message', '【'+name + '】回来了，大家赶紧去找TA聊聊~~');
});
```

关于connect中middleware的session详细介绍及其方法可以参考下面的[官方介绍](http://senchalabs.github.com/connect/middleware-session.html)

## nodejs聊天室

最后附上前几日写的nodejs的一个聊天室，结合最近写的文章，看起来应该很容易，里面的代码相对简单，注释还算清晰，对于nodejs的初学者应该有一定的帮助：

下载[基于express+socket.io的聊天室](http://1.nodejsdemo.sinaapp.com/chat/chat.zip)
