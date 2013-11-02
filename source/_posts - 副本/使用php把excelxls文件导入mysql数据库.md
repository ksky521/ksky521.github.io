title: "使用PHP把excel(xls)文件导入mysql数据库"
id: 618
date: 2010-09-03 19:43:24
tags: 
categories: 
- php
- 网络技术
---

昨晚一个客户联系我[做网站](http://js8.in/537.html "承接企业网站建设，企业建站工作")，提出的要求是需要把客户提供的**excel文件**里面的数据导入到mysql数据库，最常用的方法就是先把**xls**文件导出为csv格式的文件，然后在解析csv格式的文件导入到**mysql数据库**。方法比较冗余，而且分好几步进行，很不方便，断桥残雪今天介绍一种方法是直接跳过**csv**的中间环节，直接把excel文件导入mysql数据库。

首先我们需要下载**PHP-ExcelReader**这是一个开源的项目，主要是来解析excel的文件，下载地址：[http://sourceforge.net/projects/phpexcelreader](http://sourceforge.net/projects/phpexcelreader)，下载之后解压，主要用到excel文件夹里面的两个文件reader.php和oleread.php（这个文件默认的是oleread.inc，不清楚为啥，一堆e文，没看，直接改名即可）。

在reader.php文件中找到以下类似代码（第一行既是），改成正确的oleread.php路径即可：`require_once 'oleread.php';`

然后新建一个php文件引入reader.php，<!--more-->代码如下：

<pre lang='php'><?php 
require_once 'Excel/reader.php'; 
$data = new Spreadsheet_Excel_Reader();
$data->setOutputEncoding('gbk');//此处设置编码，一般都是gbk模式

$data->read('Book1.xls');//文件路径

error_reporting(E_ALL ^ E_NOTICE);
//这里我就只循环输出excel文件的内容了，要入库，只要把输出的地方，写一段mysql语句即可~
for ($i = 1; $i <= $data->sheets[0]['numRows']; $i++) {
	for ($j = 1; $j <= $data->sheets[0]['numCols']; $j++) {
		echo "\"".$data->sheets[0]['cells'][$i][$j]."\",";
	}
	echo "\n";
}
?></pre>
<p>注意：请不要使用PHP-ExcelReader压缩包里面的xls进行测试，[断桥残雪](http://js8.in "断桥残雪部落格")发现，那个文件既是使用**excel**也打不开，所以是错误的。

断桥残雪使用上面的方法解析了一个1.4M的数据，都显示正常，所以大家可以放心使用