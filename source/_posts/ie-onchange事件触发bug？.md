title: "IE onchange事件触发bug？"
id: 541
date: 2010-05-24 23:33:32
tags:
- javascript
categories:
- 前端开发
---
今天遇到了IE一个**onchange事件**的bug，此bug存在于IE所有的版本（6,7,8）不知道是不是bug，还是IE故意这样设计的？姑且不做评价，我们来看看IE onchange事件的重现过程：

给input等控件添加onchange事件，例如input的checkbox（radio等），在IE下点击选中，并没有触发onchange事件，而需要再次失去焦点（点击页面的任何地方）的时候才可以触发onchange事件，而在Firefox下是点击选中checkbox既可以触发onchange事件的~

### bug重现代码


```html
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>IE onchange event bug</title></head>
<body>
<input type="checkbox" value="1" onchange="alert(this.value);" id="demo1"/>
<label for="demo1">demo1</label>
<input type="checkbox" value="2" onchange="alert(this.value);" id="demo2"/>
<label for="demo2">demo2</label>
</body></html>
```

### 解决方法

1.  在jQuery1.4.2中绑定change事件是完全可以解决的，而在jQuery1.3.2中绑定change事件是不行的，我们可以通过**click**事件来绑定
2.  如果不怕麻烦也不介意绑定两次事件，可以使用IE自带的**onpropertychange事件**绑定change事件，断桥残雪测试是可以的，不过这样子在IE下就绑定了两次change事件，不推荐这个方法，如果是checkbox，radio等还是使用click事件来处理吧