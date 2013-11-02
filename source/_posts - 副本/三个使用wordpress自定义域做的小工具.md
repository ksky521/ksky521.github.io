title: "三个使用WordPress自定义域做的小工具"
id: 436
date: 2009-12-31 16:26:10
tags: 
categories: 
- WordPress
- php
- 网络技术
---

刚开始建立WordPress博客的时候对于自定义域不是很了解，之后通过搜索相关知识：发现原来**WordPress自定义域**可以做很多事情，今天断桥残雪就说说WordPress自定义域三个用处：**给某一日记添加js或者CSS**，**给加密的日志添加密码提示信息**、**首页显示日志缩略图**。

### 给某一日记添加js或者CSS

WordPress 在发布日志时会对过滤一些Javascript、CSS内容，所以我们无法直接把JS、CSS直接写到日志，当然我们可以通过修改主题来实现。可是如果修改主题，把JS或者CSS的内容添加到 header.php 文件中，那么博客所有的页面都会加载这些内容，这样势必会造成整个博客效率下降。所以这个时候我们可以通过 WordPress 自定义域来给某篇的日志单独加**载Javascript 和CSS**。文章最后再介绍一种管理WordPress自定义域的小技巧工具。

假设我们给日志单独加载JS、CSS的自定义域名称是 head_JS_CSS。那么你首先需要把下面这段代码复制到你主题根目录下的 functions.php 文件中：
> <pre lang="php">
> function head_JS_CSS(){
>     if (is_single() || is_page()) {
>         global $post;
>         $head_JS_CSS = get_post_meta($post->ID, 'head_JS_CSS', true);
>         echo $head_JS_CSS;
>     }
> }
> add_action("wp_head","head_JS_CSS");</pre>

现在你在添加日志的时候，在WordPress自定义域区域，创建一个新的名称为："head_JS_CSS"自定义域，在“值”输入你要单独为这篇日志加载的 Javascript 代码或者 CSS 即可。
<!--more-->

### 给加密的日志添加密码提示信息

当我们添加一篇加密的文章时，或许我们需要部分人知道密码的时候，可以试试做个**密码提示**，例如：××的生日。
假设我们给日志添加密码提示的自定义域名称是password_hint。那么你首先需要把下面这段代码复制到你主题根目录下的 functions.php 文件中：
> <pre lang="php">function password_hint( $c ){
> 	global $post, $user_ID, $user_identity;
> 	if ( empty($post->post_password) )
> 		return $c;
> 	if ( isset($_COOKIE['wp-postpass_'.COOKIEHASH]) && stripslashes($_COOKIE['wp-postpass_'.COOKIEHASH]) == $post->post_password )
> 	return $c;
> 	//替换
> 	if($hint = get_post_meta($post->ID, 'password_hint', true)){
> 		$url = get_option('siteurl').'/wp-pass.php';
> 		if($hint)
> 		$hint = '密码提示：'.$hint;
> 		else
> 		$hint = "请输入您的密码";
> 		if($user_ID)
> 		$hint .= sprintf('欢迎进入，您的密码是：', $user_identity, $post->post_password);
> 		$out = <<<END
> <form method="post" action="$url">
> 
> 这篇文章是受保护的文章，请输入密码继续阅读:
> 
> 	<div class="rowl">
> 	<label>$hint
> 
> 	<input class="textfield" type="password" name="post_password"/></label>
> 	<input class="button bias" type="submit" value="Submit" name="Submit"/>
> 	</div>
> </form>
> END;
> 		return $out;
> }else{
> 	return $c;
> }
> }
> add_filter('the_content', 'password_hint');</pre>
然后在你添加日志的时候，在WordPress自定义域区域，创建一个新的名称为："password_hint"的自定义域，在“值”输入你密码提示：如断桥残雪的生日阳历是几号？

### 显示日志缩略图

这个比较简单，不过效果很帅，会实现就像cnbeta那样的首页日记**缩略图**功能。
假设我们给日志添加缩略图的自定义域名称是 image_thumb。那么你首先需要找到你主题根目录下的 index.php文件中的类似
> <pre lang="php"><?php the_content('Read the rest of this entry &raquo;'); ?></pre>代码前面添加如下代码：
> <pre lang="html">[" title="<?php the_title(); ?>">
> ![](<?php $values = get_post_custom_values()" alt="<?php the_title(); ?>" />
> ](<?php the_permalink() ?)</pre>
然后在你添加日志的时候，在WordPress自定义域区域，创建一个新的名称为："image_thumb"自定义域，在“值”输入你要为本篇日志上传的图片的 URL。

### 自定义域多了的小技巧

自定义域多了，我们都不好记了，或者类似加密提示的自定义域我们不经常用，当用起来的时候也许我们就忘记他们的名字了，怎么办呢~断桥残雪有个好方法，就是在后台添加、编辑日记的页面右侧添加一个提示，效果如下所示：
[caption id="attachment_437" align="alignnone" width="290" caption="WordPress添加自定义域提示"][![WordPress添加自定义域提示](http://js8.in/wp-content/uploads/2009/12/Snap15.jpg "WordPress添加自定义域提示")](http://js8.in/wp-content/uploads/2009/12/Snap15.jpg)[/caption]

我们只需要找到主题文件夹的根目录下的functions.php文件，添加以下代码即可：
> <pre lang="php">function custom_fields_tip(){
> 	$h3 = "欢迎使用自定义域";	
> 	$html=<<<END
> <div class="stuffbox meta-box-sortables ui-sortable">
> 
> ### $h3
> 
> 	<div class="inside">
> 
> 如果你正在发布或编辑一篇受密码保护的文章,建议您添加一个名称为'password_hint'的自定义域.用来提示访客.
> 使用'head_JS_CSS'可以添加css、js到头部.
> 使用'image_thumb'可以给文章添加缩略图
> 
> 	</div>
> </div>
> END;
> 	echo $html;
> }
> add_action('submitpost_box', 'custom_fields_tip');
> add_action('submitpage_box', 'custom_fields_tip');</pre>