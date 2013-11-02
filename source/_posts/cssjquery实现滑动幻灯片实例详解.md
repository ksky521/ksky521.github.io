title: "CSS+jQuery实现滑动幻灯片实例详解"
id: 479
date: 2010-02-08 18:18:01
tags:
- javascript
- 网络技术
categories:
- 前端开发
---
今天我看见一个比较不错的**jQuery幻灯片**教程，比我之前的文章《[两个简单的jQuery幻灯片实例](http://js8.in/462.html "两个简单的jQuery幻灯片实例")》写的更为详细，并且有框架布局的演示图片，特地转载来，部分英文不翻译了，很简单的~

### HTML部分代码

Start with having a wrapping container div called _main_view_, and two sections nested inside called _image_reel_ and _paging._ The _image_reel _will contain the sliding images, and _paging_ contains the paging controls. Take a look at the image below for a visual.
> 
```html"><div class="main_view

>     <div class="window">
>         <div class="image_reel">
>             [![](reel_1.jpg)](#)
>             [![](reel_2.jpg)](#)
>             [![](reel_3.jpg)](#)
>             [![](reel_4.jpg)](#)
>         </div>
>     </div>
>     <div class="paging">
>         [1](#)
>         [2](#)
>         [3](#)
>         [4](#)
>     </div>
> </div>```
[![css+jQuery实现滑动幻灯片实例教程](/uploads/2010/02/1.jpg "css+jQuery实现滑动幻灯片实例教程")](http://js8.in/mywork/jq_slider/)
<!--more-->

### CSS部分代码

Take a look at the comments below for an explanation of the styles.
> 
```css
/*--Main Container--*/
> .main_view {
> 	float: left;
> 	position: relative;
> }
> /*--Window/Masking Styles--*/
> .window {
> 	height:286px;	width: 790px;
> 	overflow: hidden; /*--Hides anything outside of the set width/height--*/
> 	position: relative;
> }
> .image_reel {
> 	position: absolute;
> 	top: 0; left: 0;
> }
> .image_reel img {float: left;}
> 
> /*--Paging Styles--*/
> .paging {
> 	position: absolute;
> 	bottom: 40px; right: -7px;
> 	width: 178px; height:47px;
> 	z-index: 100; /*--Assures the paging stays on the top layer--*/
> 	text-align: center;
> 	line-height: 40px;
> 	background: url(paging_bg2.png) no-repeat;
> 	display: none; /*--Hidden by default, will be later shown with jQuery--*/
> }
> .paging a {
> 	padding: 5px;
> 	text-decoration: none;
> 	color: #fff;
> }
> .paging a.active {
> 	font-weight: bold;
> 	background: #920000;
> 	border: 1px solid #610000;
> 	-moz-border-radius: 3px;
> 	-khtml-border-radius: 3px;
> 	-webkit-border-radius: 3px;
> }
> .paging a:hover {font-weight: bold;}```

### JS部分代码

The following script contains comments explaining which jQuery actions are being performed.
**1.Setting up the Image Slider**
Start by showing the paging and activating the first link. Then we will calculate and adjust the width of the _image_reel _according to how many slides there are.
> 
```javascript
//Show the paging and activate its first link
> $(".paging").show();
> $(".paging a:first").addClass("active");
> 
> //Get size of the image, how many images there are, then determin the size of the image reel.
> var imageWidth = $(".window").width();
> var imageSum = $(".image_reel img").size();
> var imageReelWidth = imageWidth * imageSum;
> 
> //Adjust the image reel to its new size
> $(".image_reel").css({'width' : imageReelWidth});```
**2.Setting up the Slider Function and Timer**
We first create the function for the slide event by itself (_rotate_). Then create another function (_rotateSwitch_) that will rotate and repeat that slide event (rotate).
> 
```javascript
//Paging  and Slider Function
> rotate = function(){
>     var triggerID = $active.attr("rel") - 1; //Get number of times to slide
>     var image_reelPosition = triggerID * imageWidth; //Determines the distance the image reel needs to slide
> 
>     $(".paging a").removeClass('active'); //Remove all active class
>     $active.addClass('active'); //Add active class (the $active is declared in the rotateSwitch function)
> 
>     //Slider Animation
>     $(".image_reel").animate({
>         left: -image_reelPosition
>     }, 500 );
> 
> }; 
> 
> //Rotation  and Timing Event
> rotateSwitch = function(){
>     play = setInterval(function(){ //Set timer - this will repeat itself every 7 seconds
>         $active = $('.paging a.active').next(); //Move to the next paging
>         if ( $active.length === 0) { //If paging reaches the end...
>             $active = $('.paging a:first'); //go back to first
>         }
>         rotate(); //Trigger the paging and slider function
>     }, 7000); //Timer speed in milliseconds (7 seconds)
> };
> 
> rotateSwitch(); //Run function on launch```
Take a look at this [tutorial](http://jquery-howto.blogspot.com/2009/04/ajax-update-content-every-x-seconds.html) for an explanation of how the timer (_setInterval_) works.

**3.Hover and Click Events**
In case the user wants to view the slide for a longer period of time, we will allow the slider to stop when it is hovered. Another thing to consider is we should reset the timer each time the paging is clicked. This will prevent unexpected slide switches and allow for a smoother experience.
> 
```javascript
//On Hover
> $(".image_reel a").hover(function() {
>     clearInterval(play); //Stop the rotation
> }, function() {
>     rotateSwitch(); //Resume rotation timer
> });	
> 
> //On Click
> $(".paging a").click(function() {
>     $active = $(this); //Activate the clicked paging
>     //Reset Timer
>     clearInterval(play); //Stop the rotation
>     rotateSwitch(); // Resume rotation timer
>     rotate(); //Trigger rotation immediately
>     return false; //Prevent browser jump to link anchor
> });```
[![css+jQuery实现滑动幻灯片实例教程](/uploads/2010/02/1.jpg "css+jQuery实现滑动幻灯片实例教程")](/uploads/2010/02/1.jpg)

[查看演示](http://js8.in/mywork/jq_slider/)

### 一些网站实例

Below are some sites that use similar techniques, check them out for inspiration!

[![Automatic Image Slider CSS jQuery](http://www.sohtanaka.com/web-design/examples/image-slider/sample1.jpg)](http://www.netdreams.co.uk/)

[![Automatic Image Slider CSS jQuery](http://www.sohtanaka.com/web-design/examples/image-slider/sample2.jpg)](http://tutorial9.com/)

[![Automatic Image Slider CSS jQuery](http://www.sohtanaka.com/web-design/examples/image-slider/sample3.jpg)](http://radiumlabs.com/)

[![Automatic Image Slider CSS jQuery](http://www.sohtanaka.com/web-design/examples/image-slider/sample4.jpg)](http://www.bigspaceship.com/)

[![Automatic Image Slider CSS jQuery](http://www.sohtanaka.com/web-design/examples/image-slider/sample5.jpg)](http://electricpulp.com/)