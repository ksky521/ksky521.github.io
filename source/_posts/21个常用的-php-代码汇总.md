title: "21个常用的 PHP 代码汇总"
id: 457
date: 2010-01-19 19:50:08
tags:
- php
- 网络技术
categories:
- 后端运维
---
**PHP** 是目前使用最广泛的基于 Web 的编程语言，驱动着数以百万计的网站，其中也包括如 Facebook 等一些大型站点。这里收集了 21个日常开发中实用便捷的 PHP 代码，希望可以对一些 PHP 开发者都会有所帮助。

### 1\. 可阅读随机字符串

此代码将创建一个可阅读的字符串，使其更接近词典中的单词，实用且具有密码验证功能。
> 
```php

> /**************
> *@length - length of random string (must be a multiple of 2)
> **************/
> function readable_random_string($length = 6){
>     $conso=array("b","c","d","f","g","h","j","k","l",
>     "m","n","p","r","s","t","v","w","x","y","z");
>     $vocal=array("a","e","i","o","u");
>     $password="";
>     srand ((double)microtime()*1000000);
>     $max = $length/2;
>     for($i=1; $i<=$max; $i++)
>     {
>     $password.=$conso[rand(0,19)];
>     $password.=$vocal[rand(0,4)];
>     }
>     return $password;
> }```
<!--more-->

### 2\. 生成一个随机字符串

如果不需要可阅读的字符串，使用此函数替代，即可创建一个随机字符串，作为用户的随机密码等。
> 
```php

> /*************
> *@l - length of random string
> */
> function generate_rand($l){
>   $c= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
>   srand((double)microtime()*1000000);
>   for($i=0; $i<$l; $i++) {
>       $rand.= $c[rand()%strlen($c)];
>   }
>   return $rand;
>  }```

### 3\. 编码电子邮件地址

使用此代码，可以将任何电子邮件地址编码为 HTML 字符实体，以防止被垃圾邮件程序收集。
> 
```php

> function encode_email($email='info@domain.com', $linkText='Contact Us', $attrs ='class="emailencoder"' )
> {
>     // remplazar aroba y puntos
>     $email = str_replace('@', '&#64;', $email);
>     $email = str_replace('.', '&#46;', $email);
>     $email = str_split($email, 5);  
> 
>     $linkText = str_replace('@', '&#64;', $linkText);
>     $linkText = str_replace('.', '&#46;', $linkText);
>     $linkText = str_split($linkText, 5);  
> 
>     $part1 = '[';
>     $part4 = '](ma)';  
> 
>     $encoded = '<script type="text/javascript">';
>     $encoded .= "document.write('$part1');";
>     $encoded .= "document.write('$part2');";
>     foreach($email as $e)
>     {
>             $encoded .= "document.write('$e');";
>     }
>     $encoded .= "document.write('$part3');";
>     foreach($linkText as $l)
>     {
>             $encoded .= "document.write('$l');";
>     }
>     $encoded .= "document.write('$part4');";
>     $encoded .= '</script>';  
> 
>     return $encoded;
> }```

### 4\. 验证邮件地址

电子邮件验证也许是中最常用的网页表单验证，此代码除了验证电子邮件地址，也可以选择检查邮件域所属 DNS 中的 MX 记录，使邮件验证功能更加强大。
> 
```php

> function is_valid_email($email, $test_mx = false)
> {
>     if(eregi("^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$", $email))
>         if($test_mx)
>         {
>             list($username, $domain) = split("@", $email);
>             return getmxrr($domain, $mxrecords);
>         }
>         else
>             return true;
>     else
>         return false;
> }```

### 5\. 列出目录内容

> 
```php

> function list_files($dir)
> {
>     if(is_dir($dir))
>     {
>         if($handle = opendir($dir))
>         {
>             while(($file = readdir($handle)) !== false)
>             {
>                 if($file != "." && $file != ".." && $file != "Thumbs.db")
>                 {
>                     echo '['.$file.']()
> '."\n";
>                 }
>             }
>             closedir($handle);
>         }
>     }
> }```

