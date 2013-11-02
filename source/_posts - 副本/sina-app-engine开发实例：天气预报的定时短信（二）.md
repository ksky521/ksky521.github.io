title: "Sina App Engine开发实例：天气预报的定时短信（二）"
id: 634
date: 2010-10-13 17:00:54
tags: 
categories: 
- php
---

昨天简单介绍了下新浪App Engine的应用，并且介绍了通过weather.com.cn的接口获取天气预报的方法。今天继续开始我们的SAE开发实例之旅。今天主要介绍下使用**飞信**接口发送短信和使用Sina App Engine的**crontab**（计划任务）功能。

[Sina App Engine开发实例：天气预报的定时短信（一）](http://js8.in/633.html) | [天气预报的定时短信（二）](http://js8.in/634.html)

> 广告时间：
> 
> ### 新浪微博送祝福方法
> 
> 1、在发布新浪微博的时候，采用以下格式，会在5分钟之内把您的祝福发送出去，并且收到一个@回复：
> 
> <span style="color: #ff0000;">**@微博送祝福：祝××：祝福的内容**</span>
> 
> 2、登录[http://js8.in/love](http://js8.in/love "新浪微博送祝福")，使用新浪微博账号登陆，然后给自己的粉丝、好友送祝福
> 
> 每一个祝福都会收到一个@回复，并且具有自己独一无二的永久URL地址，你可以复制发送给自己的好友，要TA知道你送的祝福~

### 介绍下这次开发实例中使用的飞信接口

此次开发使用的Fetion（飞信）接口是由张宴提供的第三方Fetion API，通过这个接口可以方便的给自己和自己的好友发送短信，具体的介绍，请移步[这里](http://blog.s135.com/fetion_api/ "飞信接口")。
调用的格式如下：
> http://sms.api.bz/fetion.php?username=您的移动飞信登录手机号&amp;password=您的移动飞信登录密码&amp;sendto=接收短信的飞信好友手机号（也可以是你自己的手机号）&amp;message=短信内容
可以使用GET，POST方法。
结合[上篇](http://js8.in/633.html)中介绍的SAE的**FetchURL**方法，我们可以很轻松的写出来，飞信接口发短信的PHP代码：
<pre lang="php"> $sms["username"] = 13812345678;
 $sms["password"] = "password";
 $sms["sendto"] = 13812345678;
 $sms["message"] = "这是一条测试短信！";
$f = new SaeFetchurl();
 $f-&gt;setMethod('post');
 $f-&gt;setPostData( $sms);
 $ret = $f-&gt;fetch('http://sms.api.bz/fetion.php');
 var_dump($ret);</pre>
**PS**:对于该接口是否记录飞信密码，断桥残雪不清楚，不过张宴说自己不记录，大家自己辨别。

### Sina App Engine的Crontab服务

用过linux系统的应该知道crontab是Linux系统下的计划任务，也就是我们可以通过配置Crontab，让电脑在固定的时间运行固定的程序。断桥残雪通过crontab的服务实现了在新浪微博以：“<span style="color: #ff0000;">**@微博送祝福：祝××：祝福的内容**</span>”的格式发布微博，可以在5分钟内送出祝福，并且收到@回复的功能。
**新浪App Engin**e对cron的介绍可以移步：[http://sae.sina.com.cn/?m=devcenter&amp;catId=26](http://sae.sina.com.cn/?m=devcenter&amp;catId=26)
我们可以通过修改SDK文件夹里面的**config.yaml**来开启crontab任务。格式如下：
<!--more-->
> name: App Name
> version: 1
> accesskey: App KEY
> cron:
>     - description: cron test
> 	  url: test.php
> 	  schedule: every day of month 9:00
> 	  timezone: Beijing

> 说明：
> 1，url 是cron 需要执行的代码的相对路径，如myapp/code/test.php，url 则写为test.php
> 2，login 表示安全选项，如果用户需要对此url 进行权限控制（如不希望web 用户通过http访问到该文件），则按格式填写username 和password
> 3，times 表示执行的次数，默认是循环执行，如果该值大于零，则每执行一次减一，直到等于零
> 4，$符号表示第几，$2 表示第二，$13 表示第十三
> 5，每项符合yaml语法
> 6，最低时间间隔为1 分钟
> 7，description 不是必填，默认为空；timezone 不是必填，默认为北京时间；login 不是必填，默认为无特殊权限
> 8，目前时区支持：北京时间、纽约时间、伦敦时间、悉尼时间、莫斯科时间、柏林时间、东京时间和洛杉矶时间
> 8，目前每个项目支持最多32 个item

### 全部PHP代码

<pre lang="php">
$id = "101120201";

$url = "http://m.weather.com.cn/data/".$id.".html";
//$data = sendCurl($url);
$f = new SaeFetchurl();
 $f->setMethod('get');
 $data = $f->fetch($url);

$json = json_decode($data, TRUE);
$data = $json["weatherinfo"];
$date_y = mb_substr($data["date_y"], mb_strpos($data['date_y'], "年") + 1, mb_strlen($data['date_y']), 'utf-8');
$date = mb_substr($data["date"], 3, mb_strlen($data['date']), 'utf-8');
$week = str_replace("星期", "周", $data['week']);

$data['index48_d']=matchSTR($data['index48_d']);
$data['index_d']=matchSTR($data['index_d']);

$str = $sug."{$data['city']}({$date_y},{$date},{$week})：{$data['weather1']},{$data['temp1']},{$data['wind1']},紫外线{$data['index_uv']},{$data['index_d']}明天{$data['weather2']},{$data['temp2']},{$data['wind2']},紫外线{$data['index48_uv']},{$data['index48_d']}后天{$data['weather3']},{$data['temp3']}";

//echo $str;
sendFetion($str);
function sendFetion($str){
	 $sms["username"] = 13812345678;  
	 $sms["password"] = "password";  
	 $sms["sendto"] = 13812345678;  
	 $sms["message"] = $str; 
	 $f = new SaeFetchurl();
	 $f->setMethod('post');
	 $f->setPostData( $sms );
	 $ret = $f->fetch('http://sms.api.bz/fetion.php'); 
}
function matchSTR($str){
	if(preg_match_all('/([^\]]*)。年老体弱者([^\]]*)。([^\]]*)。/s',$str,$matchResult,PREG_SET_ORDER)){
		$str =$matchResult[0][1].','.$matchResult[0][3].'。';
    }elseif(preg_match_all('/([^\]]*)。年老体弱者([^\]]*)。/s',$str,$matchResult,PREG_SET_ORDER)){
    	$str = $matchResult[0][1].'。';
    }  
      return $str;
}
</pre>