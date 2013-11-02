title: "如何写网站的robots.txt和meta name robots的配置"
id: 46
date: 2008-09-18 03:46:11
tags: 
categories: 
- 网络技术
---

**最近几天最出名的网络新闻应该是淘宝屏蔽百度搜索的事情了！淘宝怎么做到的呢？其实很Easy，看看淘宝的robots.txt就知道了。地址是：[www.taobao.com/robots.txt](http://www.taobao.com/robots.txt)。看到了吗？百度蜘蛛disallow啦！不懂啊~看看本文吧(PS：其实百度也要进军C2C市场，淘宝是为了保住自己的市场罢了)**

**robots.txt基本介绍
**robots.txt是一个纯文本文件，在这个文件中网站管理者可以声明该网站中不想被robots访问的部分，或者指定搜索引擎只收录指定的内容。
当一个搜索机器人（有的叫搜索蜘蛛）访问一个站点时，它会首先检查该站点根目录下是否存在robots.txt，如果存在，搜索机器人就会按照该文件中的内容来确定访问的范围；如果该文件不存在，那么搜索机器人就沿着链接抓取。
另外，robots.txt必须放置在一个站点的根目录下，而且文件名必须全部小写。
**robots.txt写作语法**
首先，我们来看一个robots.txt范例：[/robots.txt](/robots.txt)
访问以上具体地址，我们可以看到robots.txt的具体内容如下：
_# All robots will spider the domain_
_User-agent: *
Disallow:_
以上文本表达的意思是允许所有的搜索机器人访问[blog.2fool.cn](/)站点下的所有文件。
具体语法分析：其中#后面文字为说明信息；_User-agent:_后面为搜索机器人的名称，后面如果是_*，_则泛指所有的搜索机器人；_Disallow:_后面为不允许访问的文件目录。
下面，我将列举一些robots.txt的具体用法：
**允许所有的robot访问**
_User-agent: *
Disallow:_
或者也可以建一个空文件 “/robots.txt” file
**禁止所有搜索引擎访问网站的任何部分**
_User-agent: *
Disallow: /_
**禁止所有搜索引擎访问网站的几个部分（下例中的01、02、03目录）**
User-agent: *
Disallow: /01/
Disallow: /02/
Disallow: /03/
**禁止某个搜索引擎的访问（下例中的BadBot）**
_User-agent: BadBot
Disallow: /_
**只允许某个搜索引擎的访问（下例中的Crawler）**
_User-agent: Crawler
Disallow:_
_User-agent: *
Disallow: /_
**另外，我觉得有必要进行拓展说明，对robots meta进行一些介绍：**
Robots META标签则主要是针对一个个具体的页面。和其他的META标签（如使用的语言、页面的描述、关键词等）一样，Robots META标签也是放在页面的＜head＞＜/head＞中，专门用来告诉搜索引擎ROBOTS如何抓取该页的内容。
**Robots META标签的写法：**
Robots META标签中没有大小写之分，name=”Robots”表示所有的搜索引擎，可以针对某个具体搜索引擎写为name=”BaiduSpider”。 content部分有四个指令选项：index、noindex、follow、nofollow，指令间以“,”分隔。
INDEX 指令告诉搜索机器人抓取该页面；
FOLLOW 指令表示搜索机器人可以沿着该页面上的链接继续抓取下去；
Robots Meta标签的缺省值是INDEX和FOLLOW，只有inktomi除外，对于它，缺省值是INDEX,NOFOLLOW。
这样，一共有四种组合：
＜META NAME=”ROBOTS” CONTENT=”INDEX,FOLLOW”＞
＜META NAME=”ROBOTS” CONTENT=”NOINDEX,FOLLOW”＞
＜META NAME=”ROBOTS” CONTENT=”INDEX,NOFOLLOW”＞
＜META NAME=”ROBOTS” CONTENT=”NOINDEX,NOFOLLOW”＞
其中
＜META NAME=”ROBOTS” CONTENT=”INDEX,FOLLOW”＞可以写成＜META NAME=”ROBOTS” CONTENT=”ALL”＞；
＜META NAME=”ROBOTS” CONTENT=”NOINDEX,NOFOLLOW”＞可以写成＜META NAME=”ROBOTS” CONTENT=”NONE”＞
目前看来，绝大多数的搜索引擎机器人都遵守robots.txt的规则，而对于Robots META标签，目前支持的并不多，但是正在逐渐增加，如著名搜索引擎GOOGLE就完全支持，而且GOOGLE还增加了一个指令“archive”，可以限制GOOGLE是否保留网页快照。例如：
＜META NAME=”googlebot” CONTENT=”index,follow,noarchive”＞
表示抓取该站点中页面并沿着页面中链接抓取，但是不在GOOLGE上保留该页面的网页快照。