title: "chrome扩展应用开发教程之天气预报应用开发"
id: 834
date: 2011-10-22 20:14:24
tags:
- chrome
categories:
- 前端开发
---

上一篇讲到了**chrome应用开发**的基础知识，这一篇通过周末天气预报插件的开发来讲解下chrome扩展应用的开发过程。熟悉前端开发的童靴，知道了chrome应用开发的基本配置，应该很快就可以开发一个chrome应用，因为chrome插件就是纯粹的javascript和html！


## 开发前的准备

在开发之前需要统筹下，chrome天气预报插件的基本功能和界面，本插件，会这chrome顶部添加一个带有当前天气icon的应用，点击应用打开弹窗页面，天气的数据来自weather.com.cn的接口，所以我们需要跨域授权应用可以请求weather.com.cn的数据。于是chrome天气预报插件的manifest.json部分代码就出来了：

```javascript
{
  "name": "Chrome Weather", //name
  "version": "0.1.0", //version
  "description": "weather.", //description
  "background_page": "background.html",//背景页面，应用请求数据，处理icon显示实时气温
  "browser_action": {
    "default_icon": "icon.png" ,//默认的icon
    "default_title": "Weather",//默认鼠标overtitle
    "default_popup": "popup.html"//弹窗页面
  },
	"permissions": [ "tabs", "http://*.weather.com.cn/" ]//跨域请求授权
}
```

先来个最终效果截图：
[![chrome天气预报应用最终效果截图](/uploads/2011/10/2011-10-22_124856-300x80.png "chrome天气预报应用最终效果截图")](/uploads/2011/10/2011-10-22_124856-300x80.png)

## 通过背景页面来请求天气数据

chrome天气插件用到了weather.com.cn的三个接口：

1.  根据ip获取当前用户所在城市天气编号：http://61.4.185.48:81/g/
2.  根据城市天气编号获取五天内天气：http://m.weather.com.cn/data/'+id+'.html
3.  根据城市天气编号获取实时天气：http://www.weather.com.cn/data/sk/'+id+'.html
chrome天气插件使用了jQuery开发，所以我们需要在html的头部添加jquery库：
<pre lang="html">
<script type="text/javascript" src="js/jquery.min.js"></script>
```

### 根据ip获取当前用户所在城市

当用户第一次运行chrome时候，需要请求背景页面，即background.html，这时，我们需要请求接口来获取当前用户所在的城市信息，以根据cityid获取天气情况。代码如下：
```javascript
$.getScript('http://61.4.185.48:81/g/',function(){
	window.localStorage.cityid = id;//保存cityid到localStorage
	getWeather(id);//获取天气信息
});
```

### 根据cityid获取天气信息

上一步，涉及到了一个函数getWeather，这个函数的作用就是做一个xmlHttpRequest请求，获取当前cityid的天气信息，包括实时天气。getWeather中运用了send函数来做xmlHttpRequest请求。
```javascript
function getWeather(id){
	var url = 'http://m.weather.com.cn/data/'+id+'.html';
	var url2 = 'http://www.weather.com.cn/data/sk/'+id+'.html';
	send(url,function(json){
		json0 = json;
		window.localStorage.json0 = JSON.stringify(json);
		doit++;
		deal();//处理json0
	}).call(this,url2,function(json){
		json1 = json;
		window.localStorage.json1 = JSON.stringify(json);
		doit++;
		deal();//处理json1
	});

}
function send(url,cb){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		var json = JSON.parse(xhr.responseText);//解析json，保证安全性
		typeof cb==='function' && json.weatherinfo && cb(json.weatherinfo);
		xhr = null;
	  }
	}
	xhr.send();
	return arguments.callee;
}
```
<!--more-->

### 天气信息的处理

deal函数是处理天气信息，主要代码如下：
```javascript
function deal(){
	if(doit===2){
		doit = 0;
	}else{
		return;
	}
	var img = new Image();
	img.onload = function(){
		var context = $('#canvas')[0].getContext('2d');
		context.drawImage(img,0,0,19,19);
                //通过canvas对象改变icon
		chrome.browserAction.setIcon({imageData:context.getImageData(0, 0, 19,19)});
	};
	img.src = "http://m.weather.com.cn/weather_img/"+json0.img1+".gif";
	var strTip = json1.city+'现在温度:'+json1.temp+'℃\n今天：'+
                         json0.weather1+json0.temp1+'\n明天：'+
                         json0.weather2+json0.temp2+'\n后天：'+
                         json0.weather3+json0.temp3;
	strTip += "\n最后更新时间："+new Date().toLocaleTimeString();
	chrome.browserAction.setTitle({title:strTip});//设置鼠标经过title
        //背景颜色
	chrome.browserAction.setBadgeBackgroundColor({color:[0, 97, 255,100]});
        //将实时气温显示在icon上面
	chrome.browserAction.setBadgeText({text:json1.temp.toString()});
}
```

### background.html的全部代码

```html
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<title>weather</title>
	<link rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="js/jquery.min.js"></script>
