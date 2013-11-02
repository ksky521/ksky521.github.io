title: "新浪微博jsSDK操作指南"
id: 700
date: 2011-07-07 20:32:41
tags:
categories:
- 前端开发
---
**新浪微博**的开放平台提供了**jsSDK**的方法，但是很多人反映不会使用，这里最关键的一点是不会放跨域文件。
的确，我也承认开放平台的开发文档写的不是很详细，比如对于一些接口是使用REST的，要人云里雾里，而对于REST的介绍却很隐晦，我也是尝试了几次才找到的方法（例如删除微博接口）。
下面简单说说jsSDK的操作。

### 放置跨域文件

为了实现跨域请求api的接口，我们需要在自己的域名下放置一个xd.html的文件，这个文件可以理解成在你网站做代理的，通过它才可以请求道api.t.sina.com.cn的内容。感兴趣的童靴可以研究下这种跨域的实现方式，国内的人人、腾讯，国外的facebook都是这种跨域方式。

基本原理是通过html5的postMessage和window.name来实现跨域。其实如果进一步研究是完全可以不要这个跨域文件的！相信下一个版本的JSSDK不会出现跨域文件来误导大家。
**跨域文件**放置要点

1.  放置来应用的同域名下，例如你的应用网址是js8.in，则你的xd.html文件就要放在js8.in域名下
2.  不一定是根目录下，因为可以通过jsSDK中的`xdpath`来传入xd.html路径，默认是根目录，即js8.in/xd.html
<!--more-->

### api的get接口可以jsonp

