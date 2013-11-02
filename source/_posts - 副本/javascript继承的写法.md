title: "javascript继承的写法"
id: 698
date: 2011-06-20 04:38:21
tags: 
categories: 
- JavaScript
- web前端开发
---

严格来说**javascript**是基于对象而不是面向对象的语言，因为javascript没有像java语言那么丰富的类、继承、封装，但是javascript是基于原型（prototype）的面向对象开发，是一种动态、弱类型、基于原型的语言。前几天看了阿里UED的《重温**javascript继承**机制》，今天重新看了，很有感触，特地转载了重要的部分，记录一下，下次有需要的时候还要重新看一下！的确是不错的一篇文章。

### 继承的演变

#### 1、采用new关键字生成实例

处理表单验证这样简单功能脚本语言显然是不需要”继承”机制的，然而如果Javascript里面都是对象，就需要有一种办法来把所有对象联系起来。最后，Brendan Eich还是设计了”继承”。只是，他并没有引入”类”（class）的概念，因为一旦有了”类”，Javascript就是一种完整的面向对象编程语言了，
这好像有点太正式了，与设计初衷也远了，同时增加了初学者的入门难度。
参照到C++和Java语言都使用new命令来生成实例：

C++这样写：
> <pre lang="javascript">
> ClassName *object = new ClassName(param);</pre>
Java这样写：
> <pre lang="javascript">
> Foo foo = new Foo();</pre>
那么，也可以把new命令引入了Javascript，用来从原型对象生成一个实例对象。但是，**Javascript**中没有”类”的话，怎样表示原型对象呢？
依然是参照C++和Java使用new命令时，都会调用”类”的构造函数（constructor）。Brendan Eich简化了设计，在Javascript语言中，new命令后面跟的是构造函数，不再是类。
我们举个例子来说，现在有一个叫做WD构造函数，表示前端开发（web-developper）对象的原型。
> <pre lang="javascript">
> function WD(skill){
> 	this.skill = skill;
> }</pre>
对这个构造函数使用new关键字，就会生成一个前端开发对象的实例。
> <pre lang="javascript">
> var WD1 = new WD('html');
> console.log(WD1.skill); // html</pre>
在构造函数中的this关键字，它其实代表的是新创建的实例对象。

#### 2、new 出来对象的缺陷

采用new关键字，用构造函数生成实例对象无法共享属性和方法。
比如，在WD对象的构造函数中，设置一个实例对象的共有属性skill。
> <pre lang="javascript">
> function WD(skill){
> 	this.skill = skill;
> 	this.sex = '男';
> }</pre>
然后，生成两个实例对象：
> <pre lang="javascript">
> var WD1 = new WD('html');
> var WD2 = new WD('css');</pre>
这两个对象的skill属性是独立的，修改其中一个，不会影响到另一个。
> <pre lang="javascript">
> WD1.skill= 'Javascript';
> console.log(WD2.skill);//“css”，不受WD1的影响</pre>
每一个实例对象，都有自己的属性和方法的副本。这不仅无法做到数据共享，也是极大的资源浪费。

#### 3、引入prototype属性

为了实现属性和方法的共享，Brendan Eich决定为构造函数设置一个prototype属性。
这个属性包含一个对象（以下简称”prototype对象”），所有实例对象需要共享的属性和方法，都放在这个对象里面；那些不需要共享的属性和方法，就放在构造函数里面。
实例对象一旦创建，将自动引用prototype对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是本地的，另一种是引用的。
还是以WD构造函数为例，现在用prototype属性进行改写：
> <pre lang="javascript">
> function WD(skill){
> 	this.skill = skill;
> }
> 
> WD.prototype = { sex : '男' };
> 
> var WD1 = new WD('html');
> var WD2 = new WD('css');
> 
> console.log(WD1.sex); // 男
> console.log(WD2.sex); // 男</pre>
现在，sex属性放在prototype对象里，是两个实例对象共享的。只要修改了prototype对象，就会同时影响到两个实例对象。
> <pre lang="javascript">
> WD.prototype.sex = '女';
> console.log(WD1.sex); //女
> console.log(WD2.sex); // 女</pre>
由于所有的实例对象共享同一个prototype对象，那么从外界看起来，prototype对象就好像是实例对象的原型，而实例对象则好像”继承”了prototype对象一样。这就是Javascript继承机制的设计思想。

### 三、构造函数如何实现继承

现在有一个”MED”对象的构造函数（MED:Marketing Experience Design,营销体验设计）
> <pre lang="javascript">
> function MED(){
> 	this.aim = "营销体验设计";
> }</pre>
依然是”WD”对象的构造函数，
> <pre lang="javascript">
> function WD(skill,sex){
> 	this.skill = skill;
> 	this.sex = sex;
> }</pre>
怎样才能使”WD”继承”MED”呢？
<!--more-->

