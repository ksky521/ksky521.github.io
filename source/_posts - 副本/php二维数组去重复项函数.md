title: "PHP二维数组去重复项函数"
id: 475
date: 2010-02-05 16:42:15
tags: 
categories: 
- php
---

PHP数组去除**重复项**有个内置函数**array_unique**()，但是php的array_unique函数只适用于一维数组，对多维数组并不适用，以下提供一个**二维数组**的array_unique函数
> <pre lang="php">//二维数组去掉重复值
> function array_unique_fb($array2D){
>      foreach ($array2D as $v){
>          $v = join(",",$v);  //降维,也可以用implode,将一维数组转换为用逗号连接的字符串
>          $temp[] = $v;
>      }
>      $temp = array_unique($temp);    //去掉重复的字符串,也就是重复的一维数组
>     foreach ($temp as $k =&gt; $v){
>         $temp[$k] = explode(",",$v);   //再将拆开的数组重新组装
>     }
>     return $temp;
> }</pre>