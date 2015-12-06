title: "悼念地震，网站变灰CSS代码"
id: 528
date: 2010-04-20 02:15:07
tags:
- css
categories:
- 前端开发
---
为了悼念地震中遇害的同胞，国家规定明天开始悼念日~下面贴出来使用CSS的IE滤镜代码实现网站变灰白的效果代码，只在IE下有效~
首先确定贵网站使用的是标准的doctype头，下面是html开头代码：

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd

<html xmlns="http://www.w3.org/1999/xhtml">
```
然后使用下面的CSS代码

```css
html {
    filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); 
}
```

如果贵网站有Flash，那么请在&lt;object&gt;和&lt;&/object&gt;之间插入一下代码：

```html
<param value=”false” name=”menu”/>
<param value=”opaque” name=”wmode”/>
```
