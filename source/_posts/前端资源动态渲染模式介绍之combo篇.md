title: 前端资源动态渲染模式介绍之combo篇
date: 2016-07-12 20:59:26
tags:
- 资源管理
- 渲染模式
categories:
- 前端开发
---

今天继续介绍前端资源动态渲染模式中的combo模式，combo模式是利用静态服务器的combo服务，结合静态分析页面使用的js或者css文件，然后动态输出combo url地址的方式。

## 静态资源combo服务
公司静态集群使用的是nginx服务，nginx有个concat模块可以将url进行打包。使用它之后，需要合并输出的静态资源需要在`??`两个问号后面加`,`逗号隔开，例如：

```
http://baidu.com??style1.css,style2.css
http://box.bdimg.com/life/js??script1.js,script2.js
```

当然这种合并的文件数也是有限的，如果超过默认或者设置的最大文件数，服务就会报错，可以通过修改`nginx.conf`的配置进行修改：

```config
location /static/ {
    concat on;
    concat_max_files 20;
}
```

## combo渲染模式
前文介绍过基本原理，现在就拿smarty模板的`{%require name="life:js/demo"%}`说下具体的代码实现步骤，其他语言参考即可，我们还有个node版本的，node我们采用了yog2框架，其实是一样的，如果是直接php，其实就是个引入的函数而已（从第二步开始）

1. 执行`{%require name="life:js/demo"%}`，进入smarty的扩展语法require标签的实现
2. 实际执行的是 `Resource.class`的load函数：`Resource::load('life:js/demo')`
3. load函数根据传入的id（life:js/demo），读取`life-map.json`（fis生成的静态资源表），根据id找到类似下面的内容：
```json
"life:js/demo":{
  "uri":"http://s.box.bdimg.com/lf/js/demo_defb566.js",
  "type":"js",
  "deps":["common:bdbox/template"],
  "rUri":"/static/lf/js/demo_defb566.js",
  "hash": "defb566"
}
```

<!--more-->
解释下：
* uri：是线上cdn的地址
* deps：是依赖的模块id数组，会循环遍历查找
* rUri：是我们独有的，增加fis插件实现的，相对路径
* hash：独有，fis插件实现，7位md5值，可以看成版本号，后面seed模式使用

4. 将找到的内容压入数组`$arrStaticCollection`
5. 页面结束的时候，执行`Resource`的`render`方法，传入渲染模式：combo/seed/inline/tag等
6. render函数根据不同的模式进行不同的操作，然后输出内容

### Resource class的核心代码
```php
class Resouce {
    // 这里是combo的前缀url，用占位符，在node打包的时候根据实际配置替换
    const COMBO_SERVER_URL = '<!--[COMBO_SEVER_URL]-->';
    // 最大合并的文件数
    const COMBO_MAX_COUNT = 15;
    // 收集的数组
    private static $arrStaticCollection = array();

    public static function load($id){

    }
    public static function render($type){
        if($type=='combo'){
            // 只写下js的方法
            $arrURIs = & self::$arrStaticCollection['js'];
            foreach ($arrURIs as $val) {
                if ($val['uri'] === self::$framework['uri']) {
                    continue;
                }
                if(isset($val['remote']) && $val['remote']){
                    //碰见线上url，先输出现有的combo
                    if (!empty($jsComboArr)) {
                        $html .= self::getComboHtml('js', $jsComboArr);
                        //重设为空
                        $jsComboArr = array();
                    }
                    $html .= '<script src="'.$val['uri'].'"></script>' . PHP_EOL;
                }else{
                    //获取combo的url，根据uri进行同路径替换
                    $strPath = self::parseComboURI(self::getComboUrl(), $val['uri'], $val['rUri']);

                    $jsComboArr[] = $strPath;
                }

            }
        }
    }
}
```

## 静态combo方法
上面说的是动态combo，即通过php这些动态语言，边分析边使用combo，适合多平台，多判断的情况，缺点是：需要动态读取map.json分析需要合并那些文件。如果是简单的静态服务，一开始就合并起来，那么可以使用`fis3-postpackager-loader` 这个模块，我已经提交了pr：https://github.com/fex-team/fis3-postpackager-loader/pull/49/files

使用方法：
```
fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    renderMode: {
      'type': 'combo', //默认是tag
      comboMaxFiles: 15, //最大combo文件
      prefixer: '//xxxx??' //combo服务器地址，或者function
    }
  })
});
```

有别于allinone模式，会页面用到的静态资源合并到一个文件，这个是把用到的文件合并为一个combo URL。