#### 1\. apply绑定构造函数实现

最简单的方法，大概就是使用call或apply方法，将父对象的构造函数绑定在子对象上，也就是在子对象构造函数中加一行：
> <pre lang="javascript">
> function WD(skill,sex){
> 
> 	MED.apply(this, arguments);
> 
> 	this.skill = skill;
> 	this.sex = sex;
> }
> 
> var WD1 = new WD("Html","男");
> console.log(WD1.aim); // "营销体验设计"</pre>

#### 2\. prototype模式实现

我们通常的做法是使用prototype属性。如果”WD”的prototype对象，指向一个MED的实例，那么所有”WD”的实例，就能继承MED了。
> <pre lang="javascript">
> WD.prototype = new MED();//我们将WD的prototype对象指向一个MED的实例。
> WD.prototype.constructor = WD;
> var WD1 = new WD("Html","男");
> console.log(WD1.aim); // 营销体验设计</pre>
这句
> <pre lang="javascript">
> WD.prototype = new MED();</pre>
相当于完全删除了prototype 对象原先的值，然后赋予一个新值。那么第二行又是什么意思呢？
> <pre lang="javascript">
> WD.prototype.constructor = WD;</pre>
原来，任何一个prototype对象都有一个constructor属性，指向它的构造函数。也就是说，WD.prototype 这个对象的constructor属性，是指向WD的。
我们在前一步已经删除了这个prototype对象原来的值，所以新的prototype对象没有constructor属性，需要我们手动加上去，否则后面的”继承链”会出问题。这就是第二行的意思。
注意，这是很重要的一点，编程时务必要遵守，下文都遵循这一点，即如果替换了prototype对象，
> <pre lang="javascript">
> o.prototype = {};</pre>
那么，下一步必然是为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数。
> <pre lang="javascript">
> o.prototype.constructor = o;</pre>

#### 3\. 从prototype直接继承实现

由于MED对象中，不变的属性都可以直接写入MED.prototype。所以，我们也可以让WD()跳过 MED()，直接继承MED.prototype。
现在，我们先将MED对象改写：
> <pre lang="javascript">
> function MED(){ }
> 
> MED.prototype.skill = "MED";</pre>
然后，将WD的prototype对象指向MED的prototype对象，这样就完成了继承。
> <pre lang="javascript">
> WD.prototype = MED.prototype;
> WD.prototype.constructor = WD;
> 
> var WD1 = new WD("Html","男");
> 
> console.log(WD1.skill); // MED</pre>
与前一种方法相比，这样做的优点是效率比较高（不用执行和建立MED的实例了），比较省内存。缺点是 WD.prototype和MED.prototype现在指向了同一个对象，那么任何对WD.prototype的修改，都会反映到MED.prototype。
所以，上面这一段代码其实是有问题的。请看第二行
> <pre lang="javascript">
> WD.prototype.constructor = WD;</pre>
这一句实际上把MED.prototype对象的constructor属性也改掉了！
> <pre lang="javascript">
> console.log(MED.prototype.constructor); // WD</pre>

#### 4\. 利用一个空对象作为中介来实现

由于”直接继承prototype”存在上述的缺点，所以可以利用一个空对象作为中介。
> <pre lang="javascript">
> var F = function(){};
> F.prototype = MED.prototype;
> 
> WD.prototype = new F();
> WD.prototype.constructor = WD;</pre>
F是空对象，所以几乎不占内存。这时，修改WD的prototype对象，就不会影响到MED的prototype对象。
> <pre lang="javascript">
> console.log(MED.prototype.constructor); // MED</pre>

#### 5.利用 prototype模式的封装函数

我们将上面的方法，封装成一个函数，便于使用。
> <pre lang="javascript">
> function extend(Child, Parent) {
> 
> 	var F = function(){};
> 
> 	F.prototype = Parent.prototype;
> 	Child.prototype = new F();
> 	Child.prototype.constructor = Child;
> }</pre>
使用的时候，方法如下
> <pre lang="javascript">
> extend(WD,MED);
> var WD1 = new WD("Html","男");
> console.log(WD1.aim); // 营销体验设计</pre>
这个extend函数就是YUI库如何实现继承的方法。

#### 6\. 拷贝继承实现