### 6\. 删除目录

删除一个目录，包括它的内容。
> 
```php

> /*****
> *@dir - Directory to destroy
> *@virtual[optional]- whether a virtual directory
> */
> function destroyDir($dir, $virtual = false)
> {
>     $ds = DIRECTORY_SEPARATOR;
>     $dir = $virtual ? realpath($dir) : $dir;
>     $dir = substr($dir, -1) == $ds ? substr($dir, 0, -1) : $dir;
>     if (is_dir($dir) && $handle = opendir($dir))
>     {
>         while ($file = readdir($handle))
>         {
>             if ($file == '.' || $file == '..')
>             {
>                 continue;
>             }
>             elseif (is_dir($dir.$ds.$file))
>             {
>                 destroyDir($dir.$ds.$file);
>             }
>             else
>             {
>                 unlink($dir.$ds.$file);
>             }
>         }
>         closedir($handle);
>         rmdir($dir);
>         return true;
>     }
>     else
>     {
>         return false;
>     }
> }```

### 7\. 解析 JSON 数据

与大多数流行的 Web 服务如 Twitter 通过开放 API 来提供数据一样，它总是能够知道如何解析 API 数据的各种传送格式，包括 JSON，XML 等等。
> 
```php

> $json_string='{"id":1,"name":"foo","email":"foo@foobar.com","interest":["wordpress","php"]} ';
> $obj=json_decode($json_string);
> echo $obj->name; //prints foo
> echo $obj->interest[1]; //prints php```

### 8\. 解析 XML 数据

> 
```php

> //xml string
> $xml_string="<?xml version='1.0'?>
> <users>
>    <user id='398'>
>       <name>Foo</name>
>       <email>foo@bar.com</name>
>    </user>
>    <user id='867'>
>       <name>Foobar</name>
>       <email>foobar@foo.com</name>
>    </user>
> </users>";  
> 
> //load the xml string using simplexml
> $xml = simplexml_load_string($xml_string);  
> 
> //loop through the each node of user
> foreach ($xml->user as $user)
> {
>    //access attribute
>    echo $user['id'], '  ';
>    //subnodes are accessed by -> operator
>    echo $user->name, '  ';
>    echo $user->email, '
> ';
> }```

### 9\. 创建日志缩略名

创建用户友好的日志缩略名。
> 
```php

> function create_slug($string){
>     $slug=preg_replace('/[^A-Za-z0-9-]+/', '-', $string);
>     return $slug;
> }```

### 10\. 获取客户端真实 IP 地址

该函数将获取用户的真实 IP 地址，即便他使用代理服务器。
> 
```php

> function getRealIpAddr()
> {
>     if (!emptyempty($_SERVER['HTTP_CLIENT_IP']))
>     {
>         $ip=$_SERVER['HTTP_CLIENT_IP'];
>     }
>     elseif (!emptyempty($_SERVER['HTTP_X_FORWARDED_FOR']))
>     //to check ip is pass from proxy
>     {
>         $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
>     }
>     else
>     {
>         $ip=$_SERVER['REMOTE_ADDR'];
>     }
>     return $ip;
> }```

### 11\. 强制性文件下载

为用户提供强制性的文件下载功能。
> 
```php

> /********************
> *@file - path to file
> */
> function force_download($file)
> {
>     if ((isset($file))&&(file_exists($file))) {
>        header("Content-length: ".filesize($file));
>        header('Content-Type: application/octet-stream');
>        header('Content-Disposition: attachment; filename="' . $file . '"');
>        readfile("$file");
>     } else {
>        echo "No file selected";
>     }
> }```

### 12\. 创建标签云

