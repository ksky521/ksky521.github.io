title: "javascript简单实现checkbox的全选与反选"
id: 605
date: 2010-11-24 04:23:35
tags: 
categories: 
- JavaScript
- 网络技术
---

今天上网遇到有个网友在论坛问input的**checkbox**全选和反选的问题，顺手总结了一下，然后写了个简单的jQuery checkbox**全选反选**插件，希望对大家有用。
如果是简单的实现checkbox的全选与反选可以使用下面的函数：
<pre lang="javascript">
 function checkall(obj,cName)
 {
     var checkboxs = document.getElementsByName(cName);
     for(var i=checkboxs.length;i--;){
             checkboxs[i].checked = obj.checked;
     }
 }
//使用方法:给全选的按钮加onclick事件：onclick="checkall(this,'all[]');"
</pre>
<!--more-->
下面的jQuery checkbox插件是在网上找的：
<pre lang="javascript">
$.fn.checkbox = function(){
    var t = this;
    /*
     * 切换全选/反选
     * @example $("#checkAll").checkbox().toggle($("input[name='selectAll']"));
     */
    this.toggle = function(el){
        $(el).click(function(){
            $(t).attr('checked', false);
        });
        $(this).click(function(){
            $(el).attr('checked', $(this).attr('checked') == true ? true : false);
        });
    };
    /*
     * 全选
     */
    this.check = function(el){
        $(el).attr('checked', true);
    };
    /*
     * 反选
     */
    this.uncheck = function(el){
        $(el).attr('checked', false);
    };
    return t;
};

</pre>