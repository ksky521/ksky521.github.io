title: "通过jQuery打造支持汉字,拼音,英文快速定位查询的超级select插件"
id: 609
date: 2010-08-29 05:51:13
tags: 
categories: 
- 网络技术
---

Query 超级select 插件 v3.0.0.0插件 支持汉字、拼音、英文快速定位查询的超级select插件。可方向键、tab 键快速选择。
//潇湘博客
//http://blog.csdn.net/fkedwgwy
//PHP 技术群：37304662
//时间:2010-06-13
//版本 v3.0.0.0
//任意字符、中文与拼音综合查询
//方向键选择option
//优化下拉框显示效果
//jquery超级select插件
$.fn.selectseach = function() {
String.prototype.trim = function() {
return this.replace(/(^\s*)|(\s*$)/g, "");
}
//汉字转拼音
function makePy(str) {
if (typeof(str) != "string") {
return str;
//throw new Error(-1,"需要字符串类型参数!");
}
var arrResult = new Array();
for (var i = 0, len = str.length; i < len; i++) {
var ch = str.charAt(i);
arrResult.push(checkCh(ch));
}
var resarr = mkRslt(arrResult);
return resarr.join("").toLowerCase();
}
function checkCh(ch) {
var uni = ch.charCodeAt(0);
if (uni > 40869 || uni < 19968) return ch; //dealWithOthers(ch);
return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
}
function mkRslt(arr) {
var arrRslt = [""];
for (var i = 0, len = arr.length; i < len; i++) {
var str = arr[i];
var strlen = str.length;
if (strlen == 1) {
for (var k = 0; k < arrRslt.length; k++) {
arrRslt[k] += str;
}
} else {
var tmpArr = arrRslt.slice(0);
arrRslt = [];
for (k = 0; k < strlen; k++) {
var tmp = tmpArr.slice(0);
for (var j = 0; j < tmp.length; j++) {
tmp[j] += str.charAt(k);
}
arrRslt = arrRslt.concat(tmp);
}
}
}
return arrRslt;
}
var strChineseFirstPY = "这段代码省略";
var oMultiDiff = {
"40840": "YK",
"40863": "QJG"
};
var teststr;
var selectobj = $(this);
var obj;
var obj1;
var mfont = 12;
var selectleft;
var selecttop;
var selectwidth;
var objid;
var objvalue;
var objhtml;
var inputwidth;
var selectinput = 'selectinput',
selectinputname = 'selectinputname',
imgselect = 'imgselect',
myhtml, objid;
var recno;
var fzrxm1 = "";
var fzrxm = "";
var selectid = -1;
var mfocus = 1;
var ij, selectgotoij = -10;
//创建 select div
selectobj.each(function() {
obj = $(this);
var check = obj.attr('m');
//alert(check);
if (check == 'search') {
mfont = 12;
selectleft = obj.offset().left;
selecttop = obj.offset().top;
selectwidth = obj.width();
objid = obj.attr('id');
objvalue = obj.val();
objhtml = obj.find('option:selected').text();
teststr = teststr + 'left=' + selectleft + 'and top=' + selecttop + '
';
//浏览器判断
if ($.browser.mozilla) {
inputwidth = selectwidth - 15;
} else {
inputwidth = selectwidth - 18;
}
selectsearch();
}
});
// 隐藏 原始select
selectobj.each(function() {
if ($(this).attr('m') == 'search') {
$(this).hide();
}
});
//创建 select div
function selectsearch() {
myhtml = "<div id=" + selectinput + objid + " style='height: 18px;color:white; background:white; font-size:12;left:" + selectleft + ";top:" + selecttop + ";'><nobr><input type='text' name=" + selectinputname + objid + " id=" + selectinputname + objid + " style='border:1px solid #CCC;margin: 0pt 0px 0pt 0px;font-size:" + mfont + ";vertical-align:middle;'>![](img/multiselect.gif "快速定位")</nobr></div>";
if (!$('#' + selectinput + objid).html()) {
obj.after(myhtml);
selectkeyup(); //添加keyup事件
}
$('#' + selectinput + objid).css({
//  'left': selectleft,
//  'top': selecttop,
'font-size': mfont,
'width': inputwidth
});
$('#' + selectinputname + objid).css({
'width': inputwidth
});
$('#' + selectinputname + objid).val(objhtml);
$('#' + selectinputname + objid).focus(function() {
var myid;
myid = $(this).attr('id');
objid = myid.replace("selectinputname", "");
obj = $('#' + selectinput + objid);
});
/*     $('#' + imgselect + objid).click(function() {
var myid;
myid = $(this).attr('id');
objid = myid.replace("imgselect", "");
obj = $('#' + selectinput + objid);
creatediv();
//alert(1);
});*/
$('#' + selectinputname + objid).blur(function() {
var myid;
myid = $(this).attr('id');
objid = myid.replace("selectinputname", "");
$('#' + selectinputname + objid).val($('#' + objid).find('option:selected').text());
$('#' + imgselect + objid).attr("src", "img/multiselect.gif");
//$('#selectcontent').remove();
//creatediv();
//alert(obj.val());
});
$('#' + selectinput + objid).show();
//$('#' + selectinputname + objid).focus();
$('#' + selectinput + objid).hover(
function() {
obj = $(this);
creatediv();
},
function() {
objid = $(this).attr('id');
objid = objid.replace("selectinput", "");
$('#' + selectinputname + objid).val($('#' + objid).find('option:selected').text());
$('#' + imgselect + objid).attr("src", "img/multiselect.gif");
$('#selectcontent').remove();
});
}
//创建 select 下拉 div 容器
function creatediv() {
var divheight;
objid = obj.attr('id');
objid = objid.replace("selectinput", "");
$('.selectimg').attr("src", "img/multiselect.gif");
// objid = $(this).attr('id');
$('#' + imgselect + objid).attr("src", "img/multiselect-hover.gif");
$('#' + selectinputname + objid).focus();
selectwidth = obj.width();
//浏览器判断
if ($.browser.mozilla) {
selectwidth = selectwidth + 16;
} else {
selectwidth = selectwidth + 20;
}
//divheight=$('#'+objid).l;
//列表div
var myhtml1 = "<div id='selectcontent' style='height: 118px; position:absolute; border: 1px solid #CCC; background:white; font-size:12;overflow-x:hidden;overflow-y:auto;margin: -1.5pt 0px 0pt 0px;display: none'></div>";
$('#selectcontent').remove();
obj.append(myhtml1);
$("#selectcontent").css({
'font-size': mfont,
'width': selectwidth,
});
$('#selectcontent').show();
//加载option
createoption(0);
if (ij <= 8) {
divheight = ij * 15;
} else {
divheight = 118;
}
$("#selectcontent").css({
'height': divheight,
});
}
function arraycheck(objs, mystr) {
for (var i = 0; i < objs.length; i++) {
if (objs[i] == mystr) {
return false;
}
}
return true;
}
//创建 select option
function createoption(maction) {
objid = obj.attr('id');
objid = objid.replace("selectinput", "");
//加载select option 数据
$('#' + objid).find('option').each(function() {
fzrxm1 = fzrxm1 + $(this).val() + "|";
fzrxm = fzrxm + $(this).text() + "|";
});
var mystr = '',
selectgoto = $('#' + selectinputname + objid).val(),
selectstyle = '',
seachstr = '';
//alert(fzrxm1.length);
var myarray = new Array();　 //创建一个数组
var arr = new Array();　 //创建一个数组
fzrxm = fzrxm + ' ';
arr = fzrxm.split('|');
seachstr = $('#selectinputname' + objid).val();
//alert(seachstr);
//seachstr = objvalstr;
//$('#msg1').html(seachstr + 'aaaaaaaaaaaaaa');
if ((seachstr != '') && (seachstr != 'undefined')) {
if (maction == 1) {
var rval = GetAllLikeString(seachstr, arr);
}
if (maction == 0) {
var rval = arr;
}
} else {
var rval = arr;
}
mystr = "<div  id='selectdivtree' style='width:96.9%;border:0px solid #CCC;margin: 2pt 0px 0pt 2px;color:#000000'>";
ij = 0;
recno = rval.length;
//alert(recno);
if (rval != '') {
for (var i = 0; i < recno; i++) {
if (arraycheck(myarray, rval[i])) {
if ((rval[i] != ' ') && (rval[i] != 'null')) {
ij = ij + 1;
if (selectgoto == rval[i]) {
selectgotoij = ij;
selectstyle = "background: #0080FF;";
}
mystr = mystr + "<div style='height:14px;" + selectstyle + " ' class='selectclassdiv' id='selectclassdiv" + ij + "' rel = '" + ij + "'>" + rval[i] + "</div>";
selectstyle = '';
myarray.push(rval[i]); // 将一个或多个新元素添加到数组结尾，并返回数组新长度
}
}
}
} else {
mystr = mystr + "No records!";
}
mystr = mystr + "<input type='hidden'  id = 'selectaction' value = '0'></div>";
$('#selectdivtree').remove();
$('#selectcontent').html(mystr);
selectid = -1;
myarray = '';
fzrxm1 = '';
fzrxm = '';
//alert(selectgoto);
moveScrollbar(selectgotoij);
selectid = selectgotoij;
selectgotoij = -10;
optionhover();
}
//获取所有符合条件下元素,以数据型式返回,str:要查找的字符串,container:被查的数组
function GetAllLikeString(mstr, container) {
var str = mstr;
var startChar = str.charAt(0); //开始字符
var strLen = str.length; //查找符串的长度
var curCon;
var isFind = false; //是否找到
var resultIndex = -1 //如果是的话的那个索引
var returnvalue = "";
for (var i = 0; i < container.length; i++) {
curCon = container[i];
for (var j = 0; j < curCon.length; j++) {
//alert(curCon.charAt(j));
curstr = curCon.charAt(j);
if (curstr == startChar || makePy(curstr) == startChar) //如果匹配起始字符,开始查找
{
strsearch = curCon.substring(j).substring(0, strLen);
strsearch1 = makePy(strsearch);
if (strsearch == str || strsearch1 == str) //如果从j开始的字符与str匹配，那ok
{
returnvalue = returnvalue + curCon + "|";
}
}
}
}
if (returnvalue.length > 1) returnvalue = returnvalue.substring(0, returnvalue.length - 1);
var returnvalue = returnvalue.split("|");
returnvalue.sort();
return returnvalue;
}
////分类法选中样式操作///////////////////////////////////////////////////////
function optionhover() {
objid = obj.attr('id');
objid = objid.replace("selectinput", "");
var mform = $('#selectdivtree');
mform.find('.selectclassdiv').each(function() {
var _self = $(this);
_self.click(function() {
// alert(obj.val());
setval(_self.html());
$('#' + objid).change();
$('#selectcontent').hide();
$('.selectimg').attr("src", "img/multiselect.gif");
});
_self.hover(
function() {
if (getselectvalue(_self.html()) != $('#' + objid).val()) {
mform.find('.selectclassdiv').css({
background: "White"
});
}
$(this).css({
background: "#0080FF"
});
},
function() {
if (getselectvalue(_self.html()) != $('#' + objid).val()) {
$(this).css({
background: "White"
});
}
});
});
}
function getselectvalue(str) {
objid = obj.attr('id');
objid = objid.replace("selectinput", "");
var myid = '';
$('#' + objid).find('option').each(function() {
if (str == $(this).text()) {
myid = $(this).val();
return false; //跳出循环
//alert(myid);
//
}
});
return myid;
}
function setval(selfhtml) {
objid = obj.attr('id');
objid = objid.replace("selectinput", "");
//alert(selfhtml);
if ($('#selectcontent').length == 0) {
return false;
}
$('#' + objid).attr('value', getselectvalue(selfhtml));
$('#' + selectinputname + objid).val(selfhtml);
};
function getTop(idx) {
var mfontsize;
return idx * 14 - 23;
}
//移动 option div 滚动条
function moveScrollbar(idx) {
if (idx < 1) {
return false;
}
if (idx > ij) {
return false;
}
var t = getTop(idx);
var ch = $('#selectcontent').scrollHeight;
$('#selectcontent').attr("scrollTop", t);
// $('#selectcontent').animate({scrollTop : t}, 'slow');
$('#selectaction').val($("#selectclassdiv" + idx).attr('rel'));
setval($("#selectclassdiv" + idx).html());
}
function selectkeyup() {
$('#' + selectinputname + objid).keyup(function(event) {
// alert(ij);
if (ij < selectid) {
selectid = 0;
// return false;
};
if (selectid < 1) {
selectid = 0;
//return false;
};
mfocus = 1;
switch (event.keyCode) {
case 37:
{
mfocus = 0;
creatediv();
$("#selectclassdiv" + selectid).css({
background: "White"
});
selectid = selectid - 1;
moveScrollbar(selectid);
$("#selectclassdiv" + selectid).css({
background: "#0080FF"
});
break;
}
case 39:
{
mfocus = 0;
creatediv();
$("#selectclassdiv" + selectid).css({
background: "White"
});
selectid = selectid + 1;
moveScrollbar(selectid);
$("#selectclassdiv" + selectid).css({
background: "#0080FF"
});
break;
}
case 40:
{
mfocus = 0;
$("#selectclassdiv" + selectid).css({
background: "White"
});
selectid = selectid + 1;
moveScrollbar(selectid);
$("#selectclassdiv" + selectid).css({
background: "#0080FF"
});
break;
}
case 38:
{
mfocus = 0;
creatediv();
$("#selectclassdiv" + selectid).css({
background: "White"
});
selectid = selectid - 1;
moveScrollbar(selectid);
$("#selectclassdiv" + selectid).css({
background: "#0080FF"
});
break;
}
case 13:
{
mfocus = 0;
creatediv();
setval($("#selectclassdiv" + selectid).html());
$('#' + objid).change();
$('#selectcontent').hide();
$('.selectimg').attr("src", "img/multiselect.gif");
break;
}
case 9:
{
mfocus = 0;
$('#selectcontent').remove();
break;
}
}
if (mfocus == 1) {
creatediv();
createoption(1);
};
});
$('#' + selectinputname + objid).click(function() {
$('#' + selectinputname + objid).select();
});
}
};

使用方法:
<select name="sssss2" id="sssss2" m='search' >
<option value="-1">所有学校</option>
<option value="139">湾小学</option>
<option value="140">阳河小学</option>
<option value="141">浏阳市</option>
</select>
JS代码:
$(document).ready(function(){
$('#sssss').selectseach();
});