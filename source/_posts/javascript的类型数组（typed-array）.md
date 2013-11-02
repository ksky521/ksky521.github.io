title: "javascript的类型数组（Typed Array）"
id: 1112
date: 2013-01-05 05:59:29
tags:
- javascript
categories:
- 前端开发
---

在《[javascript canvas图片像素](/2013/01/02/html5-canvas-%E5%9B%BE%E7%89%87%E5%83%8F%E7%B4%A0/)》中提到了类型数组（Typed Array），javascript这是一种快速操作二进制数据的解决方案。

随着web发展和html5的推进，javascript来处理音视频、二进制文件和网络协议等都成为了可能，这时候原生的数组Array已经不能够满足需求，需要一种快速操作二进制流的东东产生，于是ArrayBuffer类型和Typed Array诞生了。

## 类型数组介绍
类型化数组类型表示可编制索引和操纵的[ArrayBuffer](http://www.javascripture.com/ArrayBuffer)对象的各种识图。所有数组类型的长度固定不变。如下表所示：

 名称 | 大小（以字节为单位） | 说明
 ---- | ------------------- | ---
Int8Array | 1 | 8 位二补码有符号整数
Uint8Array | 1 | 8 位无符号整数
Int16Array | 2 | 16 位二补码有符号整数
Uint16Array | 2 |16 位无符号整数
Int32Array | 4 | 32 位二补码有符号整数
Uint32Array | 4 |32 位无符号整数
Float32Array | 4 | 32 位 IEEE 浮点数
Float64Array | 8 |64 位 IEEE 浮点数

<!--more-->
多个类型的数组视图可以指向一个ArrayBuffer，例如下面的代码：
```javascript
// 创建一个16字节的ArrayBuffer
var arrayBuffer = new ArrayBuffer(8);
//创建一个8位无符号整形类型数组
var u8 = new Uint8Array(arrayBuffer);
//16 位类型数组
var u16 = new Uint16Array(arrayBuffer);
//32为类型数组
var u32 = new Uint32Array(arrayBuffer);
```
所以 u8、u16 、u32 指向同一块 8 字节长度的内存，因此 u8 有8 个元素，u16 有4个元素，u32 则只有2个元素。

那么改变其中一个其他两个也跟着变（类似引用类型的数据，占用同一地址的内存）：
```javascript
[1,2,3,4,5,6,7,8].forEach(function(v,i){
    u8[i] = v;
})
console.log(u8,u16,u32);
```
需要注意的是，类型数组中每个值都是number类型的数据，是不允许出现字符串的。出现会采用隐性类型转换成0或者number，跟+号转换一样，但是要注意溢出问题！例如：8位数值范围为0~255（2^8），超出范围就溢出了
![](file:///C:/Users/theowang/AppData/Local/youdao/ynote/images/A2048DB4463940BF9576D2C9B5DEFE5D/1.jpeg)

## 类型数组优点

### 优秀的性能

类型数组的提出就是来解决二进制数据访问操作的问题，所以类型数组比传统的数组要快很多，具有良好的性能。这是因为类型数组实际上是作为一个固定的内存块来进行访问，而传统的javascript数组使用的是hash查找方式。

### 二进制支持

我们知道html5有很多api是跟二进制密切相关的，例如音频视频、文件和websocket。而且XMLHttpRequest Level 2 已经可以指定文件responseType来制定arraybuffer等类型

## 类型数组的作用

这样我们可以做下面的事情：

* javascript处理图片和音频
* javascript读取二进制文件
* javascript压缩二进制文件
* javascript转换文件为二进制然后传输

这么来看js无敌了……

目前想到的，js可以通过FileReader读取文件，然后转换成二进制，最后再次上传。或者：FileReader读取图片，canvas进行图片压缩，使用toDataURL（或者imageData）进行图片压缩，然后上传，这样在手机端可以减少流量，提高速度。

另外在通信方面，可以实时转换成二进制进行socket通信。希望我说的这些都不是天方夜谭，但是实践中肯定会有很多问题

### 参考内容：

* [http://www.javascripture.com/](http://www.javascripture.com/)
* [http://blog.csdn.net/hfahe/article/details/7421203](http://blog.csdn.net/hfahe/article/details/7421203)
* [http://www.cnblogs.com/ecalf/archive/2012/11/25/2787219.html](http://www.cnblogs.com/ecalf/archive/2012/11/25/2787219.html)
* [http://blog.n01se.net/blog-n01se-net-p-248.html](http://blog.n01se.net/blog-n01se-net-p-248.html)
