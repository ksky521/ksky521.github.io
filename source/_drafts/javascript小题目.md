title: "javascript小题目"
id: 979
date: 2012-03-04 21:47:13
tags: 
categories: 
- JavaScript
---

<pre lang="javascript">

//说出执行过程及为什么
var a = 1;
setTimeout(function(){
	a = 0;
},3000);
while(a){

}
console.log(a);
//获取最后一天
function getLastDay(year,month){
	return new Date(year,month,0).getDate();
}
</pre>