> 
```php

> function getCloud( $data = array(), $minFontSize = 12, $maxFontSize = 30 )
> {
>     $minimumCount = min( array_values( $data ) );
>     $maximumCount = max( array_values( $data ) );
>     $spread       = $maximumCount - $minimumCount;
>     $cloudHTML    = '';
>     $cloudTags    = array();  
> 
>     $spread == 0 && $spread = 1;  
> 
>     foreach( $data as $tag => $count )
>     {
>         $size = $minFontSize + ( $count - $minimumCount )
>             * ( $maxFontSize - $minFontSize ) / $spread;
>         $cloudTags[] = '['
>         . htmlspecialchars( stripslashes( $tag ) ) . '](# "\")';
>     }  
> 
>     return join( "\n", $cloudTags ) . "\n";
> }
> /**************************
> ****   Sample usage    ***/
> $arr = Array('Actionscript' => 35, 'Adobe' => 22, 'Array' => 44, 'Background' => 43,
>     'Blur' => 18, 'Canvas' => 33, 'Class' => 15, 'Color Palette' => 11, 'Crop' => 42,
>     'Delimiter' => 13, 'Depth' => 34, 'Design' => 8, 'Encode' => 12, 'Encryption' => 30,
>     'Extract' => 28, 'Filters' => 42);
> echo getCloud($arr, 12, 36);```

### 13\. 寻找两个字符串的相似性

PHP 提供了一个极少使用的 similar_text 函数，但此函数非常有用，用于比较两个字符串并返回相似程度的百分比。
> 
```php
similar_text($string1, $string2, $percent);
> //$percent will have the percentage of similarity```

### 14\. 在应用程序中使用 Gravatar 通用头像

随着 WordPress 越来越普及，Gravatar 也随之流行。由于 Gravatar 提供了易于使用的 API，将其纳入应用程序也变得十分方便。
> 
```php

> /******************
> *@email - Email address to show gravatar for
> *@size - size of gravatar
> *@default - URL of default gravatar to use
> *@rating - rating of Gravatar(G, PG, R, X)
> */
> function show_gravatar($email, $size, $default, $rating)
> {
>     echo '![](http://www.gravatar.com/avatar.php?gravatar_id=)';
> }```

### 15\. 在字符断点处截断文字

所谓断字 (word break)，即一个单词可在转行时断开的地方。这一函数将在断字处截断字符串。
> 
```php

> // Original PHP code by Chirp Internet: www.chirp.com.au
> // Please acknowledge use of this code by including this header.
> function myTruncate($string, $limit, $break=".", $pad="...") {
>     // return with no change if string is shorter than $limit
>     if(strlen($string) <= $limit)
>         return $string;   
> 
>     // is $break present between $limit and the end of the string?
>     if(false !== ($breakpoint = strpos($string, $break, $limit))) {
>         if($breakpoint < strlen($string) - 1) {
>             $string = substr($string, 0, $breakpoint) . $pad;
>         }
>     }
>     return $string;
> }
> /***** Example ****/
> $short_string=myTruncate($long_string, 100, ' ');```

### 16\. 文件 Zip 压缩

> 
```php

> /* creates a compressed zip file */
> function create_zip($files = array(),$destination = '',$overwrite = false) {
>     //if the zip file already exists and overwrite is false, return false
>     if(file_exists($destination) && !$overwrite) { return false; }
>     //vars
>     $valid_files = array();
>     //if files were passed in...
>     if(is_array($files)) {
>         //cycle through each file
>         foreach($files as $file) {
>             //make sure the file exists
>             if(file_exists($file)) {
>                 $valid_files[] = $file;
>             }
>         }
>     }
>     //if we have good files...
>     if(count($valid_files)) {
>         //create the archive
>         $zip = new ZipArchive();
>         if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
>             return false;
>         }
>         //add the files
>         foreach($valid_files as $file) {
>             $zip->addFile($file,$file);
>         }
>         //debug
>         //echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;  
> 
>         //close the zip -- done!
>         $zip->close();  
> 
>         //check to make sure the file exists
>         return file_exists($destination);
>     }
>     else
>     {
>         return false;
>     }
> }
> /***** Example Usage ***/
> $files=array('file1.jpg', 'file2.jpg', 'file3.gif');
> create_zip($files, 'myzipfile.zip', true);```

