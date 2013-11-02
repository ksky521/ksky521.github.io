title: "json_encode数组出现unicode \uxxxx的解决方案"
id: 697
date: 2011-06-13 23:16:15
tags: 
categories: 
- php
---

端午和上个周末做的微博应用[送大礼](//dali.sinaapp.com)中设计到ajax返回json的数据格式中，我没有完全使用PHP默认的**json_encode**来编码，因为这样编码出来的是unicode编码的，也就是\\u的编码，虽然unicode编码可以在不同的页面中编码不会出现乱码问题。但是一个汉字编码成unicode会变成\\u+4个字符，这样在字符长度上要比汉字多。

因为我的php文件和html声明中都是使用的UTF-8，不会出现编码乱码问题，所以就放弃了直接使用json_encode的方法，而是把汉字先**urlencode**然后再使用json_encode，json_encode之后再次使用urldecode来解码，这样编码出来的json数组中的汉字就不会出现unicode编码了~
代码如下
<pre lang="php">//默认为：{"test":"\u6211\u662f\u6d4b\u8bd5"}
$array = array(
	'test'=>urlencode("我是测试")
);
$array = json_encode($array);
echo urldecode($array);
//{"test":"我是测试"}</pre>
此举主要是为了节省传输字符数，因为我的[送大礼](//dali.sinaapp.com)默认会引入几百个好友信息，对于数据的流量还是比较大的~所以采用汉字传输要比unicode字符编码传输要节省带宽~而且处理好了页面编码问题，不会出现乱码现象。

### json_encode出null的问题

如果文档编码或者字符串编码（例如UTF-8抓取了一个GBK页面）为非UTF-8，就会出现json_encode编码失败的问题，变现为输出汉字为null。
<!--more-->
解决的方法就是在json_encode之前用`iconv`函数将汉字转为UTF-8。

### TBCompressor的压缩文件的编码

TBCompressor是淘宝UED团队修改的YUICompressor，可以支持将js、css中的汉字转为unicode编码，如果js文件中出现的汉字太多，压缩之后反而会出现体积变大的问题，例如一个js是全国省市县的地名数组，这样就要通过修改TBCompressor配置来解决~
我们可以通过修改TBCompressor的cmd文件，不使用native2ascii就可以解决，这样还可以在没装JDK只有JRE的电脑上使用TBCompressor。当然如果你要压缩的js、css文件是UTF-8编码的就需要修改一下TBCompressor中的charset为UTF-8。.

说着说着扯远了，打完收工~