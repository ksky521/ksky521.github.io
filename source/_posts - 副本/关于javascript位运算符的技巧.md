title: "关于javascript位运算符的技巧"
id: 1057
date: 2012-09-13 19:06:51
tags:
- 性能
- 前端优化
categories:
- 前端开发
---

今天说下常用的javascript位运算符的技巧

## js位运算来判断奇偶数

```javascript
if(n&1===0){
//偶数
}else{
//奇数
}
```

## js位运算符来代替Math.floor

```javascript
(2.9|0)===2
(~~2.9)===2
(2.9>>>0)===2
(2.9>>0)===2
(2.9<<0)===2
//注意
~~(-2.999);//= -2
Math.floor(-2.999);// = -3
```

## RGB2HEX

```javascript
function RGB2HEX(a,b,c){return"#"+((256+a<<8|b)<<8|c).toString(16).slice(1)}
//或者
function toHexString(r,g,b) {
  return ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
}
var hex = toHexString(red, green, blue);
```

## 检测相等关系

```javascript
if(a!=123)
if(a^123)
//注意：
false ^ 1 // 1
true ^ 1 // 0
2 ^ 1 // 3
{} ^ 1 // 1
```
这个很好用的，比如下面的代码
```javascript
var isReady = 0;

// somewhere else
if( isReady ) { }

// somewhere else, set isReady state to 1
isReady ^= 1;

// somewhere else, set isReady state to 0
isReady ^= 1;
```

## 默认值

```javascript
if (!n) n = defaultValue;
//使用下面的代码
n||(n=defaultValue);
```
<!--more-->

## indexOf和~

在代码中常使用String.indexOf，例如：
```javascript
'abc'.indexOf('d')===-1;
if('abc'.indexOf(str)!==-1){
//在字符串中
}
```
我们可以这样来写
```javascript
~'abc'.indexOf('d')===0;
if(~'abc'.indexOf('d')){
//在字符串中
}
if(!~'abc'.indexOf('d')){
//不在字符串中
}
```
当然javascript的位运算符会导致代码的可读性降低，所以在使用的时候要权衡，或者作为代码规范（编程习惯）给大家参考，这样大家都懂了，自然代码可读性就上去了。
