title: "jQuery实现拖拽功能"
id: 498
date: 2010-03-05 02:36:59
tags: 
categories: 
- JavaScript
---

在360开发中，使用了我写的一个jQuery wBox插件，可是这个wBox只是根据项目需要进行的修改，没有加上拖拽功能，而我正在写新的wBox插件加上了简单的拖拽功能，wBox已经进行到最后样式修改、程序调试阶段，基本功能已经实现。言归正传，结合wBox部分源代码说说jQuery的拖拽功能实现。
[caption id="attachment_500" align="aligncenter" width="563" caption="jQuery wBox插件预览"][![jQuery wBox插件预览](http://js8.in/wp-content/uploads/2010/03/Snap1.jpg "jQuery wBox插件预览")](http://js8.in/wp-content/uploads/2010/03/Snap1.jpg)[/caption]

要写一个拖拽效果，必须区分开mousedown，mouseup，mousemove 三个鼠标的不同状态，当mousedown的时候激发拖拽，表示拖拽开始，当mouseup的时候自然拖拽就结束，而mousemove的时候是拖拽的过程，这个过程就要不停的获取鼠标的位置，根据鼠标运动到得位置设置要拖拽的目标div的位置，具体就不解释啦，很简单的原理，很简单的代码，放出wBox drag部分的代码，希望对大家有用，C为拖拽的目标对象： <!--more--> 
<pre lang="javascript">/**拖拽函数drag*/
        function drag(){
            var dx, dy, moveout;
            var T = C.find('.dragTitle').css('cursor', 'move');
            T.bind("selectstart", function(){
                return false;
            });            
            T.mousedown(function(e){
                dx = e.clientX - parseInt(C.css("left"));
                dy = e.clientY - parseInt(C.css("top"));
                C.mousemove(move).mouseout(out).css('opacity', 0.8);
                T.mouseup(up);
            });
            /**移动改变生活*/
            function move(e){
                moveout = false;
                if (e.clientX - dx < 0) {
                    l = 0;
                }
                else 
                    if (e.clientX - dx > $(window).width() - C.width()) {
                        l = $(window).width() - C.width();
                    }
                    else {
                        l = e.clientX - dx
                    }
                C.css({
                    left: l,
                    top: e.clientY - dy
                });              
            }
            /**你已经out啦！*/
            function out(e){
                moveout = true;
                setTimeout(function(){
                    checkout(e);
                }, 100);
            }
            /**放弃*/
            function up(e){
                C.unbind("mousemove", move).unbind("mouseout", out).css('opacity', 1);
                T.unbind("mouseup", up);
            }
            /**检查成分*/
            function checkout(e){
                moveout && up(e);
            }
        }</pre>