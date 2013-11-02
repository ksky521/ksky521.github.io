title: "Sina App Engine开发实例：天气预报的定时短信（一）"
id: 633
date: 2010-10-12 17:41:43
tags:
- php
- 网络技术
categories:
- 后端运维
---
新浪的云计算平台（[Sina App Engine](http://sae.sina.com.cn/ "新浪云计算")）已经开发一段时间了，一直处于内测阶段，最近找到一个邀请码，注册了一个**SAE**，我也上云了！使用SAE并且做了一个**[微博送祝福](http://js8.in/love "微博送祝福")**的应用。通过crontab的服务实现了在新浪微博以：“<span style="color: #ff0000;">**@微博送祝福：祝××：祝福的内容**</span>”的格式发布微博，可以在5分钟内送出祝福，并且收到@回复的功能。

今天结合张宴提供的飞信API接口，做个定时发送天气预报的SAE应用，算是**新浪SAE的教程**吧。

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

### Sina App Engine简介

**Google App Engine**大家应该不陌生吧，SAE是类似产品，不同的是GAE提供的是Java和python支持，而新浪的SAE提供的是PHP的支持，包括基本的PHP5、mySQL5.，也包括一些高级的应用**Crontab**（定时任务），**memcache**（缓存）、**SMTP**（邮箱服务），新的功能还在添加中。最让我们兴奋的是提供了crontab计划任务功能，我们可以不花一分钱就能做到定时任务，例如定时发送邮件（结合SMTP），还有今天的实例，天气预报定时短信。而且这些服务我们需要花费少量的“云豆”就可以实现！

详情请参阅：[http://sae.sina.com.cn/](http://sae.sina.com.cn/)

### Sina App Engine基本操作教程

相对于GAE的黑脸CMD命令行操作，SAE的图形界面更加亲切。注册一个SAE账号之后，我们就可以下载[Sina App Engine SDK](http://sae.sina.com.cn/?m=sdk) 包括了windows版本和Mac/Linux版本。

具体是SDK操作教程请看在线视频：[http://xhprof.tools.sinaapp.com/demo_beta/](http://xhprof.tools.sinaapp.com/demo_beta/)

### 天气预报抓取程序，采用SAE的FetchURL类

<!--more-->
因为SAE中禁用了一部分[函数和类](http://sae.sina.com.cn/?m=devcenter&amp;catId=36 "SAE禁用函数和类")，但是我们可以使用SAE的[FetchURL](http://apidoc.sinaapp.com/sae/SaeFetchurl.html "SAE FetchURL类")来抓取，并且**FetchURL**支持https和重定向，对于我们来说已经足够了。下面是天气抓取的程序，天气数据来自weather.com.cn的接口，全部代码如下，具体就不多讲了，代码很简单，自己体会：

```php

$id = "101010100";//此处是北京的城市ID，可以去weather.com.cn找到对应的weather city ID

$url = "http://m.weather.com.cn/data/".$id.".html";//接口URL
$f = new SaeFetchurl();//SAE fetchURL类
$f->setMethod('get');
$data = $f->fetch($url);

$json = json_decode($data, TRUE);//解析json
$data = $json["weatherinfo"];
$date_y = mb_substr($data["date_y"], mb_strpos($data['date_y'], "年") + 1, mb_strlen($data['date_y']), 'utf-8');
$date = mb_substr($data["date"], 3, mb_strlen($data['date']), 'utf-8');
$week = str_replace("星期", "周", $data['week']);

$data['index48_d']=matchSTR($data['index48_d']);
$data['index_d']=matchSTR($data['index_d']);

$str = $sug."{$data['city']}({$date_y},{$date},{$week})：{$data['weather1']},{$data['temp1']},{$data['wind1']},紫外线{$data['index_uv']},{$data['index_d']}明天{$data['weather2']},{$data['temp2']},{$data['wind2']},紫外线{$data['index48_uv']},{$data['index48_d']}后天{$data['weather3']},{$data['temp3']}";

echo $str;
function matchSTR($str){
	if(preg_match_all('/([^\]]*)。年老体弱者([^\]]*)。([^\]]*)。/s',$str,$matchResult,PREG_SET_ORDER)){
		$str =$matchResult[0][1].','.$matchResult[0][3].'。';
    }elseif(preg_match_all('/([^\]]*)。年老体弱者([^\]]*)。/s',$str,$matchResult,PREG_SET_ORDER)){
    	$str = $matchResult[0][1].'。';
    }  
      return $str;
}
```

好了今天先到这里，明天放出飞信最新API接口和SAE的crontab配置文件说明，完成天气预报的定时短信接收功能，敬请期待！