title: "获取a标签和script标签的绝对路径和相对路径"
id: 1044
date: 2012-08-06 18:22:35
tags:
- 标签
- 路径
categories:
- 前端开发
---

做了一个a标签和script标签获取绝对路径和相对路径的实验，实验代码如下：
```html
<a id="link" href="a.html">a.html</a>
<script type="text/javascript" id="script" src='a.js'></script>
<script type="text/javascript">
    function $(id){
        return document.getElementById(id);
    }
    alert('link.href=>'+$('link').href);
    alert('link.get=>'+$('link').getAttribute('href'));
    alert('link.get0=>'+$('link').getAttribute('href',0));
    alert('link.get1=>'+$('link').getAttribute('href',1));
    alert('link.get2=>'+$('link').getAttribute('href',2));
    alert('link.get4=>'+$('link').getAttribute('href',4));

    alert('script.src=>'+$('script').src);
    alert('script.get=>'+$('script').getAttribute('src'));
    alert('script.get0=>'+$('script').getAttribute('src',0));
    alert('script.get1=>'+$('script').getAttribute('src',1));
    alert('script.get2=>'+$('script').getAttribute('src',2));
    alert('script.get4=>'+$('script').getAttribute('src',4));
</script>
```
分别在IE6~IE9（都是虚拟机原生，非ie9模拟）、chrome21、FF14，opera12.01，safari5.1.7中做出如下的实验结果:

√代表绝对路径，×代表相对路径（即src或者href属性的值，如果为完整的路径，则是完整路径）

方法  |IE6 | IE7 | IE8 | IE9 | chrome 21 |   FF 14 |   safari 5.1.7 |    opera 12
---- | --- | ---| --- | --- | ---- | ---- | --- | ---
link.href |   √ |   √ |   √ |   √ |  √ |  √ |  √  | √
link.get |    √ |   √ |   × |   × |  × |  × |  ×  | ×
link.get0 |   √ |   √ |   × |   × |  × |  × |  ×  | ×
link.get1 |   √ |   √ |   × |   × |  × |  × |  ×  | ×
link.get2 |   × |   × |   × |   × |  × |  × |  ×  | ×
link.get4 |   √ |   √ |   × |   × |  × |  × |  ×  | ×
script.src |  × |   × |   √ |   √ |  √ |  √ |  √  | √
script.get |  × |   × |   × |   × |  × |  × |  ×  | ×
script.get0 | × |   × |   × |   × |  × |  × |  ×  | ×
script.get1 | × |   × |   × |   × |  × |  × |  ×  | ×
script.get2 | × |   × |   × |   × |  × |  × |  ×  | ×
script.get4 | √ |   √ |   × |   × |  × |  × |  ×  | ×

详情见MSDN的介绍：[http://msdn.microsoft.com/en-us/library/ms536429(v=VS.85).aspx](http://msdn.microsoft.com/en-us/library/ms536429(v=VS.85).aspx)
