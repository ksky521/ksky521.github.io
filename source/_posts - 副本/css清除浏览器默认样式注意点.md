title: "CSS清除浏览器默认样式注意点"
id: 365
date: 2009-12-04 18:15:20
tags: 
categories: 
- CSS
- 网络技术
---

今天看了岁月如歌的一片文章《[KISSY CSS Reset 1.0](http://lifesinger.org/blog/2009/12/kissy-css-reset/)》其中写到了**css重置**的代码
> /*
> KISSY CSS Reset
> 理念：1\. reset 的目的不是清除浏览器的默认样式，这仅是部分工作。清除和重置是紧密不可分的。
> 2\. reset 的目的不是让默认样式在所有浏览器下一致，而是减少默认样式有可能带来的问题。
> 3\. reset 期望提供一套普适通用的基础样式。但没有银弹，推荐根据具体需求，裁剪和修改后再使用。
> 特色：1\. 适应中文；2\. 基于最新主流浏览器。
> 维护：玉伯, 正淳
> Revision: 276
> */
> 
> /** 清除内外边距 **/
> body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
> dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
> pre, /* text formatting elements 文本格式元素 */
> form, fieldset, legend, button, input, textarea, /* form elements 表单元素 */
> th, td /* table elements 表格元素 */ {
> margin: 0;
> padding: 0;
> }
> 
> /** 设置默认字体 **/
> body,
> button, input, select, textarea /* for ie */ {
> font: 12px/1.5 tahoma, arial, simsun, sans-serif;
> }
> h1, h2, h3, h4, h5, h6 { font-size: 100%; }
> address, cite, dfn, em, var { font-style: normal; } /* 将斜体扶正 */
> code, kbd, pre, samp { font-family: courier new, courier, monospace; } /* 统一等宽字体 */
> small { font-size: 12px; } /* 小于 12px 的中文很难阅读，让 small 正常化 */
> 
> /** 重置列表元素 **/
> ul, ol { list-style: none; }
> 
> /** 重置文本格式元素 **/
> a { text-decoration: none; }
> a:hover { text-decoration: underline; }
> 
> sup { vertical-align: text-top; } /* 重置，减少对行高的影响 */
> sub { vertical-align: text-bottom; }
> 
> /** 重置表单元素 **/
> legend { color: #000; } /* for ie6 */
> fieldset, img { border: 0; } /* img 搭车：让链接里的 img 无边框 */
> button, input, select, textarea { font-size: 100%; } /* 使得表单元素在 ie 下能继承字体大小 */
> /* 注：optgroup 无法扶正 */
> 
> /** 重置表格元素 **/
> table { border-collapse: collapse; border-spacing: 0; }
而我在腾讯webteam中看到一篇文章《[border:none;与border:0;的区别](http://webteam.tencent.com/?p=1481)》中提到
<!--more-->> **1.性能差异**
> 【border:0;】把border设为“0”像素虽然在页面上看不见，但按border默认值理解，浏览器依然对border-width/border-color进行了渲染，即已经占用了内存值。
> 【border:none;】把border设为“none”即没有，浏览器解析“none”时将不作出渲染动作，即不会消耗内存值。
> **2.兼容性差异**
> 兼容性差异只针对浏览器IE6、IE7与标签button、input而言，在win、win7、vista 的XP主题下均会出现此情况。
> 【border:none;】当border为“none”时似乎对IE6/7无效边框依然存在
> 【border:0;】当border为“0”时，感觉比“none”更有效，所有浏览器都一致把边框隐藏
> **总结：**
> 1\. 对比border:0;与border:none;之间的区别在于有渲染和没渲染，感觉他们和display:none;与visibility:hidden;的关系类似，而对于border属性的渲染性能对比暂时没找测试的方法，虽然认为他们存在渲染性能上的差异但也只能说是理论上。
> 
> 2\. 如何让border:none;实现全兼容？只需要在同一选择符上添加背景属性即可，
> 对于border:0;与border:none;个人更向于使用,border:none;，因为border:none;毕竟在性能消耗没有争议，而且兼容性可用背景属性解决不足以成为障碍。
所以建议大家根据自己的实际情况做判断使用**border:none;** 或者** border:0;**