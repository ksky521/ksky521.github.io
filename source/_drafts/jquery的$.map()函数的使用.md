title: "jquery的$.map()函数的使用"
id: 604
date: 2010-08-29 05:44:45
tags: 
categories: 
- 网络技术
---

jQuery.Map(Array,callback)
源代码如下：
map: function( elems, callback ) {
var ret = [];
// Go through the array, translating each of the items to their
// new value (or values).
for ( var i = 0, length = elems.length; i < length; i++ ) {
var value = callback( elems[ i ], i );
if ( value != null )
ret[ ret.length ] = value;
}
return ret.concat.apply( [], ret );
}
示例：
      将原数组中每个元素加 4 转换为一个新数组
$.map( [0,1,2], function(n){
return n + 4;
}); //结果[4, 5, 6]
原数组中大于 0 的元素加 1 ，否则删除。
$.map( [0,1,2], function(n){
return n > 0 ? n + 1 : null;
}); //结果[2,3]

原数组中每个元素扩展为一个包含其本身和其值加 1 的数组，并转换为一个新数组

$.map( [0,1,2], function(n){
return [ n, n + 1 ];
});
//结果：[0, 1, 1, 2, 2, 3] 