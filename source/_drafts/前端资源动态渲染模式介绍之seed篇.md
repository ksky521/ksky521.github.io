title: 前端资源动态渲染模式介绍之seed篇
date: 2016-07-24 16:59:26
tags:
- 资源管理
- 渲染模式
categories:
- 前端开发
---

前面两篇文章介绍了combo模式，今天重点介绍下seed模式，seed模式是一种利用js动态解析页面模块依赖，而且结合localstorage和combo 服务，实现的一种速度更快的加载方式。

## seed模式特点
* 结合打包工具，实现页面依赖管理，seedjs不需要维护整站（整个项目）的resourcemap，combo需要使用后台语言维护`map.json`
* 结合localstorage，将模块缓存到ls，方便全站（单域名）下公用，下载过模块避免二次请求
* 对于更新的，没有下载过的模块，拼成combo url，一次加载，避免多次请求

## 如何实现seed模式

### 对`define`函数进行改造
首先对`define`函数进行改造，增加参数传入md5：`define(id, factory, md5)` ，使其将factory源码和版本号存入localstorage，文件的md5值，可以结合打包工具实现，fis中的`file`对象有个方法是`file.getHash()` 可以获取md5值，这个值还需要存入`resourcemap`，用于比较缓存中的version和下发的`resourcemap`是否一致，如果不一致则需要重新拉最新版本。

localstorage中缓存的内容是factory的源码，加上version(hash)：
```js
//代码示例如下
//找到resourcemap中的id
var map = resouceMap[id];
//拼缓存的数据
var content = {
    version: map.hash,
    //code是factory的内容
    code: factory.toString()
}
localStorage[id] = JSON.stringify(content)
```

### 对`resourcemap`的改造
这个很简单，增加个字段：`hash`

| 字段 | 值|
|---| ----|
| id | 唯一id|
| uri| 线上cdn完整url|
| hash| 文件md5|
|deps | 依赖的模块 |

### 对文件进行改造
为了防止每个页面都是用全局的`resourcemap`（fis的map.json），对于单个页面文件需要输出自己的依赖关系表`resourcemap`，减少页面的大小，这部分工作也是通过打包工具实现的。

打包工具将每个页面的依赖关系遍历出来，然后输出到每个页面，例如fis3的做法是：http://fis.baidu.com/fis3/docs/lv3.html#%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E6%98%A0%E5%B0%84%E8%A1%A8

### 对`require`函数的改造
`require`函数是获取模块依赖关系，没有的则加载模块，优先加载依赖的模块，等依赖模块加载完毕后，再遍历向上加载，保证模块代码执行的时候，该模块依赖的模块都已经加载完毕。

在seed模式中，`require`发现一个模块没有执行，需要加载之前，应该先去localstorage中读取代码，如果有这个模块的代码，并且`version`跟`resourcemap`的值一致，那么就可以不加载，直接将localstorage的代码拼成`define`函数执行，如果version不一致或者localstorage中不存在require的模块id缓存，那么就收集该模块在`resourcemap`中的uri，等到依赖遍历完毕后，拼成combo url，一次性加载，避免挨个加载等候回调的窘相。

```js
//执行ls中的模块代码如下
//如果在ls中，需要校验依赖是否都已经defined
var mod;
if (ls && (mod = ls[id])) {
    mod = JSON.parse(mod);
    var childHash = map.hash;
    //mod.v就是version
    if (childHash && mod.code && mod.v === childHash) {
        var s = document.createElement('script');
        s.appendChild(document.createTextNode('Bdbox.define("' + id + '",' + mod.code + ')'));
        document.head.appendChild(s);
    }
}
```

### 流程图如下

![seed模式流程图](/img/posts/seed.png)
