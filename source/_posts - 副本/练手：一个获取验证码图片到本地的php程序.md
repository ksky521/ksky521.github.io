title: "练手：一个获取验证码图片到本地的PHP程序"
id: 666
date: 2011-01-19 21:51:32
tags: 
categories: 
- php
---

最近项目不是很大，所以时间比较的空间，昨天琢磨着写点东西，想起了前几天电信公司投票选微笑天使的活动，投票是要填写验证码的，想了下想写个投票作弊程序，可是等我放假回来，人家活动已经结束了，昨天突然想起来，就写了一个获取**验证码图片**到本地的PHP程序，以备今后有类似的投票活动可以直接拿来使用。

程序采用了PHP的**GD库**，原理很简单，就是先建立一张空白图片，然后把验证码的图片使用PHP GD库中的**imagecreatefromjpeg**函数建立一个image对象，最后计算图片的长宽，再次使用**PHP**内置的**imagecopy**复制到一开始建立的空白图片上去。
全部代码如下：
<!--more-->
<pre lang="php">
header("Content-type:image/png");
set_time_limit(0);//设置PHP超时时间
$url = $_GET['url'];
$url = "http://vcer.baidu.com/verify";
$imginfo = GetImageSize ( $url );   
$imgw = $imginfo [0];   
$imgh = $imginfo [1];
$bg = imagecreatetruecolor($imgw,$imgh);
$image = imagecreatefromjpeg($url);
imagecolorallocate($image,255,255,255);
imagecopy($bg,$image,0,0, 0,0,$imgw,$imgh); 
imagedestroy($image);
ImagePng($bg);
</pre>
此处的代码支持验证码格式为jpg的格式，如果是png或者gif的格式可以参考《[修改获取验证码图片到本地的PHP程序](http://js8.in/667.html "修改获取验证码图片到本地的PHP程序")》