### 17\. 解压缩 Zip 文件

> 
```php

> /**********************
> *@file - path to zip file
> *@destination - destination directory for unzipped files
> */
> function unzip_file($file, $destination){
>     // create object
>     $zip = new ZipArchive() ;
>     // open archive
>     if ($zip->open($file) !== TRUE) {
>         die (’Could not open archive’);
>     }
>     // extract contents to destination directory
>     $zip->extractTo($destination);
>     // close archive
>     $zip->close();
>     echo 'Archive extracted to directory';
> }```

### 18\. 为 URL 地址预设 http 字符串

有时需要接受一些表单中的网址输入，但用户很少添加 http:// 字段，此代码将为网址添加该字段。
> <pre>
> if (!preg_match("/^(http|ftp):/", $_POST['url'])) {
>    $_POST['url'] = 'http://'.$_POST['url'];
> }```

### 19\. 将网址字符串转换成超级链接

该函数将 URL 和 E-mail 地址字符串转换为可点击的超级链接。
> 
```php

> function makeClickableLinks($text) {
>  $text = eregi_replace('(((f|ht){1}tp://)[-a-zA-Z0-9@:%_+.~#?&//=]+)',
>  '[\1](\1)', $text);
>  $text = eregi_replace('([[:space:]()[{}])(www.[-a-zA-Z0-9@:%_+.~#?&//=]+)',
>  '\1[\2](http://\2)', $text);
>  $text = eregi_replace('([_.0-9a-z-]+@([0-9a-z][0-9a-z-]+.)+[a-z]{2,3})',
>  '[\1](mailto:\1)', $text);  
> 
> return $text;
> }```

### 20\. 调整图像尺寸

创建图像缩略图需要许多时间，此代码将有助于了解缩略图的逻辑。
> 
```php

> /**********************
> *@filename - path to the image
> *@tmpname - temporary path to thumbnail
> *@xmax - max width
> *@ymax - max height
> */
> function resize_image($filename, $tmpname, $xmax, $ymax)
> {
>     $ext = explode(".", $filename);
>     $ext = $ext[count($ext)-1];  
> 
>     if($ext == "jpg" || $ext == "jpeg")
>         $im = imagecreatefromjpeg($tmpname);
>     elseif($ext == "png")
>         $im = imagecreatefrompng($tmpname);
>     elseif($ext == "gif")
>         $im = imagecreatefromgif($tmpname);  
>     $x = imagesx($im);
>     $y = imagesy($im);  
>     if($x <= $xmax && $y <= $ymax)
>         return $im;  
>     if($x >= $y) {
>         $newx = $xmax;
>         $newy = $newx * $y / $x;
>     }
>     else {
>         $newy = $ymax;
>         $newx = $x / $y * $newy;
>     }  
>     $im2 = imagecreatetruecolor($newx, $newy);
>     imagecopyresized($im2, $im, 0, 0, 0, 0, floor($newx), floor($newy), $x, $y);
>     return $im2;
> }```

### 21\. 检测 Ajax 请求

大多数的 JavaScript 框架如 jQuery，Mootools 等，在发出 Ajax 请求时，都会发送额外的 HTTP_X_REQUESTED_WITH 头部信息，头当他们一个ajax请求，因此你可以在服务器端侦测到 Ajax 请求。
> 
```php

> if(!emptyempty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
>     //If AJAX Request Then
> }else{
> //something else
> }```

英文原稿：[21 Really Useful & Handy PHP Code Snippets](http://webdeveloperplus.com/php/21-really-useful-handy-php-code-snippets/)
翻译整理：[21个常用的 PHP 代码汇总](http://js8.in/457.html) | [断桥残雪部落格](http://js8.in/)