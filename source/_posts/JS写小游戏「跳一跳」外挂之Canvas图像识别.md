title: "JS写小游戏「跳一跳」外挂之Canvas图像识别"
date: 2018-01-06 23:25:54
tags:
- Nodejs
- 游戏
- 练手
categories:
- 前端开发
---

17年结尾的时候微信发布新版重点推出了「小游戏」概念，H5的游戏再次火了起来，新版微信开屏的游戏就是「跳一跳」游戏可玩度很高，网上也出现了各种语言版本的外挂，前几天看到一篇用nodejs搭建的外挂，需要手动点击截屏图片来判断当前和下一步的位置然后跳转，于是就起了用Canvas来实现图像的想法，后面有实现了自动跳转，算是齐活了。今天来完整说下图像识别。

> 代码都放到了：https://github.com/ksky521/wechat-jump-game-hack 欢迎自己去尝试


先来看最终效果视频：[https://v.qq.com/x/page/o1331igmskh.html](https://v.qq.com/x/page/o1331igmskh.html)

## Canvas图像处理的原理

Canvas可以通过`drawImage`在上面添加图片，然后通过`getImageData`方法获取一个`imageData`对象，此对象包括了`data`、`width`和`height`，其中data为图片width*height*4长度的数组，每个像素点表现在数组内为：RGBA四个0~255的值，即Red、Green、Blue和Alpha值。

通过对这个`imageData.data`进行遍历操作，可以利用图像差值比较找出图片内物体的边缘、物体的中心点，也可以根据图像中某个固定颜色范围的物体，进行匹配，从而找到「小人」的位置。

## 颜色值差值比较函数
先介绍一个函数`tolerenceHelper`，用来比较颜色差值，即传入需要比较的`r`、`g`和`b`，然后跟对比的`rt`、`gt`、`bt`和差值范围的`t`进行对比的函数，在范围内则返回`true`。

```js
function tolerenceHelper(r, g, b, rt, gt, bt, t) {
    return r > rt - t && r < rt + t 
            && g > gt - t && g < gt + t 
            && b > bt - t && b < bt + t;
}
```

## 获取小人当前位置
小人获取位置用的方式是差值比较，首先通过截屏中的紫色小人颜色范围，可以大致拿到小人的颜色值为：

```js
// 小人的颜色值
const playerR = 40;
const playerG = 43;
const playerB = 86;
```

<!--more-->


这个值可以从小人的底部中心取色得到。所以找到小人的底部中心点的方式就是，在一定范围内（即`tolerenceHelper`的t参数，这里取值为16）查找，如果像素点rgb在这个范围内，则加入待选，最后像素点集合中最低点（最大y）的位置就是小人底部中心所在点的y，x为最大和最小宽度的中心位置。为了好理解，我画了图：

![](/img/posts/jump-game/1.png)


下面三图是`t=16`、`t=26`、`t=36`分别识别的效果，为了便于分辨，我将匹配到的像素点颜色都设置为了红色（rgb=255，0，0）。
![](/img/posts/jump-game/2.png)
![](/img/posts/jump-game/3.png)
![](/img/posts/jump-game/4.png)

为了准确，防止相近颜色的干扰`t=16`就够用了，这样小人的底部位置`pos`就得到了：

```js
// x, y
pos[0] = Math.floor((maxX + minX) / 2);
pos[1] = maxY;
```

### 优化
很容易一眼就看出来小人不能在图片的顶部和底部，而是在画面的中心区域范围内，所以可以直接从图片高度的`height/4`~`height*3/4`的范围内查找，这样可以提高不必要的工作量。

### 完整查找小人点代码如下
```js
function getCurCenter(data, width, height) {
    // 小人的颜色值
    const playerR = 40;
    const playerG = 43;
    const playerB = 86;

    let minX = Infinity;
    let maxX = -1;
    let maxY = -1;
    // 找到小人当前的底部位置
    let pos = [0, 0];

    let startY = Math.floor(height / 4);
    let endY = Math.floor(height * 3 / 4);
    for (let x = 0; x < width; x++) {
        for (let y = startY; y < endY; y++) {
            let i = y * (width * 4) + x * 4;
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            if (y > pos[1] && tolerenceHelper(r, g, b, playerR, playerG, playerB, 16)) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }
    pos[0] = Math.floor((maxX + minX) / 2);
    pos[1] = maxY;
    // console.log(`player position (x, y)= (${pos[0]}, ${pos[1]})`);
    return pos;
}
```

## 获取的跳转位置
怎样获取小人下一步跳转的位置呢？

按照上面的逻辑，我们还是从图片高度的`height/4`~`height*3/4`的范围查找，这是我们先取出当前的背景色，然后在高度范围内扫描图片，当出现跟背景色相差很大的第一个点时，这时候就是下一个物体的主颜色值了！如果为四边体之类的，则这个点就是顶点了！

知道这个物体的主体颜色值，我们就可以以这个值为基准继续扫描，在这个颜色值范围的像素点就是物体的顶面，然后根据顶面像素点坐标`minY`和`maxY`得到中心点的坐标（圆形和正方形都是对称的，所以都可以用这个方法）。

看图理解下：

![](/img/posts/jump-game/5.png)

下图是将背景色涂红，这样就可以看到识别出来的第一个点就是顶点（圆形一样）

![](/img/posts/jump-game/6.png)
![](/img/posts/jump-game/7.png)


### 优化

1. 找到顶点之后，下一行肯定不是maxY，一次类推，可以大胆将Y的值增加60个像素，即从顶点往下的60个像素重新开始查找中心点；
2. 另外可以将Y的查找范围缩小到上一步找到小人的中心点Y值，即y取值为`height/4~Math.min(height*3/4, 小人中心Y)` ，这样即使maxY我们没有找到，也可以以小人为底取中心点，保证下一步的跳转位置尽量不会超出物体顶面范围。
3. 我们找的是maxY，所以只要出现了跟顶点像素点颜色一致（范围内）的点，这一行（坐标Y相同，X不同）就不需要查找了，因为查找也没有意义，Y值不变了，所以可以直接`break`出循环，进行下一个Y的查找

### 完整代码

```js
function getNextCenter(data, width, height, y = -1) {
    let startY = Math.floor(height / 4);
    let endY = Math.floor(height * 3 / 4);

    // 去除背景色
    let startX = startY * width * 4;
    let r = data[startX],
        g = data[startX + 1],
        b = data[startX + 2];
    let maxY = -1;
    let apex = [];
    let pos = [0, 0];
    // 保证从当前小人位置底部点往上
    endY = Math.min(endY, y);
    let endX = width;
    let gapCount = 0;
    for (let y = startY; y < endY; y++) {
        let find = 0;
        for (let x = 1; x < endX; x++) {
            let i = y * (width * 4) + x * 4;
            let rt = data[i];
            let gt = data[i + 1];
            let bt = data[i + 2];
            // 不是默认背景颜色
            if (!tolerenceHelper(rt, gt, bt, r, g, b, 30)) {
                if (apex.length === 0) {
                    if (!tolerenceHelper(data[i + 4], data[i + 5], data[i + 6], r, g, b, 30)) {
                        //椭圆形找中心，往后找30个像素点
                        let len = 2;
                        while (len++ !== 30) {
                            i += len * 4;
                            if (tolerenceHelper(data[i + 4], data[i + 5], data[i + 6], r, g, b, 30)) {
                                break;
                            }
                        }
                        x += len;
                    }
                    //找出顶点
                    apex = [rt, gt, bt, x, y];
                    pos[0] = x;
                    // 减少循环范围
                    endX = x;
                    break;
                } else if (tolerenceHelper(rt, gt, bt, apex[0], apex[1], apex[2], 5)) {
                    //存在顶点了，则根据颜色值开始匹配
                    maxY = Math.max(maxY, y);
                    find = x;
                    break;
                }
            }
        }
        if (apex.length !== 0 && !find) {
            gapCount++;
        }
        if (gapCount === 3) {
            break;
        }
    }
    pos[1] = Math.floor((maxY + apex[4]) / 2);
    // console.log(points_top, points_left, points_right);
    console.log(`next position center (x,y)=${pos[0]},${pos[1]}`);
    return pos;
}
```

## 最后
在整个测试的过程中，还尝试了其他的方式，比如先将边缘找出再找中心点，各种尝试，想练手的可以直接改下看看。

为了调试方便，我将这部分代码单独一个router，可以直接github clone下来代码访问`localhost:3000/test` ，然后边改边尝试边看效果。

本篇文章介绍了怎么识别出来图片中「小人」和下一个跳转的位置，下一篇介绍下怎么让「小人」自动跳转过去，敬请期待。