上面是采用prototype方式来实现继承。其实既然子对象会拥有父对象的属性和方法，我们直接采用”拷贝”方法也可以达到效果。简单说，如果把父对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？
首先，还是把MED的所有不变属性，都放到它的prototype对象上。
> <pre lang="javascript">
> function MED(){}
> 
> MED.prototype.aim = "营销体验设计";</pre>
然后，再写一个函数，实现属性拷贝的目的。
> <pre lang="javascript">
> function extendCopy(Child, Parent) {
> 	var p = Parent.prototype;
> 	var c = Child.prototype;
> 	for (var i in p) {
> 		c[i] = p[i];
> 	}
> }</pre>
这个函数的作用，就是将父对象的prototype对象中的属性，一一拷贝给Child对象的prototype对象。
使用的时候，这样写：
> <pre lang="javascript">
> extendCopy(WD, MED);
> var WD1 = new WD("Html","男");
> console.log(WD1.aim); // 营销体验设计</pre>

### 四、”非构造函数”的如何实现继承

比如，现在有一个对象，叫做”MED”–营销体验设计。
> <pre lang="javascript">
> var MED = {
> 	aim:'营销体验设计'
> }</pre>
还有一个对象，叫做”前端开发”。
> <pre lang="javascript">
> var WD ={
> 	skill:'html'
> }</pre>
请问怎样才能让”前端开发”去继承”营销体验设计”，就是说，我怎样才能生成一个”营销体验设计的前端开发”对象？
这里要注意，这两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现”继承”。

#### 1、object()方法

Json格式的发明者Douglas Crockford，提出了一个object()函数，可以做到这一点。
> <pre lang="javascript">
> function object(o) {
> 
> 	function F() {}
> 
> 	F.prototype = o;
> 
> 	return new F();
> }</pre>
这个object()函数，其实只做一件事，就是把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。
使用的时候，第一步先在父对象的基础上，生成子对象：
> <pre lang="javascript">
> var WD = object(MED);</pre>
然后，再加上子对象本身的属性：
> <pre lang="javascript">
> WD.skill = 'html';</pre>
这时，子对象已经继承了父对象的属性了。
> <pre lang="javascript">
> console.log(WD.aim); //营销体验设计</pre>

#### 2、浅拷贝

除了使用”prototype链”以外，还有另一种思路：把父对象的属性，全部拷贝给子对象，也能实现继承。
下面这个函数，就是在做拷贝：
> <pre lang="javascript">
> function LightCopy(p) {
> 	var c = {};
> 	for (var i in p) {
> 		c[i] = p[i];
> 	}
> 	//c.uber = p;
> 	return c;
> }</pre>
使用的时候，这样写：
> <pre lang="javascript">
> var WD = LightCopy(MED);
> WD.aim = '前端开发';</pre>
但是，这样的拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。
请看，现在给MED添加一个”技能”属性，它的值是一个数组。
> <pre lang="javascript">
> MED.skills = ['‘html’','css','Javascript'];</pre>
通过LightCopy()函数，WD继承了MED。
> <pre lang="javascript">
> var WD = LightCopy(MED);</pre>
然后，我们为WD的”技能”添加一个属性：
> <pre lang="javascript">
> WD.skills.push('teamwork');</pre>
发生了什么事？MED的”技能”也被篡改了！
> <pre lang="javascript">
> console.log(WD.skills); //‘html’,'Javascript','css','teamwork'
> console.log(MED.skills); //‘html’,'Javascript','css','teamwork'</pre>
所以，LightCopy()只是拷贝基本类型的数据，我们把这种拷贝叫做”浅拷贝”。这是早期jQuery实现继承的方式。

#### 3、深拷贝

所谓”深拷贝”，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用”浅拷贝”就行了。
> <pre lang="javascript">
> function deepCopy(p, c) {
> 	var c = c || {};
> 	for (var i in p) {
> 		if (typeof p[i] === 'object') {
> 			c[i] = (p[i].constructor === Array) ? [] : {};
> 			deepCopy(p[i], c[i]);
> 		} else {
> 			c[i] = p[i];
> 		}
> 	}
> 	return c;
> }</pre>
使用的时候这样写：
> <pre lang="javascript">
> var WD = deepCopy(MED);</pre>
现在，给父对象加一个属性，值为数组。然后，在子对象上修改这个属性：
> <pre lang="javascript">
> MED.skills = ['‘html’','css','Javascript'];
> WD.skills.push('teamwork');</pre>
这时，父对象就不会受到影响了。
> <pre lang="javascript">
> console.log(WD.skills); //‘html’,'css','Javascript','teamwork'
> console.log(MED.skills); //‘html’,'css','Javascript'</pre>
目前，jQuery库使用的就是这种继承方法。
原文地址：http://ued.alimama.com/front-end/javascript-extend/