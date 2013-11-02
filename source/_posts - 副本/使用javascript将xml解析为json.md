title: "使用javascript将XML解析为JSON"
id: 684
date: 2011-04-22 16:18:17
tags: 
categories: 
- JavaScript
---

今天看了[David Walsh](http://davidwalsh.name/)一篇把XML格式转换为JSON格式的文章，感觉不错，简单的转载了过来。
下面是神奇的**XML转JSON**的javascript代码：
<pre lang="javascript">
	// Changes XML to JSON
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].length) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
</pre>
<!--more-->
下面的XML为：
<pre lang="xml">
	<ALEXA VER="0.9" URL="davidwalsh.name/" HOME="0" AID="=">
	<SD TITLE="A" FLAGS="" HOST="davidwalsh.name">
		<TITLE TEXT="David Walsh Blog :: PHP, MySQL, CSS, Javascript, MooTools, and Everything Else"/>
		<LINKSIN NUM="1102"/>
		<SPEED TEXT="1421" PCT="51"/>
	</SD>
	<SD>
		<POPULARITY URL="davidwalsh.name/" TEXT="7131"/>
		<REACH RANK="5952"/>
		<RANK DELTA="-1648"/>
	</SD>
</ALEXA>
</pre>
通过上面的函数转换后的JSON为：
<pre lang="javascript">
	{
	"@attributes": {
		AID: "=",
		HOME:  0,
		URL: "davidwalsh.name/",
		VER: "0.9",
	},
	SD = [
		{
			"@attributes": {
				FLAGS: "",
				HOST: "davidwalsh.name",
				TITLE: A
			},
			LINKSIN: {
				"@attributes": {
					NUM: 1102
				}
			},
			SPEED: {
				"@attributes": {
					PCT: 51,
					TEXT: 1421
				}
			},
			TITLE: {
				"@attributes": {
					TEXT: "David Walsh Blog :: PHP, MySQL, CSS, Javascript, MooTools, and Everything Else",
				}
			},
		},
		{
			POPULARITY: {
				"@attributes": {
					TEXT: 7131,
					URL: "davidwalsh.name/"
				}
			},
			RANK: {
				"@attributes": {
					DELTA: "-1648"
				}
			},
			REACH: {
				"@attributes": {
					RANK = 5952
				}
			}
		}
	]
}
</pre>

原文地址：[Convert XML to JSON with JavaScript](http://davidwalsh.name/convert-xml-json)