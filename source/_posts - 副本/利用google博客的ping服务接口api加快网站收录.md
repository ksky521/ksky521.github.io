title: "利用google博客的ping服务接口API加快网站收录"
id: 644
date: 2010-12-17 18:38:02
tags: 
categories: 
- php
- 网络技术
---

谷歌博客推出了**ping**服务已经很长时间了，如果我们的博客是wordpress可以很方便的设置ping服务，但是如果我们的博客不是wordpress，或者我们的网站程序是自己手写的，那么就要自己写**RPC**代码了。今天断桥残雪分享一下自己写的PHP的XML-RPC代码。在此之前先说说ping服务的好处以及wordpress的ping设置。

### 配置ping服务，加快收录速度

谷歌的ping服务是一种快速收录的方法，打个比方就是：我们写了一篇文章想要谷歌收录，我们就可以使用ping服务来通知下谷歌，要googlebot尽快来抓取收录。谷歌官方的解释：
> 通过 Google“博客搜索”Ping API, 用户可以程序化的方式将博客内容的更新通知给 Google“博客搜索”引擎。这对于经常更新博客内容的用户尤其有用。博客服务提供商的管理人员也可以利用此API将其平台上的博客内容变化向 Google 通告，以便 Google“博客搜索”及时抓取来自这一服务提供商的最新内容。为设置对 Google“博客搜索”的自动 Ping 机制，请按照如下所述设置**XML-RPC**客户端或REST客户端以发送请求。您可以任选一种方法进行通知；两者都将按照相同的方式进行处理。

### wordpress设置ping的方法

wordpress自身就带着ping服务，只要我们配置一下就可以了，步骤是：设置→撰写→更新服务。常用的ping服务有以下几个：
> http://rpc.pingomatic.com/
> http://ping.baidu.com/ping/RPC2(百度的)
> http://blogsearch.google.com/ping/RPC2(谷歌的)
> http://api.my.yahoo.com/RPC2(雅虎的)
> http://api.my.yahoo.com/rss/ping(雅虎的)
> http://www.feedsky.com/api/RPC2(feedsky的)

### 谷歌ping服务的PHP代码

关于RPC的详细介绍可以移步[维基百科](http://www.google.com/url?sa=t&amp;source=web&amp;cd=1&amp;ved=0CBwQFjAA&amp;url=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FRemote_procedure_call&amp;ei=KRkMTdv4DdCOcY-t0cEK&amp;usg=AFQjCNFk4Xj6zVRWzO_H81TzbHeO9cBhjw&amp;sig2=_CO0Vdcrd56r46zJM3oyJw)，谷歌ping服务的标准：

<span>RPC端点：<span> </span>http://blogsearch.google.com/ping/RPC2<span> </span>
调用方法名：<span> </span>weblogUpdates.extendedPing<span> </span>
参数：<span> </span>(应按照如下所列的相同顺序传送)</span>

<span>*   站点名
*   站点URL
*   需要检查更新的页面URL
*   相应的RSS、RDF或Atom种子的URL
*   可选：页面内容的分类名称(或标签)。您可以指定多个值，之间用'|'字符进行分隔。
<!--more-->
首先要写一个CURL的函数，来POST谷歌的RPC端点：
<pre lang="php">
function postUrl($url, $postvar) {
    $ch = curl_init();
	$headers = array(
            "POST ".$url." HTTP/1.0",
            "Content-type: text/xml;charset=\"utf-8\"",
            "Accept: text/xml",
            "Content-length: ".strlen($postvar)
        );
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postvar);
    $res = curl_exec ($ch);
    curl_close ($ch);
    return $res;
}
</pre>
上面的代码不多做解释，关于PHP的详细curl功能，请参考《[cURL常用的几个PHP函数](http://js8.in/379.html "cURL常用的几个PHP函数")》。

主要的curl写好了之后，剩下就是要根据谷歌的XML-RPC标准组装发送的数据了，详细的请求例子可以[点这里](http://www.google.com/intl/zh-CN/help/blogsearch/pinging_API.html)。

例如我的代码是这样写的：<pre lang="php">
$googleXML = <<<END
<?xml version="1.0"?>
<methodCall>
  <methodName>weblogUpdates.extendedPing</methodName>
  <params>
    <param>
      <value>断桥残雪部落格</value>
    </param>
    <param>
      <value>http://js8.in</value>
    </param>
    <param>
      <value>http://js8.in/379.html</value>
    </param>
    <param>
      <value>http://js8.in/rss.xml</value>
    </param>
  </params>
</methodCall>
END;
$res = postUrl('http://blogsearch.google.com/ping/RPC2', $googleXML);
//下面是返回成功与否的判断（根据谷歌ping的接口说明）
if (strpos($res, "<boolean>0</boolean>"))
        echo "PING成功";
    else
        echo "PING失败";
</pre>

百度的ping服务xml代码是跟谷歌不同的，百度总是会有自己的特点，哎，情何以堪啊。下一次写一下百度的博客ping服务--《[利用百度ping服务API加快文章收录，秒收不是梦](http://js8.in/645.html "百度ping服务API")》