title: "基于express+socket.io的nodejs聊天室"
id: 792
date: 2011-09-29 23:20:24
tags:
- nodejs
categories:
- 前端开发
---

前几天晚上边看水浒边写的[nodejs](http://js8.in/tag/nodejs)的聊天室，前面说了，放假之前要把近日学习nodejs的所有心得整理下，今天就是30号鸟~撒欢~，最后放这个聊天室出来给大家作为学习**nodejs**的参考示例，希望对大家有用。

感谢：cnodejs群里的老雷，及其[微博](http://weibo.com/sanshuiqing)上的基友们！顺祝大家长假快乐，顺祝自己明天动车不出轨，顺祝明年不再过节，感慨多了……

### 特点

聊天室主要功能及其特点：

1.  采用nodejs（屁话）
2.  express框架,jade做模板
3.  socket.io做前后端的websocket通信
4.  支持session
5.  支持@私信功能
废话不多说了，注意点，基本前面的文章都提到了，下面罗列下：
《[配置nodejs.exe的windows目录结构](http://js8.in/764.html)》
《[安装express及配置app.js文件](http://js8.in/774.html)》
《[使用socket.io和node.js搭建websocket应用](http://js8.in/784.html)》
《[在Express和Socket.IO中使用session](http://js8.in/788.html)》

### nodejs聊天室下载地址

[基于express+socket.io的聊天室](http://1.nodejsdemo.sinaapp.com/chat/chat.zip "基于express+socket.io的聊天室")

### 聊天室服务器端js代码

<!--more-->
```javascript
//========================变量定义===============================
/**
 * modules引入
 */
var express = require('express'),
	sio = require('socket.io'),
	fs=require('fs'),
	path = require('path')
	url = require('url'),
	parseCookie = require('connect').utils.parseCookie,
	MemoryStore = require('connect/middleware/session/memory');

/**
 * 私人聊天使用session
 */
var usersWS = {}, //私人聊天用的websocket
	storeMemory = new MemoryStore({
		reapInterval: 60000 * 10
	});//session store
//=========================app配置=============================
/**
 * app配置
 */
var app = module.export = express.createServer();

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'wyq',
		store:storeMemory
	}));
	app.use(express.methodOverride());
	app.use(app.router);//要放在bodyParser之后，处理post
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.static(__dirname + '/public'));
});
//=================配置socket.io=========================
/**
 * 配置socket.io
 *
 */
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
//=========================URL=============================
/**
 * url处理开始鸟~
 * @param {Object} req
 * @param {Object} res
 */
app.get('/',function(req,res){

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
app.get('/chat',function(req,res){
	if (req.session.name && req.session.name !== '') {
		//需要判断下是否已经登录
		res.render('chat',{name:req.session.name});
	}else{
		res.redirect('/');
	}
})
app.post('/chat',function(req,res){
	var name = req.body.nick;
	if(name && name!==''){
		req.session.name = name;//设置session
		res.render('chat',{name:name});
	}else{
		res.end('nickname cannot null');
	}

});

//===================socket链接监听=================
/**
 * 开始socket链接监听
 * @param {Object} socket
 */
io.sockets.on('connection', function (socket){
	var session = socket.handshake.session;//session
	var name = session.name;
	usersWS[name] = socket;
	var refresh_online = function(){
		var n = [];
		for (var i in usersWS){
			n.push(i);
		}
		io.sockets.emit('online list', n);//所有人广播
	}
	refresh_online();

	socket.broadcast.emit('system message', '【'+name + '】回来了，大家赶紧去找TA聊聊~~');

	//公共信息
	socket.on('public message',function(msg, fn){
		socket.broadcast.emit('public message', name, msg);
		fn(true);
	});
	//私人@信息
	socket.on('private message',function(to, msg, fn){
		var target = usersWS[to];
		if (target) {
			fn(true);
			target.emit('private message', name+'[私信]', msg);
		}
		else {
			fn(false)
			socket.emit('message error', to, msg);
		}
	});

	//掉线，断开链接处理
	socket.on('disconnect', function(){
		delete usersWS[name];
		session = null;
		socket.broadcast.emit('system message', '【'+name + '】无声无息地离开了。。。');
		refresh_online();
	});

});

//===========app listen 开始鸟~==========
app.listen(3000, function(){
	var addr = app.address();
	console.log('app listening on http://127.0.0.1：' + addr.port);
});

```
