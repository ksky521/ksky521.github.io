title: "cURL常用的几个PHP函数"
id: 379
date: 2009-12-14 17:26:11
tags:
- php
- 网络技术
categories:
- 后端运维
---
cURL是一个功能强大的**PHP库**，我们可以使用PHP的cURL采用**GET**、**POST**等方式发送请求，获取网页内容以及取一个XML文件并把其导入数据库等等。本文中收集了几种常用的**PHP的cURL函数**，以备使用。主要的有几个PHP函数用于：GET，POST，HTTP验证，**302重定向**，设置cURL的代理。

### 1、开启PHP的cURL功能

在Windows平台下，或者使用xampp之类的集成服务器的程序，会非常简单，你需要改一改你的**php.ini**文件的设置，找到php_curl.dll，并取消前面的分号注释就行了。如下所示：
> //取消注释，开启cURL功能
> extension=php_curl.dll
在**Linux**下面，那么，你需要重新编译你的PHP了，编辑时，你需要打开编译参数——在configure命令上加上“–with-curl” 参数。
<!--more-->

### 2、使用cURL来GET数据

> cURL最简单最常用的采用**GET**来获取网页内容的**PHP函数**
> function getCURL($url){
> $curl = curl_init();
> curl_setopt($curl, CURLOPT_URL, $url);
> curl_setopt($curl, CURLOPT_HEADER, 0);
> curl_setopt($curl, CURLOPT_TIMEOUT, 3);//超时时间
> curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
> $data = curl_exec($curl);
> curl_close($curl);
> return $data;
> }

### 3、使用cURL来POST数据

> 当我们需要对cURL请求的页面采用**POST**的请求方式时，我们使用下面的**PHP函数**
> function _curl_post($url, $vars) {
> $ch = curl_init();
> curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
> curl_setopt($ch, CURLOPT_URL, $url);
> curl_setopt($ch, CURLOPT_POST, 1);
> curl_setopt($ch, CURLOPT_POSTFIELDS, $vars);
> $data = curl_exec($ch);
> curl_close($ch);
> if ($data)
> return $data;
> else
> return false;
> }

### 4、使用cURL，需要HTTP服务器认证

> 当我们请求地址需要加上身份验证，即**HTTP服务器认证**的时候，我们就要使用下面的函数了，对于cURL中**GET方法**使用验证也是采用相同的方式。
> function postCurlHTTP($url, $str) {
> $ch = curl_init();
> curl_setopt($ch, CURLOPT_URL, $url);
> curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
> curl_setopt($ch, CURLOPT_POST, 1);
> curl_setopt($ch, CURLOPT_USERPWD, "验证的用户名:密码");
> curl_setopt($ch, CURLOPT_POSTFIELDS, $str);
> $data = curl_exec($ch);
> $Headers = curl_getinfo($ch);
> if ($Headers['http_code'] == 200) {
> return $data;
> } else {
> return false;
> }
> }

### 5、使用cURL获取302重定向的页面

> 下面函数$data为重定向后页面的内容，这里我们写一个简单的**cURL POST**的**302重定向**后返回重定向页面URL的函数，有时候返回页面的URL更加重要。
> function _curl_post_302($url, $vars) {
> $ch = curl_init();
> curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
> curl_setopt($ch, CURLOPT_URL, $url);
> curl_setopt($ch, CURLOPT_POST, 1);
> curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // 302 redirect
> curl_setopt($ch, CURLOPT_POSTFIELDS, $vars);
> $data = curl_exec($ch);
> $Headers = curl_getinfo($ch);
> curl_close($ch);
> if ($data&amp;&amp;$Headers)
> return s$Headers["url"];
> else
> return false;
> }

### 6、给cURL加个代理服务器

