title: "PHP实现javascript的escape和unescape函数"
id: 941
date: 2012-02-02 20:57:03
tags:
- php
- escape
categories:
- 后端运维
---

**前端开发**工程师都知道javascript有编码函数`escape()`和对应的解码函数`unescape()`，而php中只有个urlencode和urldecode，这个编码和解码函数对encodeURI和encodeURIComponent有效，但是对**escape**的是无效的。

javascript中的`escape()`函数和`unescape()`函数用户字符串编码，类似于PHP中的`urlencode()`函数，下面是php实现的`escape`函数代码：
```php
/**
 * js escape php 实现
 * @param $string           the sting want to be escaped
 * @param $in_encoding
 * @param $out_encoding
 */
function escape($string, $in_encoding = 'UTF-8',$out_encoding = 'UCS-2') {
    $return = '';
    if (function_exists('mb_get_info')) {
        for($x = 0; $x < mb_strlen ( $string, $in_encoding ); $x ++) {
            $str = mb_substr ( $string, $x, 1, $in_encoding );
            if (strlen ( $str ) > 1) { // 多字节字符
                $return .= '%u' . strtoupper ( bin2hex ( mb_convert_encoding ( $str, $out_encoding, $in_encoding ) ) );
            } else {
                $return .= '%' . strtoupper ( bin2hex ( $str ) );
            }
        }
    }
    return $return;
}
```php
<!--more-->

对应的解码**php unescape**代码是：

```php
function unescape($str)
{
    $ret = '';
    $len = strlen($str);
    for ($i = 0; $i < $len; $i ++)
    {
        if ($str[$i] == '%' && $str[$i + 1] == 'u')
        {
            $val = hexdec(substr($str, $i + 2, 4));
            if ($val < 0x7f)
                $ret .= chr($val);
            else
                if ($val < 0x800)
                    $ret .= chr(0xc0 | ($val >> 6)) .
                     chr(0x80 | ($val & 0x3f));
                else
                    $ret .= chr(0xe0 | ($val >> 12)) .
                     chr(0x80 | (($val >> 6) & 0x3f)) .
                     chr(0x80 | ($val & 0x3f));
            $i += 5;
        } else
            if ($str[$i] == '%')
            {
                $ret .= urldecode(substr($str, $i, 3));
                $i += 2;
            } else
                $ret .= $str[$i];
    }
    return $ret;
}
```
