title: "解决IE6背景图片不缓存的BUG"
id: 557
date: 2010-06-21 05:34:13
tags: 
categories: 
- CSS
- JavaScript
- 网络技术
---

**IE6**在背景图片缓存上有一个**bug**：它会每次都从服务器端读取背景图片。例如我们使用a:hover更换背景图片，在IE6下会出现每次鼠标滑过则重新向服务器请求图片，如果服务器反应较慢，那么hover效果就会出现短暂的空白，令人极度不爽。虽然可以通过**CSS sprites**的方式解决问题的，但效果差强人意。

示例：
`a{ background:url(normal.gif); } a:hover { background:url(hover.gif); }`
如果为超级链接定义上述的css样式以实现鼠标悬浮时的动态效果，在firefox下是没有什么问题的，第一次加载之后，浏览器都会从缓存读取背景图片.

### 解决方法

具体的**解决方法**就是在页面中加入一段简单的javascript脚本，告诉IE6：本地有背景图片的话就不要麻烦服务器了。 `document.execCommand("BackgroundImageCache",false,true);`

关于这段脚本的放置方式有两种：

<!--more-->

1.使用CSS，在CSS中加入如下代码

> <pre lang="css">html {}{ filter: expression(document.execCommand("BackgroundImageCache", false, true)); }</pre>

2.使用JS：

> <pre style="padding-left: 30px; " lang="javascript">document.execCommand("BackgroundImageCache",false,true);</pre>

另外查了一下关于这个**document.execCommand** 的一些其他用法

> 2D-Position 允许通过拖曳移动绝对定位的对象。
> AbsolutePosition 设定元素的 position 属性为“absolute”(绝对)。
> BackColor 设置或获取当前选中区的背景颜色。
> BlockDirLTR 目前尚未支持。
> BlockDirRTL 目前尚未支持。
> Bold 切换当前选中区的粗体显示与否。
> BrowseMode 目前尚未支持。
> Copy 将当前选中区复制到剪贴板。
> CreateBookmark 创建一个书签锚或获取当前选中区或插入点的书签锚的名称。
> CreateLink 在当前选中区上插入超级链接，或显示一个对话框允许用户指定要为当前选中区插入的超级链接的 URL。
> Cut 将当前选中区复制到剪贴板并删除之。
> Delete 删除当前选中区。
> DirLTR 目前尚未支持。
> DirRTL 目前尚未支持。
> EditMode 目前尚未支持。
> FontName 设置或获取当前选中区的字体。
> FontSize 设置或获取当前选中区的字体大小。
> ForeColor 设置或获取当前选中区的前景(文本)颜色。
> FormatBlock 设置当前块格式化标签。
> Indent 增加选中文本的缩进。
> InlineDirLTR 目前尚未支持。
> InlineDirRTL 目前尚未支持。
> InsertButton 用按钮控件覆盖当前选中区。
> InsertFieldset 用方框覆盖当前选中区。
> InsertHorizontalRule 用水平线覆盖当前选中区。
> InsertIFrame 用内嵌框架覆盖当前选中区。
> InsertImage 用图像覆盖当前选中区。
> InsertInputButton 用按钮控件覆盖当前选中区。
> InsertInputCheckbox 用复选框控件覆盖当前选中区。
> InsertInputFileUpload 用文件上载控件覆盖当前选中区。
> InsertInputHidden 插入隐藏控件覆盖当前选中区。
> InsertInputImage 用图像控件覆盖当前选中区。
> InsertInputPassword 用密码控件覆盖当前选中区。
> InsertInputRadio 用单选钮控件覆盖当前选中区。
> InsertInputReset 用重置控件覆盖当前选中区。
> InsertInputSubmit 用提交控件覆盖当前选中区。
> InsertInputText 用文本控件覆盖当前选中区。
> InsertMarquee 用空字幕覆盖当前选中区。
> InsertOrderedList 切换当前选中区是编号列表还是常规格式化块。
> InsertParagraph 用换行覆盖当前选中区。
> InsertSelectDropdown 用下拉框控件覆盖当前选中区。
> InsertSelectListbox 用列表框控件覆盖当前选中区。
> InsertTextArea 用多行文本输入控件覆盖当前选中区。
> InsertUnorderedList 切换当前选中区是项目符号列表还是常规格式化块。
> Italic 切换当前选中区斜体显示与否。
> JustifyCenter 将当前选中区在所在格式化块置中。
> JustifyFull 目前尚未支持。
> JustifyLeft 将当前选中区所在格式化块左对齐。
> JustifyNone 目前尚未支持。
> JustifyRight 将当前选中区所在格式化块右对齐。
> LiveResize 迫使 MSHTML 编辑器在缩放或移动过程中持续更新元素外观，而不是只在移动或缩放完成后更新。
> MultipleSelection 允许当用户按住 Shift 或 Ctrl 键时一次选中多于一个站点可选元素。
> Open 打开。
> Outdent 减少选中区所在格式化块的缩进。
> OverWrite 切换文本状态的插入和覆盖。
> Paste 用剪贴板内容覆盖当前选中区。
> PlayImage 目前尚未支持。
> Print 打开打印对话框以便用户可以打印当前页。
> Redo 重做。
> Refresh 刷新当前文档。
> RemoveFormat 从当前选中区中删除格式化标签。
> RemoveParaFormat 目前尚未支持。
> SaveAs 将当前 Web 页面保存为文件。
> SelectAll 选中整个文档。
> SizeToControl 目前尚未支持。
> SizeToControlHeight 目前尚未支持。
> SizeToControlWidth 目前尚未支持。
> Stop 停止。
> StopImage 目前尚未支持。
> StrikeThrough 目前尚未支持。
> Subscript 目前尚未支持。
> Superscript 目前尚未支持。
> UnBookmark 从当前选中区中删除全部书签。
> Underline 切换当前选中区的下划线显示与否。
> Undo 撤消。
> Unlink 从当前选中区中删除全部超级链接。
> Unselect 清除当前选中区的选中状态。