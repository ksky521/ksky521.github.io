title: "主流浏览器的CSS Hack方法整理"
id: 382
date: 2009-12-17 16:28:06
tags:
- css
- 网络技术
categories:
- 前端开发
---
由于不同的浏览器，比如IE6、IE7、Firefox等，对CSS的解析不一样，因此会导致生成的页面效果不一样，得不到我们所需要的页面效果。我在写[WordPress天气预报插件](http://js8.in/374.html)的时候就碰见了一个**CSS hack**的问题：在IE6下不能显示正常。本来一个很好的[WordPress天气预报插件](http://js8.in/wordpress-weather)就因为IE6给推迟了发布时间。所以对于前端开发人员**CSS兼容性**是个比较棘手的问题，当然对于不同浏览器也有不同的CSS hack的方法，此处本人就整理了一些常用到CSS hack方法，分享给大家，希望对大家有用。

### CSS Hack浏览器的顺序

对于不同浏览器的CSS hack是有顺序区分的，一般的书写hack的顺序是：**Firefox -&gt; IE7 -&gt; IE6 -&gt; 其他**，
当然推荐大家使用Firefox+Firebug来进行调试，注意书写的时候要尽量标准，记住封口，很多时候不封口在FF，IE7下显示正常，可是在IE6下就全部乱了~

### CSS Hack整理汇总

这些方法相信很多人已经很熟悉了：比如 **IE6**能识别下划线"**<span style="color: #ff00ff;">_</span>**"和星号" <span style="color: #ff00ff;">*** **</span>"，**IE7**能识别星号"<span style="color: #ff00ff;">** ***</span> "，但不能识别下划线"<span style="color: #ff00ff;">**_**</span>"，而**firefox**两个都不能认识。
<!--more-->
** 区别IE6与FF**：

background:orange;**<span style="color: #ff00ff;">*</span>**background:blue;

** 区别IE6与IE7**：

background:green** !important**;background:blue;

** 区别IE7与FF**：

background:orange; <span style="color: #ff0000;">*****</span>background:green;

** 区别FF，IE7，IE6**：

background:orange;<span style="color: #ff0000;">*****</span>background:green <span style="color: #ff0000;">!important</span>;<span style="color: #ff0000;">*****</span>background:blue;

注：
<p style="padding-left: 30px;">IE都能识别<span style="color: #ff00ff;">*****</span>;标准浏览器(如FF)不能识别<span style="color: #ff00ff;">*****</span>；
IE6能识别<span style="color: #ff00ff;">*****</span>，但不能识别** !important**,
IE7能识别<span style="color: #ff00ff;">*****</span>，也能识别**!important**;
FF不能识别<span style="color: #ff00ff;">*****</span>，但能识别**!important**;
> <table border="0" cellspacing="1" cellpadding="0">
> <tbody>
> <tr>
> <td></td>
> <td>IE6</td>
> <td>IE7</td>
> <td>FF</td>
> </tr>
> <tr>
> <td>**<span style="color: #ff0000;">*</span>**</td>
> <td>√</td>
> <td>√</td>
> <td><span style="color: #ff0000;">×</span></td>
> </tr>
> <tr>
> <td>!important</td>
> <td><span style="color: #ff0000;">×</span></td>
> <td>√</td>
> <td>√</td>
> </tr>
> </tbody></table>
另外再补充一个:**下划线"_",** **IE6支持下划线，IE7和firefox均不支持下划线。**

于是大家还可以这样来区分IE6，IE7，firefox
<span style="color: #008000;">** : **</span>background:orange;<span style="color: #ff6600;">*****</span>background:green;<span style="color: #ff0000;">**_**</span>background:blue;

除了上面常用到的方法，下面的代码也有CSS hack的效果：

```css
#bgcolor {
	background:red !important; /* Firefox 等其他浏览器 */
	background:blue; /* IE6 */
}
*+html #bgcolor {
	background:green !important; /* IE7 */
}```
E6 不认 !important, 也不认 *+html. 所以 IE6 只能是 blue.
IE7 认 !important, 也认 ***+html**, 优先度: **(*+html + !important) &gt; !important &gt; +html**. IE7 可以是 red, blue 和 green, 但 green 的优先度最高.
Firefox 和其他浏览器都认 !important. !important 优先, Firefox 可以是 red 和 blue, 但 red 优先度高.

注：不管是什么方法，书写的顺序都是firefox的写在前面，IE7的写在中间，IE6的写在最后面。

### 使用if IE注释，让不同的CSS文件也能Hack

我们可以写两个文件，一个是针对于全部浏览器的不需要**CSS hack**的css文件，假如是all.css，一个是针对某一特例的浏览器，如IE6，假设为IE6.css
我们可以通过下面的代码来给**IE6浏览器**引入IE6.css这个文件，而对于其他的浏览器（如IE7）却不引入这个IE6.css，这样子就减少了IE7浏览器的请求次。
> <pre style="background-image: none; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial; border-bottom-width: 1px; border-bottom-color: #fafafa; border-left-width: 3px; border-left-color: #e5e5e5; width: auto; clear: none; overflow-x: visible; overflow-y: visible; font-size: 12px; line-height: 1.333; font-family: monospace; background-position: initial initial; background-repeat: initial initial; padding: 0px; margin: 0px; border: initial none initial;">&lt;!--[if IE]&gt;
> 	&lt;link rel="stylesheet" href="style_ie.css" type="text/css" /&gt;
> &lt;![endif]--&gt;```
关于**if IE注释**的详细用法，请参详《[使用if IE hack注释解决CSS以及JS的兼容问题](http://js8.in/381.html)》

### 兼容所有浏览器的透明效果


```css
.transparent_class {
	filter:alpha(opacity=50);
	-moz-opacity:0.5;/** Firefox 3.5即将原生支持opacity属性，所以本条属性只在Firefox3以下版本有效 ***/
	-khtml-opacity: 0.5;
	opacity: 0.5;
}```

### 针对chrome、opera、safari的CSS hack方法

请移步→《[Opera Chrome Safari浏览器的CSS Hack方法](http://js8.in/397.html)》