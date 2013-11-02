title: "一段代码解决prototype和jquery的冲突"
id: 22
date: 2008-10-16 03:13:51
tags:
- 网络技术
categories:
- 乱七八糟
---
那天做个人页面（i.2fool.cn），前面的css-dock仿MacOS的导航栏用的是jquery框架

后面写的仿MacOS的导航是用了prototype框架，可是单独测试，效果很好~而放到了一起就出现了问题~

后来想起来了是prototype和jquery有冲突~

以前见过这样的文章，自己百度了一下，终于找到了答案，可是方法很多~

最权威的是个外文的，读了点~也读懂了一点，可是就是不成功~

最后我试着自己改写了一下~就是下面的代码~

PS：校内肯定屏蔽关键字，所以采用了大写

&lt;script type="text/javascript"&gt;
var jQuery=$;
&lt;/script&gt;

这个代码要吧jquery。js放到prototype。js的前面~才可以解决冲突

具体的效果来我的网站看看吧~i.2fool.cn