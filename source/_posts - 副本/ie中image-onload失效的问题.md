title: "IE中Image.onload失效的问题"
id: 501
date: 2010-03-08 16:43:02
tags: 
categories: 
- JavaScript
- 网络技术
---

最近在做wBox开发中，需要做一个图片的幻灯片效果，为了方便加载速度，我使用了**new Iamge**的对象方法来**预加载图片**，当图片onLoad就运行一个函数来计算图片的大小尺寸，进行[jQuery动画](http://js8.in/451.html "jQuery easing动画效果扩展")，以及切换图片src，在firefox下开发完成后，可是到了IE下进行调试总是不会触发**onload**事件，不管是IE8、IE7还是万恶的IE6，都不会触发onload事件，我很迷惑，后来在google上找到了**解决**的方法：一下为引用部分

最初的代码如下：
<pre lang="javascript">var img = new Image;
img.src = "test.gif";
img.onload = function(){
    alert ( img.width );
};</pre>
这段代码看着没什么问题，但是为什么onload没有被IE调用呢？因为IE会缓存图片，第2次加载的图片，不是从服务器上传过来的，而是从缓冲区里加载的。是不是从缓冲区里加载的图片就不触发onload事件呢？我于是我测试了以下代码，成功了～
<pre lang="javascript">var img = new Image;
img.onload = function(){
    alert ( img.width );
};
img.src = "test.gif";</pre>
我把onload写到前面去，先告诉浏览器如何处理这张图片，再指定这张图片的源，这样就正常了。所以，不是IE没有触发onload事件，而是因为加载缓冲区的速度太快，以至于没有运行到img.onload的时候，onload事件已经触发了。这让我想到了Ajax，我们在写xmlhttp的时候，都是先指定onstatechange的回调函数，然后再send数据的，道理是一样的。