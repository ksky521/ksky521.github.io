title: "用Node抓站（二）：Promise使代码更优雅"
date: 2017-08-14 16:59:26
tags:
- 抓取
- Promise
- Node
categories:
- 前端开发
---

> 本文主要目的是通过抓取「电影天堂」的最新电影名称和下载地址，展现如何抓取列表之后，继续抓取正文内容


使用《用Node抓站（一）》（没看过的可以翻看下本公众号的历史文章）当中写的`spider.js` 代码可以直接用下面的代码把列表抓出来：
```js
var spider = require('../lib/spider')

spider({
  url: 'http://www.dytt8.net/index.htm',
  decoding: 'gb2312'
}, (err, data, body, req) => {
  if (!err) {
    console.log(data)
  }
}, {
  items: {
    selector: '.co_area2 .co_content2 ul a!attr:href'
  }
})
```

这里不同的是涉及到一个编码问题，「电影天堂」用的是`gb2312`编码，需要转成`utf8`，不然抓的内容会乱码。我扩展了`request`模块的参数增加了`decoding`：因为`encoding`被占用了，而且为了转码方便，我将`encoding`设为`null`，这样出来的数据就是`Buffer`，可以直接用`iconv-lite`之类的进行转码，涉及到编码问题不是本文讨论内容，就不多说了。

抓取列表后，发现title是被截断的，也要在正文页面抓取一下；继续写抓取下载地址和电影title的代码：
```js
spider({
  url: 'http://www.dytt8.net/index.htm',
  decoding: 'gb2312'
}, (err, data, body, req) => {
  if (!err) {
    if (data && data.items) {
      var urls = data.items
      urls.forEach(function (url) {
        url = 'http://www.dytt8.net' + url
        spider({url: url, decoding: 'gb2312'}, (e, d) => {
          if (!e) {
            console.log(d)
          }
        }, {
          url: {
            selector: '#Zoom table td a!text'
          },
          title: {
            selector: '.title_all h1!text'
          }
        })
      })
    }
  }
}, {
  items: {
    selector: '.co_area2 .co_content2 ul a!attr:href'
  }
})
```

看上去挺简单的，但是回调好多啊。。。

处理这种异步回调可以使用Promise！

<!--more-->
## Promise
Promise是CommonJS提出来的这一种规范，有多个版本，在ES6当中已经纳入规范，原生支持Promise 对象，非ES6环境可以用类似Bluebird、Q这类库来支持。

Promise可以将回调变成链式调用写法，流程更加清晰，代码更加优雅。

简单归纳下Promise：三个状态、两个过程、一个方法，3-2-1

* 三个状态：pending、fulfilled、rejected
* 两个过程：
    * pending→fulfilled（resolve）
    * pending→rejected（reject）
* 一个方法：then

当然还有其他概念，比如：`catch`、`Promise.all/race`这里就不展开了。

## 代码的Promise改造
了解了Promise之后，先把`spider.js`改成Promise的

```js
return new Promise((resolve, reject) => {
  opts.callback = function (error, response, body) {
    if (!error) {
      body = iconv.decode(body, opts.decoding || 'utf8')
      // 处理json
      try {
        body = JSON.parse(body)
      } catch (e) {
      }
      var data = parser(body, handlerMap)
      callback(error, data, response)
      resolve(data, response)
    } else {
      callback(error, body, response)
      reject(error)
    }
  }
  request(opts)
})
```
这里`Promise`是个类，接受一个函数，函数参数是两个函数：`resolve`和`reject`，当成功的时候`resolve(结果)`，当失败的时候`reject(原因)`

完成`spider.js`改造之后，使用`spider`抓取代码变成了下面这样：
```js
spider({
  url: 'http://www.dytt8.net/index.htm',
  decoding: 'gb2312'
}, {
  items: {
    selector: '.co_area2 .co_content2 ul a!attr:href'
  }
}).then(function (data) {
  // 第一页成功
  if (data && data.items) {
    var urls = data.items
    urls.forEach(function (url) {
      url = 'http://www.dytt8.net' + url
      // 遍历开始抓取第二页面
      spider({url: url, decoding: 'gb2312'}, {
        url: {
          selector: '#Zoom table td a!text'
        },
        title: {
          selector: '.title_all h1!text'
        }
      }).then((d) => {
        console.log(d)
      })
    })
  }
})
```

上面的代码能够实现需求，但是没有充分利用`Promise`的链式写法，还是出现了回调，没有专注程序流程，看上去还是乱糟糟的。

## `Promise`的链式调用
提到链式调用，最多的是`jQuery`的写法：`$(document).click(handler).addClass()….`。

这里简单代码实现一个可以链式调用的类，方便大家举一反三：

```js

class M {
  constructor (number) {
    this.number = number
  }
  add (n) {
    this.number += n
    return this
  }
  sub (n) {
    this.number -= n
    return this
  }
  result () {
    return this.number
  }
}

var m = new M(1)
m.add(2).sub(3).result()
```

在Promise中，每个`then`或者`catch` 返回的都是一个Promise对象，所以可以继续用`then`/`catch`，而且每次`then`都是上一次`then`的`return`结果，如果没有`return`那么就是`undefined`，例如下面：
```js
var resolve = Promise.resolve(1)

resolve.then((d) => {
  console.log(`第1个：${d}`) // 1
}).then((d) => {
  console.log(`第2个：${d}`) // undefined
})
```
而如果`return` 则是`return`后的结果：
```js
var resolve = Promise.resolve(1)

resolve.then((d) => {
  console.log(`第1个：${d}`) // 1
  return 2 // 2
}).then((d) => {
  console.log(`第2个：${d}`) //2
})
```
上面的代码和下面的代码实现一样，建议每个`then`都返回一个Promise对象
```js
var resolve = Promise.resolve(1)

resolve.then((d) => {
  console.log(`第1个：${d}`)
  return Promise.resolve(2)
}).then((d) => {
  console.log(`第2个：${d}`)
})
```

了解了上面的知识之后，我将整个流程划分为三部分：获取列表`fetchList`，处理列表数据`dealListData`和获取正文内容`fetchContents`

然后将三个相互关联串行的流程，通过`then`串联起来：
```js
fetchList().then(dealListData).then(fetchContents).then((d) => {
  console.log(d, d.length)
}).catch((e) => {
  console.log(e)
})
```

再来看下特殊处理的`fetchContents`，因为传进来的是一堆需要抓取的正文页面的url，如果我们使用`Promise.all`这个方法，其中一个正文页面抓取失败，就会导致Promise都`rejected`，则后续`then`都失败，**Promise状态只会改变一次，而且回调只会执行一次**。我们的需求是正文页面一个抓取失败不要紧，其他的页面继续抓取。所以特殊处理下：

```js
function fetchContents (urls) {
  return new Promise((resolve, reject) => {
    var count = 0
    var len = urls.length
    var results = []
    while (len--) {
      var url = urls[len]
      count++
      spider({url: url, decoding: 'gb2312'}, {
        url: {
          selector: '#Zoom table td a!text'
        },
        title: {
          selector: '.title_all h1!text'
        }
      }).then((d) => {
        results.push(d)
      }).finally(() => {
        count--
        if (count === 0) {
          resolve(results)
        }
      })
    }
  })
}
```

## 总结
本文通过抓取「电影天堂」下载地址的实例，粗略的讲解了Promise的使用方法。后面抓取系列文章还会介绍怎么避免封IP等知识，敬请关注本公众号后续文章。

本文的完整代码，在github/ksky521/mpdemo/ 对应文章名文件夹下可以找到