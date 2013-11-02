title: "修改获取验证码图片到本地的PHP程序"
id: 667
date: 2011-01-20 22:54:55
tags: 
categories: 
- php
---

昨天写了《[练手：一个获取验证码图片到本地的PHP程序](http://js8.in/666.html "练手：一个获取验证码图片到本地的PHP程序")》的文章，对于**验证码**为jpg格式的图片是可以正常输出的，对于png、gif的验证码则不能正常使用，今天稍微修改一下**PHP**代码，使其可以支持png、gif、jpg三种格式的验证码。
PHP判断图片的格式可使用php内置的`exif_imagetype`函数，非常方便，
关于**exif_imagetype**的详细使用方法可以访问：[http://php.net/manual/en/function.exif-imagetype.php](http://php.net/manual/en/function.exif-imagetype.php)
<!--more-->
修改后的全部代码如下：
<pre lang="php">
header("Content-type:image/png");
set_time_limit(0);//设置PHP超时时间
$url = $_GET['url'];
$url = "http://vcer.baidu.com/verify";
if(empty($url)){
	echo "没有图片";
	die;
}
$imginfo = GetImageSize ( $url );   
$type = exif_imagetype($url);
$imgw = $imginfo [0];   
$imgh = $imginfo [1];
$bg = imagecreatetruecolor($imgw,$imgh);
if($type==IMAGETYPE_GIF){
	$image = imagecreatefromgif($url);
}elseif($type==IMAGETYPE_JPEG){
	$image = imagecreatefromjpeg($url);
}elseif($type==IMAGETYPE_PNG){
	$image = imagecreatefrompng($url);
}

imagecolorallocate($image,255,255,255);
imagecopy($bg,$image,0,0, 0,0,$imgw,$imgh); 
imagedestroy($image);
ImagePng($bg);
</pre>