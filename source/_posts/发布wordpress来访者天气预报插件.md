title: "发布WordPress来访者天气预报插件"
id: 374
date: 2009-12-11 17:43:44
tags:
- wordpress
- 网络技术
categories:
- 乱七八糟
---
细心的童鞋会发现我的博客昨天添加了一个新的功能——**天气预报**，昨天我说要发布给大家的，晚上睡觉之前，想了很久关于WordPress**天气插件**的编写，基本上在晚上就已经理清了思路，早上很早就起床了，没有吃饭就来到公司，趁着大家还没有来的时候，我要在九点上班之前把WordPress来访者天气预报的插件做出来，加上之前开发的[WordPress Follow5 插件](http://js8.in/352.html)开发经验，自己写[**WordPress来访者天气插件**](http://js8.in/wordpress-weather "WordPress天气插件下载")已经是轻车熟路了~

这个插件的使用的是**jsonp技术**，首先通过QQ的ip接口（http://fw.qq.com/ipaddress）获取到来访者的城市**地理信息**，然后使用WordPress的wp_footer的hook动态建立一个JavaScript文件，文件地址为我博客的[http://js8.in/weather/js.php](http://js8.in/weather/wordpress-weather "WordPress天气插件下载")，js.php返回的是一段JavaScript代码，代码使用innerHTML插入来访者天气预报的内容。

WordPress来访者天气预报插件采用**精美的天气图标**，完全DIV+CSS页面布局，保证了页面的美观大气，数据库信息来自中国气象网，保证了数据的可靠性，并且熟悉CSS的童鞋还可以修改插件中的CSS，以达到自己喜欢的页面效果。css地址为wp-content\plugins\weather\css.css

**插件**如不能正常使用，请看以下注意事项：
> 1、保证您的主题皮肤中的footer.php中存在**do_action('wp_footer');**函数
> 
> 2、如出现其他情况，请来[插件页面](http://js8.in/374.html )报错
[![WordPress来访者天气预报插件截图](/uploads/2009/12/screenshot.jpg "WordPress来访者天气预报插件截图")](/uploads/2009/12/screenshot.jpg)

使用方法：
> 1、下载插件（[点击下载](http://js8.in/weather/vistor_weather.zip)）并上传到wp-content\plugins目录中；
> 2、登录网站后台安装此插件；
> 3、然后进入“外观”，“小工具”，把“**Weather Widget**”小工具拖到右侧，填写插件显示名称（如：**天气预报**）即可。

**<span style="overflow-x: hidden; overflow-y: hidden; color: #ff0000;"><strong>最后更新时间：2009-12-12 8：55**</span></strong>

**下载地址：[http://js8.in/weather/vistor_weather.zip](http://js8.in/weather/vistor_weather.zip)**

**当前最新版本为：0.1**