据我研究，api的一些get接口可以通过jsonp的方式来访问(《[通过JSONP实现完美跨域](http://js8.in/548.html)》)，这样就大大的提高了接口的可用性，即使不使用jsSDK我们也可以自己调用接口。例如使用jQuery的getJSON方法。

### jsSDk常用操作打包

下面的代码是我写的基于jQuery的jsSKD常用操作的一些方法，希望对即将开发微博应用的同学有用：

```javascript

var $api_url = "http://api.t.sina.com.cn/",
	$app_key = '你的key';
//载入JS-SDK
WB.core.load(['connect', 'client'], function() {
    var cfg = {
        key: $app_key,
        xdpath: 'http://'+location.host+'/xd.html'
    };
    WB.connect.init(cfg);
    WB.client.init(cfg);
});
(function(){
	var uid = 0;
	/**
	 * 登陆函数
	 * @param {Object} back callback函数
	 */
	var login=function(back){
		back = back|| function(){};
		WB.connect.login(function(){
			back();
		});
	};
	/**
	 * 退出函数
	 * @param {Object} back callback函数
	 */
	var logout = function(back){
		WB.connect.logout(function(){
			location.reload();
		});
	};
	/**
	 * 添加粉丝
	 * @param {Object} uid 用户id
	 * @param {Object} back callback函数
	 */
	var addFans = function(uid,back){
		back = back || function(){};
		WB.client.parseCMD("/friendships/create.json", function(o, s){
			if (s) {
				back.call({},o);
			}
		}, {user_id:uid});

	};
	/**
	 * 取消一个关注函数
	 * @param {Object} uid 用户id
	 * @param {Object} back callback函数
	 */
	var delFollow = function(uid,back){
		back = back || function(){};
		WB.client.parseCMD("/friendships/destroy.json", function(o, s){
			if (s) {
				back.call({},o);
			}
		}, {user_id:uid});
	};
	/**
	 * 删除一条微博
	 * @param {Object} id 微博id
	 * @param {Object} back callback函数
	 */
	var delWeibo = function(id,back){
		back = back || function(){};
		WB.client.parseCMD("/statuses/destroy/"+id+".json", function(sResult, bStatus){
			if (bStatus) {
				back.call({},sResult);
			}

		}, {id:id});
	};
	/**
	 * 根据uid获取用户信息
	 * @param {Object} uid 用户ID
	 * @param {Object} back callback函数
	 */
	var getUserInfo = function(uid,back){
		back = back || function(){};
		$.getJSON($api_url+"users/show.json?callback=?", {source:$app_key,user_id:uid}, function(o){
			back.call({},o);
		});
	};
	/**
	 * 获取用户认证函数
	 * 登陆后使用
	 * @param {Object} back callback函数
	 */
	var verfiy = function(back){
		back = back || function(){};
		$.getJSON($api_url+"account/verify_credentials.json?callback=?", {source:$app_key}, function(o){
			uid = o.id;
			back.call({},o);
		});
	};
	/**
	 * 是否登陆
	 * 登陆return true
	 */
	var isLogin = function(){
		return WB.connect.checkLogin();
	};
	/**
	 * 是否接口访问是否受限
	 * 受限return true
	 */
	var isLimit = function(){
		$.getJSON($api_url+"account/rate_limit_status.json?callback=?", {source:$app_key}, function(o){
			//超出限制
			if(!o || o.remaining_hits <=5){
				return true;
			}
			return false;
		});
	};
	/**
	 * 根据uid获取用户发的微博
	 * @param {Object} uid 用户ID
	 * @param {Object} back callback函数
	 */
	var getWeibo = function(uid,count,page,back){
		count = count||20;
		page = page || 1;
		back = back||function(){};
		$.getJSON($api_url+"statuses/user_timeline.json?callback=?", {source:$app_key,page:page,count:count,user_id:uid}, function(json){
			back.call({},json);
		});
	};
	/**
	 * 根据uid获取用户的粉丝及其最新的微博
	 * @param {Object} uid 用户uid
	 * @param {Object} count 条数
	 * @param {Object} back callback函数
	 */
	var getFollower = function(uid,count,back){
		back = back||function(){};
		count = count || 20;
		$.getJSON($api_url+"statuses/followers.json?callback=?", {source:$app_key,user_id:uid,count:count}, function(json){
			back.call({},json);
		});
	};
	/**
	 * 根据uid获取用户的关注列表包括最新的微博
	 * @param {Object} uid 用户uid
	 * @param {Object} count 条数
	 * @param {Object} back callback函数
	 */
	var getFriends = function(uid,count,back){
		back = back||function(){};
		count = count || 20;
		$.getJSON($api_url+"statuses/friends.json?callback=?", {source:$app_key,user_id:uid,count:count}, function(json){
			back.call({},json);
		});
	};
	/**
	 * 发布一条微博
	 * @param {Object} msg 微博内容
	 * @param {Object} back callback函数
	 */
	var publish = function(msg,back){
		back = back || function(){};
		WB.client.parseCMD("/statuses/update.json", function(o, s) {	//开始发表
			if(s){
				back.call({},o);
			}
		}, {status:encodeURIComponent(msg)});
	};
	/**
	 * 获取public timeline
	 * @param {Object} count 条数
	 * @param {Object} back callback函数
	 * @param {Object} base_app 是否为本应用的
	 */
	var getTimeLine = function(count,back,base_app){
		back = back||function(){};
		count = count || 20;
		base_app = base_app || 0;
		$.getJSON($api_url+"statuses/public_timeline.json?callback=?", {source:$app_key,base_app:base_app,count:count}, function(json){
			back.call({},json);
		});
	};
	/**
	 * 根据uid获取关注用户的uid数组
	 * @param {Object} uid 用户uid
	 * @param {Object} count 条数
	 * @param {Object} back callback函数
	 */
	var getFriendUids = function(uid,count,back){
		back = back||function(){};
		count = count || 20;
		base_app = base_app || 0;
		$.getJSON($api_url+"friends/ids.json?callback=?", {source:$app_key,user_id:uid,count:count}, function(json){
			back.call({},json);
		});
	};
	/**
	 * 根据uid 获取粉丝的uid数组
	 * @param {Object} uid 用户的uid
	 * @param {Object} count 条数
	 * @param {Object} back callback函数
	 */
	var getFollowerUids = function(uid,count,back){
		back = back||function(){};
		count = count || 20;
		base_app = base_app || 0;
		$.getJSON($api_url+"followers/ids.json?callback=?", {source:$app_key,user_id:uid,count:count}, function(json){
			back.call({},json);
		});
	};
})();
```

### 关于新浪微博开发的其他资源

1.  《[新浪微博应用开发之一：授权机制介绍](http://js8.in/627.html)》
2.  《[Sina App Engine开发实例：天气预报的定时短信（一）](http://js8.in/633.html)》
3.  《[Sina App Engine开发实例：天气预报的定时短信（二）](http://js8.in/634.html)》
4.  《[天气预报的定时短信（二）](http://js8.in/634.html)》