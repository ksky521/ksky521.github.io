title: "使用navigator.geolocation来获取用户的地理位置信息"
id: 672
date: 2011-01-26 23:25:05
tags: 
categories: 
- JavaScript
- 网络技术
---

W3C 中新添加了一个名为 **Geolocation**的 API 规范，Geoloaction API的作用就是通过浏览器获取用户的地理位置。我们可以使用`navigator.geolocation`来简单的获取用户的地理位置信息。本文中将简单介绍下W3C的Geolocation。

Geolocation在javascript的navigator 对象中，我们可以通过 navigator.geolocation 来使用它。不支持 geolocation 的浏览器并不包含这一对象，那么可以通过下面的代码来做能力检测，对不同的浏览器做不同的处理。
<pre lang="javascript">if (navigator.geolocation) {
        alert( ' 浏览器支持 geolocation ' );
}else{
        alert( ' 浏览器不支持 geolocation ' );
}</pre>
在访问 geolocation 对象时，即调用 geolocation 下面的方法时，浏览器会弹出提示，询问用户是否许可网站提供的位置服务，只有在得到用户许可过后，服务才会继续，否则将被停止，在稍后你将会了解到，我们能够捕获到用户拒绝服务的动作。下面这张图分别是 Chrome , Firefox 和 Opera 在初次访问 geolocation 时，给用户的提示：

[caption id="attachment_673" align="aligncenter" width="300" caption="初次使用geolocation时的警告框"][![初次使用geolocation时的警告框](http://js8.in/wp-content/uploads/2011/01/geolocation-warn1-300x186.png "初次使用geolocation时的警告框")](http://js8.in/672.html/geolocation-warn-2)[/caption]

常用的navigator.geolocation对象有以下三种方法：

1.  获取当前地理位置：**navigator.geolocation.getCurrentPosition**(success_callback_function, error_callback_function, position_options)
2.  持续获取地理位置：**navigator.geolocation.watchPosition**(success_callback_function, error_callback_function, position_options)
3.  清除持续获取地理位置事件：**navigator.geolocation.clearWatch**(watch_position_id)
其中success_callback_function为成功之后处理的函数，error_callback_function为失败之后返回的处理函数，参数position_options是配置项，由JSON格式传入：

1.  enableHighAccuracy：true/false，它将告诉浏览器是否启用高精度设备，所谓的高精度设备包含但不局限于前面所提到的 GPS 和 WIFI，值为 true 的时候，浏览器会尝试启用这些设备，默认指为 true，在这种情况下，浏览器会尽可能地进行更为精确的查询，简单地说，如果用户有可用的 GPS 设备，会返回 GPS 设备的查询结果，IP 是最后的选择，对于移动设备来说，网络接入点(基站)或许成为另一个选择，对此我还没有完全了解，但根据测试，即时没有任何额外功能的手机，也能够得到更为精确的查询结果。
2.  maximumAge：单位毫秒，告诉设备缓存时间，主要用于设备的省电或者节省带宽方面。
3.  timeout：单位毫秒，超时事件，获取位置信息时超出设定的这个时长，将会触发错误，捕获错误的函数将被调用，并且错误码指向TIMEOUT。

例如下面的代码：
<pre lang="javascript">
var geo=navigator.geolocation.getCurrentPosition(geo_success, geo_error, {enableHighAccuracy:true, 
    maximumAge:30000, 
    timeout:27000});
</pre>
<!--more-->

### 获取当前地理位置方法：navigator.geolocation.getCurrentPosition

当获得用户的许可过后，便一切就绪。我们将通过 geolocation 下的 getCurrentPosition 方法来获取用户当前的地理位置信息。

#### 1、正确返回地理位置信息的处理函数

例如我们的成功处理函数这样写：
<pre lang="javascript'>
function getPositionSuccess( position ){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        document.write( "您所在的位置：纬度 " + lat + "，经度" + lng );
}
</pre>
处理函数中的position 对象包含了用户的地理位置信息，该对象下面的 coords 子对象包含了用户所在的纬度和经度信息，通过 position.coords.latitude 可以访问纬度，而 position.coords.longitude 中存放了经度的信息，用户的位置信息越精确，这两个数字后面的小数点越长。事实上，在 Firefox 中，position 对象下还附带有另一个 address 对象，这个对象包含这个经纬度下的国家名，城市名甚至街道名，例如下面的代码：
<pre lang="javascript">
function getPositionSuccess( position ){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        alert( "您所在的位置： 纬度" + lat + "，经度" + lng );
        if(typeof position.address !== "undefined"){
                var country = position.address.country;
                var province = position.address.region;
                var city = position.address.city;
                alert(' 您位于 ' + country + province + '省' + city +'市');
        }
}
</pre>
coords其他返回信息：

1.  coords.accuracy：返回经纬度的精度（米）
2.  coords.speed :速度
3.  coords.altitude ：当前的高度，海拔（米）
4.  coords.altitudeAccuracy：高度的精度（米）
5.  coords.heading：朝向

#### 2、返回错误时的处理函数

上面都是成功获取到用户位置信息的处理，但是出现问题的情况在所难免，当获取用户的位置信息出错时，传递到 getCurrentPosition 的第二个函数类型参数被调用，一个包含具体出错信息的对象会被传递进去，错误将被捕获。
<pre lang="javascript">function getPositionError(error){
	switch(error.code){
		case error.TIMEOUT :
			alert( " 连接超时，请重试 " );
			break;
		case error.PERMISSION_DENIED :
			alert( " 您拒绝了使用位置共享服务，查询已取消 " );
			break;
		case error.POSITION_UNAVAILABLE : 
			alert( " 亲爱的火星网友，非常抱歉，我们暂时无法为您所在的星球提供位置服务 " );
			break;
	}
}</pre>
error 对象下面，存放了3个常量：

1.  TIMEOUT:表示获取信息超时。
2.  PERMISSION_DENIED：表示用户选择了拒绝了位置服务。
3.  POSITION_UNAVAILABLE：表示位置不可知。
_说明：而每一次出错时 error.code 将指向3个常量之中的一个。_

### 移动设备持续获取地理位置方法：navigator.geolocation.watchPosition

对于使用移动设备的用户来说，位置并不是固定的，W3C 当然也考虑到了这一点，watchPosition 是一个专门用来处理这一情况的方法，watchPosition 被调用后，浏览器会跟踪设备的位置，每一次位置的变化，watchPosition 中的代码都将会被执行。对于致力于移动设备 web 开发的同学来说，这个方法是及其重要的，它也许将会改变 web 移动客户端的格局。
使用**navigator.geolocation.clearWatch**既可以清除`navigator.geolocation.watchPosition`的监控事件。

### Geolocation实例演示

[查看Geolocation实例演示](http://js8.in/mywork/geolocation.html "使用geolocation来获取用户的地理位置信息实例")

### 写在最后

定位一般采用的wifi会比较准确，才用IP的时候一般会定位到所在的城市中心，更多关于地图定位的文章：

1.  [php获取来访者IP信息](http://js8.in/509.html)
2.  [php、js两种不同方式根据关键词返回经纬度接口【基于Google map API】](http://js8.in/342.html "php、js两种不同方式根据关键词返回经纬度接口【基于Google map API】")
3.  [根据IP返回地理位置地址以及地理经纬度的方法](http://js8.in/308.html "根据IP返回地理位置地址以及地理经纬度的方法")
4.  [基于Google地图的根据IP返回地理位置的接口](http://js8.in/mywork/ipsearch/ "基于Google地图的根据IP返回地理位置的接口")