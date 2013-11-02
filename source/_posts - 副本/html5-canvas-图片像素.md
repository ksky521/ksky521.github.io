title: "html5 canvas 图片像素"
id: 1101
date: 2013-01-02 21:36:00
tags:
- canvas
- html5
categories:
- 前端开发
---

## html5 canvas图像转换成数组

html5的canvas可以进行图片处理，图片是由像素组成的。我们知道canvas有方法`getImageData`，返回的对象中可以取出，image的data 数组（类似数组的Type Array类型数组，Uint8ClampedArray）。

假设canvas宽高是500*400，那么应该有200000个像素点，而通过`getImageData().data`获取的data数组的`length`是800000。

我们还知道rgba表示颜色的方法：
* r=red
* g=green
* b=blue
* a=alpha

即红绿蓝三原色和透明值。

所以这个data数组是每四个数组值代表一个像素点。这样一来，一个图像就转化成了数据表示的数组。如下面的代码：
```javascript
var canvas = document.getElementById('canvas');
var ctxt = canvas.getContext('2d');
var img = new Image;
img.onload = function(){
    ctxt.drawImage(img, 0, 0);
    var data = ctxt.getImageData(0, 0, 480, 480).data;
    console.log(data, data.toString());
}
img.src = 'img/pic.jpg';
```

## 图像数组的遍历

如上面的代码，我们可以看到数组data就是图片转换成的数组，那么遍历这个数组就可以取得图片的像素点内容：
```javascript
var data = ctxt.getImageData(0, 0, 480, 480).data;
for(var i =0,len = data.length; i<len;i+=4){
    var red = data[i],
    green = data[i+1],
    blue = data[i+2],
    alpha = data[i+3];

}
```
<!--more-->

## 图片颜色反转

颜色反转的算法就是三原色求反，即255-原色。所以有了下面的方法：
```javascript
function draw(img){
    ctxt.clearRect(0, 0, 480, 480);
    // console.log(img);
    ctxt.putImageData(img,0,0);
}
function invert(){
    var back = ctxt.createImageData(480, 480);
    var arr = back.data;

    for(var i=0,len = data.length;i<len;i+=4){
        var red = data[i],
        green = data[i+1],
        blue = data[i+2],
        alpha = data[i+3];

        arr[i] = 255-red;
        arr[i+1] = 255-green;
        arr[i+2] = 255-blue;
        arr[i+3] = alpha;
    }
    return back;
}
//颜色反转
draw(invert());
```

## 颜色一些算法

###去色

把图片变成黑白图，只要把每个像素的R、G、B设为亮度（Y）的值就行了。

关于R、G、B、Y的关系可以看到这里看看，这里只要记住这条公式：`Y = 0.299R + 0.587G + 0.114B`，使用位：`(R* 4899 + G * 9617 + B* 1868 + 8192) >> 14`，速度会快

### 反相（反转）

就是将一个颜色换成它的补色。

补色就是用255（8位通道模式下，255即2的8次方，16位要用65535去减，即2的16次方）减去它本身得到的值：`R(补) = 255 – R`。


其他算法需要基色和混合色配合可以参考：http://wenku.baidu.com/view/275f9c4769eae009581bec56.html