</head>
<body>
<canvas id="canvas" ></canvas>
<script type="text/javascript">
!function(win,doc,$){
	var json0,json1,doit = 0;
	function getWeather(id){
		var url = 'http://m.weather.com.cn/data/'+id+'.html';
		var url2 = 'http://www.weather.com.cn/data/sk/'+id+'.html';
		send(url,function(json){
			json0 = json;
			win.localStorage.json0 = JSON.stringify(json);
			doit++;
			deal();
		}).call(this,url2,function(json){
			json1 = json;
			win.localStorage.json1 = JSON.stringify(json);
			doit++;
			deal();
		});

	}
	function send(url,cb){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
			var json = JSON.parse(xhr.responseText);
			typeof cb==='function' && json.weatherinfo && cb(json.weatherinfo);
			xhr = null;
		  }
		}
		xhr.send();
		return arguments.callee;
	}
	function deal(){
		if(doit===2){
			doit = 0;
		}else{
			return;
		}
		var img = new Image();
		img.onload = function(){
			var context = $('#canvas')[0].getContext('2d');
			context.drawImage(img,0,0,19,19);
			chrome.browserAction.setIcon({imageData:context.getImageData(0, 0, 19,19)});
		};
		img.src = "http://m.weather.com.cn/weather_img/"+json0.img1+".gif";
		var strTip = json1.city+'现在温度:'+json1.temp+'℃\n今天：'+
			json0.weather1+json0.temp1+'\n明天：'+json0.weather2+json0.temp2+
			'\n后天：'+json0.weather3+json0.temp3;
		strTip += "\n最后更新时间："+new Date().toLocaleTimeString();
		chrome.browserAction.setTitle({title:strTip});
		chrome.browserAction.setBadgeBackgroundColor({color:[0, 97, 255,100]});
		chrome.browserAction.setBadgeText({text:json1.temp.toString()});
	}
	var init = function(){
		chrome.browserAction.setBadgeText({text:'...'});
		if(win.localStorage.cityid){
			getWeather(win.localStorage.cityid);
			return;
		}

		$.getScript('http://61.4.185.48:81/g/',function(){
			win.localStorage.cityid = id;
			getWeather(id);
		});
	};
	$(doc).ready(init);//页面加载完成就开始初始化

	win.setInterval(init,30*60*1000);//每间隔三十分钟，请求一下最新的天气数据

}(window,document,jQuery);
</script>
</body>
</html>
```

## 弹窗页面代码

弹窗页面是当用户点击icon后显示的内容，本实例应用中，点击icon当然是显示完整的天气信息了。数据就不需要再次请求了，在background.html中已经把每次请求下来的数据存入localStorage中，所以可以直接从localStorage中调用完整的天气数据，注意localStorage保存的是string，需要重新解析json哦，不多说了，直接上popup的代码：
```html
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<title>weather</title>
</head>
<body>
<table width='780px'>
 <tr>
    <th rowspan='2' style="width:130px;text-align:center;">

#
</th>
    <th id="day1" width="130px">**今&nbsp;&nbsp;天**</th>
    <th id="day2" width="130px">**明&nbsp;&nbsp;天**</th>
    <th id="day3" width="130px">**后&nbsp;&nbsp;天**</th>
    <th id="day4" width="130px">**第四天**</th>
    <th id="day5" width="130px">**第五天**</th>
  </tr>
  <tr>
    <td style="text-align:center;">![](#)</td>
    <td style="text-align:center;">![](#)</td>
    <td style="text-align:center;">![](#)</td>
    <td style="text-align:center;">![](#)</td>
    <td style="text-align:center;">![](#)</td>
  </tr>
  <tr>
    <td style="text-align:center;"><span class="spanAt">实时气温:</span><span id="temp"></span>℃</td>
    <td style="text-align:center"><span id="temp1"></span></td>
    <td style="text-align:center"><span id="temp2"></span></td>
    <td style="text-align:center"><span id="temp3"></span></td>
    <td style="text-align:center"><span id="temp4"></span></td>
   <td style="text-align:center"><span id="temp5"></span></td>
  </tr>
  <tr>
    <td style="text-align:center;"><span class="spanAt">风向:</span><span id="WD"></span></td>
    <td style="text-align:center"><span id="weather1"></span></td>
    <td style="text-align:center"><span id="weather2"></span></td>
    <td style="text-align:center"><span id="weather3"></span></td>
    <td style="text-align:center"><span id="weather4"></span></td>
    <td style="text-align:center"><span id="weather5"></span></td>
  </tr>
  <tr>
    <td style="text-align:center;"><span class="spanAt">湿度:</span><span id="SD"></span></td>
    <td style="text-align:center"><div id="wind1"></div></td>
    <td style="text-align:center"><div id="wind2"></div></td>
    <td style="text-align:center"><div id="wind3"></div></td>
    <td style="text-align:center"><div id="wind4"></div></td>
    <td style="text-align:center"><div id="wind5"></div></td>
  </tr>
</table>
<script type="text/javascript">
	var json1 = JSON.parse(localStorage.json1),json0 = JSON.parse(localStorage.json0);
	['weather','wind','temp'].forEach(function(v){
		var j = 6;
		while(--j){
			document.getElementById(v+j).innerHTML = json0[v+j];
		}
	});
	for(var i=1,step=2;i<10;i+=step){
		document.getElementById('img'+i).src = "http://m.weather.com.cn/weather_img/"+json0['img'+i]+".gif"
	}
	"city SD temp WD".replace(/[^ ]+/g,function(a){
		document.getElementById(a).innerHTML = json1[a];
	});
	document.getElementById('cityid').href = json1.cityid;
</script>
</body>
</html>
```

到这里一个简单的chrome天气预报插件就已经完成了，当然还需要完善，比如添加设置页面，用户可以设置自己关心城市，添加手动刷新功能，需要做的事情还是很多的，哈哈~不多说了，主要的代码已经出来了，需要的也可以直接下载我打包好的代码来测试。

[chrome天气预报插件扩展zip包](//1.qdemo.sinaapp.com/chrome-weather.zip "chrome天气预报扩展zip包")
