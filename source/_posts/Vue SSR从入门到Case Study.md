title: "Vue SSR从入门到Case Study"
date: 2017-04-13 16:29:05
tags:
- Vue
- javascript
- Node
- SSR
categories:
- 前端开发
---

> 最近两个项目同时开发，使用了Vue2的SSR，这样后端渲染页面首屏可以加快页面呈现，增加SEO和用户体验，但是项目上线后却发现了严重的性能问题，于是在三天内两次重大调整，最后只能放弃Vue SSR，本文从Vue SSR实现开始，逐渐复盘整个事件。

两周前就预告了要写一篇Vue SSR的文章，但是没想到上周四上线之后，周六放量之后发现性能问题，这周一到周三，做了两次重大调整，最终还是放弃了SSR，并且做了这次事件复盘。

## 技术选型
调研Vue已经很久了，随着Vue2正式发布，使用Vue来做项目又燃起了希望，不是为了一时的技术理想和情怀（了解我的人都知道，我不是这样的人），主要是出于下面几方面考虑：

1. 用artTemplate+Sass+JS做的components方案已经做了很久了，沉淀了很多组件，随着Node服务开始上线，一直想在此基础上做同构，而公司Node框架Yog2的view层选择偏向于Smarty模板的Swig，修改比较麻烦
2. 既然改不了，那么要换不如直接选择新的components方案，这次最强烈需求是：组件化和支持SSR，而Vue2之后支持SSR
3. 这次两个项目同时进行，而且仅仅给两周的开发时间，组件化有效提高工作效率，可以把通用的组件抽象出来，多个页面之间业务组件复用率也很高，而且业务组件在后续的运营活动也可以直接复用
4. 手百产品形态复杂，页面即在手百内使用又有手百外使用，手百内页面被多个Webview隔开，不适合SPA形式，而手百外适合SPA形式，所以一套代码需要适配两种情况，Vue 可以适应这两种方式
5. Vue的SPA形式可以方便进行PWA和Hybrid改造（继续关注本公众号Hybrid系列）

所以，最后决定：上Vue！**技术栈：Vue2+Yog2**。

再介绍下两个项目：

* 项目A是老项目进行重构，产品需求要跟功能全部保留，架构跑通使用的是Vue2.1，所以A项目代码相对复杂，一直没有使用Vue2.2
* 项目B是新项目，开始使用Vue2.1，上线后发现已经有Vue2.2，于是升级Vue2.2，并且把项目目录结构调整一番，Webpack config等都可配

## Vue SSR入门到上线

先看下Vue SSR的实现流程图：

![](/uploads/2017/vue-ssr/1.jpg)

简单解释一下：

1. app.js是Server和Client公用的
2. webpack会根据server-entry.js和client-entry.js打包出来两个文件：server-bundle和client-bundle
3. server-bundle用于后端渲染（2.1是js文件，2.2变成json，引入更加方便）

但是这张图没有说明在调用API接口方面，前后端是怎么公用代码的。前端走的是Ajax请求，后端走的是http请求（百度内部是RAL接口服务管理），结合上图补充完整的代码执行流程图如下：

![](/uploads/2017/vue-ssr/2.jpg)

<!--more-->

### webpack区分接口请求方式
在浏览器内使用ajax请求，而在服务端需要调用内部API请求或者直接读取存储（RAL）。ajax请求到达服务端依次经过：action层、model层，最后走到还是API请求或者读取数据（这里重点读三遍。。）。

这里我们将服务端和客户端API的请求方法写在不同的文件内，但是封装暴漏的接口都是一样的（接口模式）。在webpack里面，针对server和client提供不同的alias：

![](/uploads/2017/vue-ssr/3.jpg)
![](/uploads/2017/vue-ssr/4.jpg)


这样`require(‘api/demo’)`的时候，会区分开server和client。

server内直接使用yog2 modal内的获取数据方法，比如：
![](/uploads/2017/vue-ssr/5.jpg)


而client内，直接使用ajax请求：
![](/uploads/2017/vue-ssr/6.jpg)


