title: "Javascript正则表达式详解"
id: 473
date: 2010-02-04 01:57:08
tags:
- javascript
- 网络技术
categories:
- 前端开发
---
**js正则表达式**是很多js开发人员比较头疼的事情，也很多人不愿意学习，只是必要的时候上网查一下就可以啦~本文中详细的把javascript正则表达式的用法进行了列表，希望对于大家学习**javascript正则**表达式有一定的帮助。

**建立正则表达式对象语法
**re = new <span style="color: #008080; padding: 0px; margin: 0px;">RegExp</span>(/pattern/[flags])

**flags 参数说明：
**<span style="color: #ff6600; padding: 0px; margin: 0px;">g</span> （全文查找出现的所有 _pattern_）
<span style="color: #ff6600; padding: 0px; margin: 0px;">i</span> （忽略大小写）
<span style="color: #ff6600; padding: 0px; margin: 0px;">m</span> （多行查找）

<!--more-->
<table style="padding: 0px; margin: 0px;" border="0" cellspacing="1" cellpadding="3" frame="box" rules="all" bgcolor="#339999">
<tbody style="padding: 0px; margin: 0px;">
<tr style="padding: 0px; margin: 0px;" valign="top">
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="16%">普通字符</th>
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="84%">描述</th>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">将下一个字符标记为一个特殊字符、或一个原义字符、或一个 后向引用、或一个八进制转义符。例如，'n' 匹配字符 "n"。'\\n' 匹配一个换行符。序列 '\\\\' 匹配 "\\" 而 "\\(" 则匹配 "("。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">.</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配除 "\\n" 之外的任何单个字符。要匹配包括 '\\n' 在内的任何字符，请使用象 '[.\\n]' 的模式。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">_x_|_y_</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配 _x_ 或 _y_。例如，'z|food' 能匹配 "z" 或 "food"。'(z|f)ood' 则匹配 "zood" 或 "food"。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">[_xyz_]</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 "plain" 中的 'a'。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">[^_xyz_]</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">负值字符集合。匹配未包含的任意字符。例如， '[^abc]' 可以匹配 "plain" 中的'p'。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">[_a-z_]</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">字符范围。匹配指定范围内的任意字符。例如，'[a-z]' 可以匹配 'a' 到 'z' 范围内的任意小写字母字符。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">[^_a-z_]</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">负值字符范围。匹配任何不在指定范围内的任意字符。例如，'[^a-z]' 可以匹配任何不在 'a' 到 'z' 范围内的任意字符。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\c_x_</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配由_x_指明的控制字符。例如， \\cM 匹配一个 Control-M 或回车符。 _x_ 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的 'c' 字符。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\d</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配一个数字字符。等价于 [0-9]。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\D</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配一个非数字字符。等价于 [^0-9]。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\w</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配包括下划线的任何单词字符。等价于'[A-Za-z0-9_]'。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\W</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配任何非单词字符。等价于 '[^A-Za-z0-9_]'。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\x_n_</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配 _n_，其中 _n_ 为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如， '\\x41' 匹配 "A"。'\\x041' 则等价于 '\\x04' &amp; "1"。正则表达式中可以使用 ASCII 编码。.</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\_num_</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配 _num_，其中 _num_ 是一个正整数。对所获取的匹配的引用。例如，'(.)\\1' 匹配两个连续的相同字符。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\_n_</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">标识一个八进制转义值或一个后向引用。如果 \\_n_ 之前至少 _n_ 个获取的子表达式，则 _n_ 为后向引用。否则，如果 _n_ 为八进制数字 (0-7)，则_n_ 为一个八进制转义值。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\_nm_</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">标识一个八进制转义值或一个后向引用。如果 \\_nm_ 之前至少有is preceded by at least _nm_ 个获取得子表达式，则 _nm_ 为后向引用。如果 \\_nm_ 之前至少有 _n_ 个获取，则 _n_ 为一个后跟文字 _m _的后向引用。如果前面的条件都不满足，若? _n_ 和 _m_ 均为八进制数字 (0-7)，则 \\_nm_将匹配八进制转义值 _nm_。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\_nml_</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">如果 _n_ 为八进制数字 (0-3)，且 _m_ 和 _l_ 均为八进制数字 (0-7)，则匹配八进制转义值 _nml。_</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\u_n_</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配 _n_，其中 _n_ 是一个用四个十六进制数字表示的 Unicode 字符。例如， \\u00A9 匹配版权符号 (?)。</td>
</tr>
</tbody></table>

<table style="padding: 0px; margin: 0px;" border="0" cellspacing="1" cellpadding="3" frame="box" rules="all" bgcolor="#339999">
<tbody style="padding: 0px; margin: 0px;">
<tr style="padding: 0px; margin: 0px;" valign="top">
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="16%">特殊字符</th>
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="84%">说明</th>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">$</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配输入字符串的结尾位置。如果设置了 **RegExp** 对象的 **Multiline** 属性，则 $ 也匹配 '\\n' 或 '\\r'。要匹配 $ 字符本身，请使用 \\$。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">( )</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">标记一个子表达式的开始和结束位置。子表达式可以获取供以后使用。要匹配这些字符，请使用 \\( 和 \\)。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">*****</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配前面的子表达式零次或多次。要匹配 * 字符，请使用 \\*。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">**+**</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配前面的子表达式一次或多次。要匹配 + 字符，请使用 \+。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">**.**</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配除换行符 \\n之外的任何单字符。要匹配 .，请使用 \\。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">[</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">标记一个中括号表达式的开始。要匹配 [，请使用 \\[。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">?</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配前面的子表达式零次或一次，或指明一个非贪婪限定符。要匹配 ? 字符，请使用 \\?。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">将下一个字符标记为或特殊字符、或原义字符、或后向引用、或八进制转义符。例如， 'n' 匹配字符 'n'。'\\n' 匹配换行符。序列 '\\\' 匹配 "\\"，而 '\\(' 则匹配 "("。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">^</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配输入字符串的开始位置，除非在方括号表达式中使用，此时它表示不接受该字符集合。要匹配 ^ 字符本身，请使用\\^。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">{</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">标记限定符表达式的开始。要匹配 {，请使用 \\{。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">|</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">指明两项之间的一个选择。要匹配 |，请使用 \\|。</td>
</tr>
</tbody></table>

<table style="padding: 0px; margin: 0px;" border="0" cellspacing="1" cellpadding="3" frame="box" rules="all" bgcolor="#339999">
<tbody style="padding: 0px; margin: 0px;">
<tr style="padding: 0px; margin: 0px;" valign="top">
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="16%">非打印字符</th>
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="84%">含义</th>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\c_x_</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配由_x_指明的控制字符。例如， \\cM 匹配一个 Control-M 或回车符。 _x_ 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的 'c' 字符。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\f</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配一个换页符。等价于 \\x0c 和 \\cL。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\n</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配一个换行符。等价于 \x0a 和 \cJ。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\r</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配一个回车符。等价于 \x0d 和 \cM。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\s</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [?\\f\\n\\r\\t\\v]。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\S</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配任何非空白字符。等价于 [^?\\f\\n\\r\\t\\v]。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\t</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配一个制表符。等价于 \\x09 和 \\cI。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\v</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配一个垂直制表符。等价于 \\x0b 和 \\cK。</td>
</tr>
</tbody></table>

<table style="padding: 0px; margin: 0px;" border="0" cellspacing="1" cellpadding="3" frame="box" rules="all" bgcolor="#339999">
<tbody style="padding: 0px; margin: 0px;">
<tr style="padding: 0px; margin: 0px;" valign="top">
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="16%">限定符</th>
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="84%">描述</th>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">*</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配前面的子表达式零次或多次。例如，zo* 能匹配 "z" 以及 "zoo"。 * 等价于{0,}。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">+</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">?</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配前面的子表达式零次或一次。例如，"do(es)?" 可以匹配 "do" 或 "does" 中的"do" 。? 等价于 {0,1}。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">{_n_}</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">_n_ 是一个非负整数。匹配确定的 _n_ 次。例如，'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">{_n_,}</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">_n_ 是一个非负整数。至少匹配_n_ 次。例如，'o{2,}' 不能匹配 "Bob" 中的 'o'，但能匹配 "foooood" 中的所有 o。'o{1,}' 等价于 'o+'。'o{0,}' 则等价于 'o*'。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">{_n_,_m_}</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">_m_ 和 _n_ 均为非负整数，其中_n_ &lt;= _m_。最少匹配 _n_ 次且最多匹配 _m_ 次。刘， "o{1,3}" 将匹配 "fooooood" 中的前三个 o。'o{0,1}' 等价于 'o?'。请注意在逗号和两个数之间不能有空格。</td>
</tr>
</tbody></table>

<table style="padding: 0px; margin: 0px;" border="0" cellspacing="1" cellpadding="3" frame="box" rules="all" bgcolor="#339999">
<tbody style="padding: 0px; margin: 0px;">
<tr style="padding: 0px; margin: 0px;" valign="top">
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="16%">定位符</th>
<th style="font-weight: bold; color: #000000; padding: 0px; margin: 0px;" width="84%">描述</th>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">^</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配输入字符串的开始位置。如果设置了 **RegExp** 对象的 **Multiline** 属性，^ 也匹配 '\\n' 或 '\\r' 之后的位置。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">$</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配输入字符串的结束位置。如果设置了**RegExp** 对象的 **Multiline** 属性，$ 也匹配 '\\n' 或 '\\r' 之前的位置。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\b</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配一个单词边界，也就是指单词和空格间的位置。</td>
</tr>
<tr style="padding: 0px; margin: 0px;" valign="top">
<td style="padding: 0px; margin: 0px;" width="16%" bgcolor="#ffffff">\\B</td>
<td style="padding: 0px; margin: 0px;" width="84%" bgcolor="#ffffff">匹配非单词边界。</td>
</tr>
</tbody></table>

### 是否有匹配


```javascript
regexpObject.test(string)```
返回值为Boolean型
> 
```javascript
var re = new RegExp(/\bbe\b/g);
> var str = "To be, or not to be:That is the question:";
> alert(str.search(re));```

```javascript
string.search(regexpObject)```
返回匹配字符的位置，无匹配返回-1
> 
```javascript
var re = new RegExp(/\bbe\b/g);
> var str = "To be, or not to be:That is the question:";
> alert(re.test(str));```

### 取得正则匹配信息


```javascript
regexpObject.exec(string)```
> 
```javascript
var re = new RegExp(/be/g);
> var str = "To be, or not to be:That is the question:";
> var f;
> do
> {
>     f = re.exec(str);
>     alert(f + ":" + f.index);
> } while (f!=null);```

### 使用正则表达式进行字符串替换


```javascript
string.replace(re, replaceString)```
> 
```javascript
var re = new RegExp(/be/g);
> var str = "To be, or not to be:That is the question:";
> alert(str.replace(re, "*"));```