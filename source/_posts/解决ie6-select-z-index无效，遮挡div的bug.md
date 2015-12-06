title: "解决IE6 select z-index无效，遮挡div的bug"
id: 553
date: 2010-06-17 17:33:03
tags:
- css
- 网络技术
categories:
- 前端开发
---
在最近的一个项目中，遇到了**IE6 select遮挡div**的bug，为了解决这个bug我查了很多资料，试图找到一个最最有效的方法，很多人是通过**iframe**的方法来解决，其实我查了国外的很多资料也是通过iframe的方法来解决的。今天我说说iframe解决的一般方法，已经使用**jQuery**插件**bgifram**e解决IE6 select z-index无效，**遮挡div**的bug。

### 解决方法之一：Iframe包裹select元素

使用iframe包住select，这样iframe有z-index，只要在div上设置的z-index比iframe的高即可~这种方法有一定的局限性，不可能每个select都要加个iframe吧？所以**不推荐**！代码如下：

```html
<iframe style="z-index:1;position: absolute; ">
<!-- 用iframe 解决此bug -->     
            <select name="country">                    
                 <option value="1">china</option>     
                <option value="2">japanese</option>     
                <option value="1">U.S.A</option>     
             </select>     
</iframe>  
```

### 解决方法之二：以Iframe作为div的子元素，覆盖select元素

建立一个跟div同宽同高的iframe，并且z-index比div要低。这种方法**推荐**使用：
<!--more-->

```html
<style>.T_iframe   
{   
    position: absolute;/*绝对定位保证iframe不会占用流布局空间*/   
    width: 100%;    /*100%保证可以覆盖整个div*/   
    height: 100%;   
    z-index:-1; /*-1保证iframe显示在div下方*/   
}   
.T_div   
{   
    position: absolute;   
    left:100px;   
    top:50px;   
    width: 300px;   
    height: 200px;   
    background : blue;     
    z-index:100;   
}   </style>
<div class="T_div">  
     <span>这里可以包含其他dom元素</span>  
     <iframe class="T_iframe"></iframe>  
</div>  
```

### 解决方法之三：使用jQuery的bgiframe插件

如果你的项目引用了jQuery，那么我推荐使用**bgiframe**插件来解决select的遮挡div问题，原理很简单，就是建立一个同高同宽的iframe插入到div中去~bgiframe下载地址：[http://github.com/brandonaaron/bgiframe](http://github.com/brandonaaron/bgiframe)，使用方法：

```javascript
$('.fix-z-index').bgiframe();
```

参数说明：
**top**：设置top位置，默认为auto
**left**：设置left位置，默认为auto
**width**：设置iframe宽度，默认为auto
**height**：设置iframe高度，默认为auto
**opacity**：设置是否透明，默认为true
**src**：设置iframe的src，默认为javascript:false