### Vue内使用Vuex来获取数据

即下图的流程：

![](/uploads/2017/vue-ssr/7.jpg)

在渲染的时候，prefetch阶段通过dispatch触发Store的Action（Action内允许异步），Action内调用`api/demo` 获取数据成功后commit mutation，这样整个数据就跑通了。

### server.js
server.js是第一次渲染使用的入口action，核心代码如下：

```js
//vue2.2
const vueServerRender = require('vue-server-renderer');
const bundle = require('../vue-ssr-bundle.json');
const renderer = vueServerRender.createBundleRenderer(bundle, {
    template: '<!--vue-ssr-outlet-->',
    cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
    })
})
// 先渲染tpl(swig模板)，内容类似vue ssr demo的index.html
// 这里渲染使用chunk，先输出不依赖数据的头部html
res.render('page/index.tpl', { isSendSpeedCode }, (err, html) => {
    if (!err) {
        var htmls = html.split('<!--vue-ssr-outlet-->')
        //先渲染头部html
        res.write(htmls[0])

        // swig渲染时间
        var time1 = Date.now()
        const renderStream = renderer.renderToStream(context)
        renderStream.on('data', chunk => {
            // 边解析，边渲染html
            res.write(chunk)
        })
        renderStream.on('end', () => {

            if (isSendSpeedCode) {
                // 统计vue 渲染时间
                var time2 = Date.now()
                var code = `
                    <script>if(window.alog){
                        alog('speed.set', 'p_swig', ${time1 - time0});
                        alog('speed.set', 'p_vue', ${time2 - time1});
                    }</script>
                `
                res.write(code)
            }
            // 渲染尾部html
            res.end(htmls[1])
        }).on('error', errorHandler)
    } else {
        errorHandler(err)
    }
})
```

### Webpack和FIS3两次编译
webpack是vue「全家桶」的后遗症，项目太急没办法去掉。我们项目的目录结构如下：
![](/uploads/2017/vue-ssr/9.jpg)

项目需要两次打包：

1. 第一次是webpack，webpack把`vue-src`文件夹内容根据`server-entry`和`client-entry`打包出来，分别放进yog2的client和server对应的文件，之后`vue-src`在执行环境就不需要了
2. 第二次是FIS3的打包，会按照Yog2的规范release出来可以上线的内容

> 这里有个细节：webpack打包出来的静态资源路径需要跟FIS3打包的静态资源路径一致，不然就没法通过FIS3进行静态资源定位，比如替换为CDN地址。
> 由于vue2.2打出来的server-bundle是json格式文件，所以FIS无法将json内的静态资源进行统一管理，需要webpack判断生产环境直接替换为CDN地址


### 遇见的其他问题和技巧

#### client代码在server上跑
手百的通用库Bdbox是client代码，代码中有一些`window`全局变量的使用，而我们知道Node是没有`window`的，在Node执行SSR的时候，会报错，比如下面的代码：

```js
// 自执行
isAndroid: /(Android);?[\s\/]+([\d.]+)?/.test(navigator.userAgent)
```
有两种改法：

1. 把`.isAndroid`由属性变成方法：`.isAndroid()`，放到`mount`内执行
2. 给vue-server-renderer传入带有`navigator.userAgent`的context

#### 利用resolve.alias
目录结构深了，尤其是Vue里面还需要调用yog model的代码，会各种`../../`很蛋疼，可以利用alias简化写法：

![](/uploads/2017/vue-ssr/0.jpg)


需要注意的是`static`的写法是：`<img src=“~static/img/logo.png”`

#### 利用Yog2 的 Mock功能进行测试
订好接口请求参数和返回数据格式之后，后端RD进行API的编写同时，我们可以利用Yog2的Mock功能，对ral返回的数据进行假数据测试，实现后端和前端RD解耦，大大提高开发效率。

## Vue SSR从上线到Case Study
现在来复盘下整个事件：

