title: "过滤XSS（跨站脚本攻击）的函数和防止svn版本库被浏览"
id: 987
date: 2012-05-22 17:19:36
tags:
- php
- xss
- 安全
- svn
categories:
- 后端运维
---

别处看到的php去除xss的函数，自己备份下，以备不时之需。

## php过滤xss函数

```php
<?php
/**
* @过滤XSS（跨站脚本攻击）的函数
* @par $val 字符串参数，可能包含恶意的脚本代码如
* <script language="javascript">alert("hello world");</script>
* @return  处理后的字符串
* @Recoded By Androidyue
**/
function RemoveXSS($val) {
   // remove all non-printable characters. CR(0a) and LF(0b)
   // and TAB(9) are allowed
   // this prevents some character re-spacing such as <java\0script>
   // note that you have to handle splits with \n, \r,
   // and \t later since they *are* allowed in some inputs
   $val = preg_replace('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/', '', $val);

   // straight replacements, the user should never need these
   // since they're normal characters
   // this prevents like ![](@avascript:alert()
   $search = 'abcdefghijklmnopqrstuvwxyz';
   $search .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   $search .= '1234567890!@#$%^&*()';
   $search .= '~`";:?+/={}[]-_|\'\\';
   for ($i = 0; $i < strlen($search); $i++) {
      // ;? matches the ;, which is optional
      // 0{0,7} matches any padded zeros, which are optional and go up to 8 chars

      // @ @ search for the hex values
      $val = preg_replace('/(&#[xX]0{0,8}'.dechex(ord($search[$i])).';?)/i', $search[$i], $val); // with a ;
      // @ @ 0{0,7} matches '0' zero to seven times
      $val = preg_replace('/(&#0{0,8}'.ord($search[$i]).';?)/', $search[$i], $val); // with a ;
   }

   // now the only remaining whitespace attacks are \t, \n, and \r
   $ra1 = Array('javascript', 'vbscript', 'expression', 'applet', 'meta', 'xml', 'blink', 'link', 'style', 'script', 'embed', 'object', 'iframe', 'frame', 'frameset', 'ilayer', 'layer', 'bgsound', 'title', 'base');
   $ra2 = Array('onabort', 'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable', 'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onerrorupdate', 'onfilterchange', 'onfinish', 'onfocus', 'onfocusin', 'onfocusout', 'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange', 'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onrowenter', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll', 'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop', 'onsubmit', 'onunload');
   $ra = array_merge($ra1, $ra2);

   $found = true; // keep replacing as long as the previous round replaced something
   while ($found == true) {
      $val_before = $val;
      for ($i = 0; $i < sizeof($ra); $i++) {
         $pattern = '/';
         for ($j = 0; $j < strlen($ra[$i]); $j++) {
            if ($j > 0) {
               $pattern .= '(';
               $pattern .= '(&#[xX]0{0,8}([9ab]);)';
               $pattern .= '|';
               $pattern .= '|(&#0{0,8}([9|10|13]);)';
               $pattern .= ')*';
            }
            $pattern .= $ra[$i][$j];
         }
         $pattern .= '/i';
         $replacement = substr($ra[$i], 0, 2).'<x>'.substr($ra[$i], 2);
         // add in <> to nerf the tag
         $val = preg_replace($pattern, $replacement, $val);
         // filter out the hex tags
         if ($val_before == $val) {
            // no replacements were made, so exit the loop
            $found = false;
         }
      }
   }
   return $val;
}
//测试一下效果
//echo RemoveXSS("<script language='javascript'>alert('hello world');</script>") ;
?>
```

<!--more-->

## javascript过滤xss

javascript过滤xss只是一种防君子不防小人的方法，可以两种方式，第一种是将尖括号和引号转义掉，如下面大代码：
```javascript
function(cont){
    cont = cont.replace(/&/g, '&amp;');
    cont = cont.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    cont = cont.replace(/\'/g, '&#39;').replace(/\"/g, '&quot;');
    return cont;
};
```
第二种是动态创建一个dom，然后将str作为innerText，之后动态的取innerHTML出来，就可以是经过转义的内容了，
注：感谢 Jackmasa 指出问题，其实这里还是会有问题，详细见文章：《[前端安全](http://www.csser.com/board/4f93781fac1fd192290005dc#/post/4f94a0c978adca754d000129)》

## apache防止svn版本库被浏览

前几天炒的比较热的svn版本库被爆的问题，自己查了下找到了简单的解决apache的svn版本库被浏览方式，nginx也是类似的禁用.svn的浏览

### apache禁用svn

```shell
<Directory ~ ".svn">
Order allow,deny
Deny from all
</Directory>```
```
### nginx禁用svn

```text
location ~ /.svn/ {
  deny all;
}
```