> $ch = curl_init();
> curl_setopt($ch, CURLOPT_URL, '[http://js8.in](http://js8.in)');
> curl_setopt($ch, CURLOPT_HEADER, 1);
> curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
> curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, 1);
> curl_setopt($ch, CURLOPT_PROXY, '代理服务器地址（[js8.in](http://js8.in)）:端口');
> curl_setopt($ch, CURLOPT_PROXYUSERPWD, '代理用户:密码');
> $data = curl_exec();
> curl_close($ch);

### 7、一个cURL简单的类

> <span style="color: #0000bb; background-color: transparent;">&lt;?php
> </span><span style="color: #ff8000; background-color: transparent;">/*
> Sean Huber **CURL** library</span>
> 
> This library is a basic implementation of CURL capabilities.
> It works in most modern versions of IE and FF.
> 
> ==================================== USAGE ====================================
> It exports the CURL object globally, so set a callback with setCallback($func).
> (Use setCallback(array('class_name', 'func_name')) to set a callback as a func
> that lies within a different class)
> Then use one of the CURL request methods:
> 
> **get($url)**;
> ** post($url, $vars)**; vars is a urlencoded string in query string format.
> 
> Your callback function will then be called with 1 argument, the response text.
> If a callback is not defined, your request will return the response text.
> */
> 
> <span style="color: #007700; background-color: transparent;">class </span><span style="color: #0000bb; background-color: transparent;">CURL </span><span style="color: #007700; background-color: transparent;">{
> var </span><span style="color: #0000bb; background-color: transparent;">$callback </span><span style="color: #007700; background-color: transparent;">= </span><span style="color: #0000bb; background-color: transparent;">false</span><span style="color: #007700; background-color: transparent;">;</span>
> 
> function <span style="color: #0000bb; background-color: transparent;">setCallback</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$func_name</span><span style="color: #007700; background-color: transparent;">) {
> </span><span style="color: #0000bb; background-color: transparent;">$this</span><span style="color: #007700; background-color: transparent;">-&gt;</span><span style="color: #0000bb; background-color: transparent;">callback </span><span style="color: #007700; background-color: transparent;">= </span><span style="color: #0000bb; background-color: transparent;">$func_name</span><span style="color: #007700; background-color: transparent;">;
> }</span>
> 
> function <span style="color: #0000bb; background-color: transparent;">doRequest</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$method</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$url</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$vars</span><span style="color: #007700; background-color: transparent;">) {
> </span><span style="color: #0000bb; background-color: transparent;">$ch </span><span style="color: #007700; background-color: transparent;">= </span><span style="color: #0000bb; background-color: transparent;">curl_init</span><span style="color: #007700; background-color: transparent;">();
> </span><span style="color: #0000bb; background-color: transparent;">curl_setopt</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">CURLOPT_URL</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$url</span><span style="color: #007700; background-color: transparent;">);
> </span><span style="color: #0000bb; background-color: transparent;">curl_setopt</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">CURLOPT_HEADER</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">1</span><span style="color: #007700; background-color: transparent;">);
> </span><span style="color: #0000bb; background-color: transparent;">curl_setopt</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">CURLOPT_USERAGENT</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$_SERVER</span><span style="color: #007700; background-color: transparent;">[</span><span style="color: #dd0000; background-color: transparent;">'HTTP_USER_AGENT'</span><span style="color: #007700; background-color: transparent;">]);
> </span><span style="color: #0000bb; background-color: transparent;">curl_setopt</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">CURLOPT_FOLLOWLOCATION</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">1</span><span style="color: #007700; background-color: transparent;">);
> </span><span style="color: #0000bb; background-color: transparent;">curl_setopt</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">CURLOPT_RETURNTRANSFER</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">1</span><span style="color: #007700; background-color: transparent;">);
> </span><span style="color: #0000bb; background-color: transparent;">curl_setopt</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">CURLOPT_COOKIEJAR</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #dd0000; background-color: transparent;">'cookie.txt'</span><span style="color: #007700; background-color: transparent;">);
> </span><span style="color: #0000bb; background-color: transparent;">curl_setopt</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">CURLOPT_COOKIEFILE</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #dd0000; background-color: transparent;">'cookie.txt'</span><span style="color: #007700; background-color: transparent;">);
> if (</span><span style="color: #0000bb; background-color: transparent;">$method </span><span style="color: #007700; background-color: transparent;">== </span><span style="color: #dd0000; background-color: transparent;">'POST'</span><span style="color: #007700; background-color: transparent;">) {
> </span><span style="color: #0000bb; background-color: transparent;">curl_setopt</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">CURLOPT_POST</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">1</span><span style="color: #007700; background-color: transparent;">);
> </span><span style="color: #0000bb; background-color: transparent;">curl_setopt</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">CURLOPT_POSTFIELDS</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$vars</span><span style="color: #007700; background-color: transparent;">);
> }
> </span><span style="color: #0000bb; background-color: transparent;">$data </span><span style="color: #007700; background-color: transparent;">= </span><span style="color: #0000bb; background-color: transparent;">curl_exec</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">);
> </span><span style="color: #0000bb; background-color: transparent;">curl_close</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">);
> if (</span><span style="color: #0000bb; background-color: transparent;">$data</span><span style="color: #007700; background-color: transparent;">) {
> if (</span><span style="color: #0000bb; background-color: transparent;">$this</span><span style="color: #007700; background-color: transparent;">-&gt;</span><span style="color: #0000bb; background-color: transparent;">callback</span><span style="color: #007700; background-color: transparent;">)
> {
> </span><span style="color: #0000bb; background-color: transparent;">$callback </span><span style="color: #007700; background-color: transparent;">= </span><span style="color: #0000bb; background-color: transparent;">$this</span><span style="color: #007700; background-color: transparent;">-&gt;</span><span style="color: #0000bb; background-color: transparent;">callback</span><span style="color: #007700; background-color: transparent;">;
> </span><span style="color: #0000bb; background-color: transparent;">$this</span><span style="color: #007700; background-color: transparent;">-&gt;</span><span style="color: #0000bb; background-color: transparent;">callback </span><span style="color: #007700; background-color: transparent;">= </span><span style="color: #0000bb; background-color: transparent;">false</span><span style="color: #007700; background-color: transparent;">;
> return </span><span style="color: #0000bb; background-color: transparent;">call_user_func</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$callback</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$data</span><span style="color: #007700; background-color: transparent;">);
> } else {
> return </span><span style="color: #0000bb; background-color: transparent;">$data</span><span style="color: #007700; background-color: transparent;">;
> }
> } else {
> return </span><span style="color: #0000bb; background-color: transparent;">curl_error</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$ch</span><span style="color: #007700; background-color: transparent;">);
> }
> }</span>
> 
> function <span style="color: #0000bb; background-color: transparent;">get</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$url</span><span style="color: #007700; background-color: transparent;">) {
> return </span><span style="color: #0000bb; background-color: transparent;">$this</span><span style="color: #007700; background-color: transparent;">-&gt;</span><span style="color: #0000bb; background-color: transparent;">doRequest</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #dd0000; background-color: transparent;">'GET'</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$url</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #dd0000; background-color: transparent;">'NULL'</span><span style="color: #007700; background-color: transparent;">);
> }</span>
> 
> function <span style="color: #0000bb; background-color: transparent;">post</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #0000bb; background-color: transparent;">$url</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$vars</span><span style="color: #007700; background-color: transparent;">) {
> return </span><span style="color: #0000bb; background-color: transparent;">$this</span><span style="color: #007700; background-color: transparent;">-&gt;</span><span style="color: #0000bb; background-color: transparent;">doRequest</span><span style="color: #007700; background-color: transparent;">(</span><span style="color: #dd0000; background-color: transparent;">'POST'</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$url</span><span style="color: #007700; background-color: transparent;">, </span><span style="color: #0000bb; background-color: transparent;">$vars</span><span style="color: #007700; background-color: transparent;">);
> }
> }
> </span><span style="color: #0000bb; background-color: transparent;">?&gt;</span>