1. 4月5日，完成代码开发，全功能提测，开始倒腾上线，晚上第一次上线成功，基本功能回归没问题，
2. 紧接着几次bug修复上线，6号周四上线日，基本没有问题了
3. 4月7日开始APP审核通过，放量开始，这时候发现随着流量上升，服务器扛不住了
4. 8日（周六）紧急添加实例，周末算是硬扛过去了
5. 10（周一）排查原因，发现内存可能存在泄漏和性能问题，增加打点统计后端渲染时间，但是VM相对来说是黑盒，性能不好排查
6. 11日（周二）增加lru-cache，细化组件缓存，下午上线后，晚上发现内存曲线更加严重，于是晚上10点回滚lru和组件缓存代码，随版本收敛影响，流量继续上涨，增加机器实例
7. 12日（周三）采取降级方案，第一次进入页面将API数据放到以变量形式放到页面，然后增加beforeCreate阶段代码，将页面数据直接commit给mutation进行渲染，曲线开始平缓
8. 13日（周四）观察一晚曲线没有问题，中午开始缩容（下线实例）

从周一到周三经过两次大的调整，终于服务稳定了，其中代码review阶段，我们也发现了很多代码不规范的现象。下面来说下我们使用vue ssr的一些压测等数据。

### 单实例QPS、内存和CPU数据

从上线之后，内存积累到一定时间就飙升，内存飙升同时，CPU也进行飙升，具体曲线如下：

![](/uploads/2017/vue-ssr/11.jpg)
![](/uploads/2017/vue-ssr/12.jpg)


从12日（周三19点）上线之后，就开始平稳了，13日中午缩容后，CPU稍有上扬。

同期QPS的数据如下：
![](/uploads/2017/vue-ssr/13.jpg)

可见，qps并没有多少，而且闲事都不超过10qps，但是内存一直积累上升。而当13日（周四中午）缩容之后，QPS已经开始上升到30，从同期CPU和内存来看，并没有任何压力~


> 至于为什么会出现这种情况，经过线下实验观察，压测过程中，内存达到GC的极限后就开始回收，这个时间点和曲线一致。

### ab压测数据
同一个实例，1内核4G内存，采用20个并发，请求1000次来做压力测试

**对于使用Vue SSR的程序：**
![](/uploads/2017/vue-ssr/14.jpg)

**对于不使用Vue SSR，但是后端数据获取后吐在页面的程序：**
![](/uploads/2017/vue-ssr/15.jpg)


从数据来看，Vue SSR 20个并发的时候每秒请求、响应时长等数据已经很不好了，而非Vue SSR还是很不错的，同时观察同期内存和CPU数据，可见非Vue SSR还可以继续压下去，而Vue SSR去出现了峰值陡升。

**再看看Nuxtjs的表现**
在我的air笔记本上面，用Nuxt的demo进行本机压测（1000次，20并发），数据如下：
![](/uploads/2017/vue-ssr/16.jpg)


### Vue SSR时间数据

10日上线SSR抽样统计数据来看，数据一直在230ms~250ms之间波动，而抛出后端接口请求时间，大概70ms，渲染时间在150ms+，挺不理想的。
![](/uploads/2017/vue-ssr/17.jpg)


### 总结
Vue SSR肯定要比纯字符串模板渲染要慢，从数据来看，SSR性能却太离谱，而且因为采用vm的方式执行，存在一定的内存泄漏（具体原因还在研究），建议去掉vm之后再测试。

至于组件缓存，我们增加之后，因为lru-cache本身就是内存缓存，内存回收更加频繁

## 简单介绍下降级方案
降级策略是：保证前端使用vue代码，将第一次数据由node在后台获取，然后吐在页面`window._INIT_DATA_`，将数据抛给store使用。

数据抛给store方案有两种：

1. 修改前端fetch库（ajax）发起ajax之前判断数据已经有了，则直接使用
2. view组件内增加`beforeCreate`时机，将数据提交给store

## case study总结
1.	从产品需求出发，做技术要循序渐进，别一次「加满」
2.	做技术不要人云亦云，适合自己的就是最好的
3.	后端新项目做好压测！！做好预案！！
