title: "jQuery弹出框wBox的一个使用实例"
id: 585
date: 2010-08-09 00:06:07
tags:
- javascript
categories:
- 前端开发
---
公司[网站](http://www.pujia.com)越来越多的使用了[wBox](http://js8.in/wbox)，比如最新的产品[普加邻居](http://linju.pujia.com)，封装了wBox(**jQuery**的一款弹出框插件)，房产展示页面的房贷计算器采用的就是**wBox**，搜索结果页面采用的也是wBox，但是相对于其他页面，搜索结果页面每一个li下面会有三个不同的wBox样式，我不可能每个都是手写一段**wBox代码**吧~

[![鼠标划上去显示wBox的三个触发链接](/uploads/2010/08/2010-08-09_155359-300x133.png "鼠标划上去显示wBox的三个触发链接")](/uploads/2010/08/2010-08-09_155359.png)
<!--more-->
经过一番的研究，觉得可以通过下面的代码就解决这个问题：

```javascript
$.each($('a[rel*=wBox]'),function(key,value){
var $t = $(this),name = this.title, url = this.href,  type = $t.attr("type"), geo = $t.attr("geo")
var str = "";
switch (type) {
    case "map"://地图
        $(this).wBox({requestType:"iframe",target:url,title:name,iframeWH:{width:570,height:370}});
        break;
    case "video"://视频
        $(this).wBox({requestType:"iframe",target:url,title:name,iframeWH:{width:497,height:378}});
        break;
    case "bus"://公交驾车
        str = '<div class="wBoxBus">';
        var briefTit = name.substring(0, 12) + (name.length > 12 ? "..." : "");
        str += '<div class="busItem top"><div class="itemleft">到这里来</div><div class="itemcon"><div class="fhitem">出发地：<input type="text" class="inptext" id="FHinput"/></div><div class="fhitem mid">目的地：' + briefTit + '</div><div class="fhInput"><input id="FHbus" type="button" class="orng" value="公交方案" onclick="map.toHere($(\'#FHinput\').val(),\'青岛\',\'b\',\'' + geo + '\',\'' + name + '\',\'FHinput\');return false;"/><input id="FHdr" type="button" class="green" value="驾车导航" onclick="map.toHere($(\'#FHinput\').val(),\'青岛\',\'d\',\'' + geo + '\',\'' + name + '\',\'FHinput\');return false;"/></div></div><div class="c"></div></div>';
        str += '<div class="busItem"><div class="itemleft">从这里出发</div><div class="itemcon"><div class="fhitem">出发地：' + briefTit + '</div><div class="fhitem mid">目的地：<input type="text"  class="inptext" id="THinput" /></div><div class="fhInput"><input id="THbus" type="button" class="orng" value="公交方案" onclick="map.fromHere($(\'#THinput\').val(),\'青岛\',\'b\',\'' + geo + '\',\'' + name + '\',\'THinput\');return false;"/><input id="THdr" type="button" class="green" value="驾车导航" onclick="map.fromHere($(\'#THinput\').val(),\'青岛\',\'d\',\'' + geo + '\',\'' + name + '\',\'THinput\');return false;"/></div></div></div><div class="c"></div></div>';
        $(this).wBox({html:str,title:name});
        break;
}       
});
```

看看效果吧~

[![公交驾车wBox的弹出框](/uploads/2010/08/2010-08-09_155425-300x191.png "公交驾车wBox的弹出框")](/uploads/2010/08/2010-08-09_155425.png)

[![地图部分的wBox弹出框](/uploads/2010/08/2010-08-09_155447-300x216.png "地图部分的wBox弹出框")](/uploads/2010/08/2010-08-09_155447.png)

P.S.：其实换一种思考的方法，多想想应该会有更好的解决方法