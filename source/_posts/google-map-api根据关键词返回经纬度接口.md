title: "php、js两种不同方式根据关键词返回经纬度接口【基于Google map API】"
id: 342
date: 2009-11-21 00:21:09
tags:
- 网络技术
categories:
- 乱七八糟
---
P.S：在本文章中您将找到根据城市关键词获取经纬度的方法，即就是通过google map API的逆经纬度查询接口获得经纬度。
**google map api**是一个强大的地图API，很多知名的网站都是用了google地图API，曾经我也写过一个根据来访者甚至域名来查询经纬度的程序（[http://js8.in/mywork/ipsearch](http://js8.in/mywork/ipsearch)）。文章链接地址为：[根据IP返回地理位置地址以及地理经纬度的方法](http://js8.in/308.html)，关于经纬度的其他文章可以参考[全国各省市，县级城市经纬度SQL数据以及**js数组**](http://js8.in/285.html)
其中使用的是纯真IP数据库，已经google地图的逆经纬度查询~
而本例中我们实现的主要方式是php如何获得关键字的经纬度。
使用过Google map API的人都知道google有一个逆经纬度查询的接口，例如：
```javascript
geocoder = new GClientGeocoder();geocoder.getLocations(
          '山东青岛',
        function($){
var lalton = $.Placemark[0].Point.coordinates;
alert(latlon[0]+","+latlon[1]);
});```可是对于php应该怎样获取**经纬度**呢？
今天在无意的时候看到一个wp的插件，其中找到了方法，就是通过google map API的逆经纬度查询接口获得经纬度~
首先你需要去http://code.google.com/intl/zh-CN/apis/maps/signup.html申请一个google map api的授权域名**key**，
google的map api逆经纬度接口为：
http://maps.google.com/maps/geo?q=关键词（如山东青岛）&key=刚刚申请的API KEY&sensor=false&output=xml&oe=utf8
请求下来的数据时kml的数据格式，怎样解析呢？
<!--more-->我们可以使用**xml**的方式来进行解析，这里我提供一个解析的**php**代码，代码来自于wp的一个插件
第一个函数是xml2array()，这个函数的作用就是把xml转换为数组便于操作
参数$url为请求的xml地址，返回的是一个xml转换成的数组

```php
//from http://us3.php.net/manual/en/function.xml-parse.php
function xml2array($url, $get_attributes = 1, $priority = 'tag')
{
    $contents = "";
    if (!function_exists('xml_parser_create'))
    {
        return array ();
    }
    $parser = xml_parser_create('');
    if (!($fp = @ fopen($url, 'rb')))
    {
        return array ();
    }
    while (!feof($fp))
    {
        $contents .= fread($fp, 8192);
    }
    fclose($fp);
    xml_parser_set_option($parser, XML_OPTION_TARGET_ENCODING, "UTF-8");
    xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
    xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1);
    xml_parse_into_struct($parser, trim($contents), $xml_values);
    xml_parser_free($parser);
    if (!$xml_values)
        return; //Hmm...
    $xml_array = array ();
    $parents = array ();
    $opened_tags = array ();
    $arr = array ();
    $current = & $xml_array;
    $repeated_tag_index = array ();
    foreach ($xml_values as $data)
    {
        unset ($attributes, $value);
        extract($data);
        $result = array ();
        $attributes_data = array ();
        if (isset ($value))
        {
            if ($priority == 'tag')
                $result = $value;
            else
                $result['value'] = $value;
        }
        if (isset ($attributes) and $get_attributes)
        {
            foreach ($attributes as $attr => $val)
            {
                if ($priority == 'tag')
                    $attributes_data[$attr] = $val;
                else
                    $result['attr'][$attr] = $val; //Set all the attributes in a array called 'attr'
            }
        }
        if ($type == "open")
        {
            $parent[$level -1] = & $current;
            if (!is_array($current) or (!in_array($tag, array_keys($current))))
            {
                $current[$tag] = $result;
                if ($attributes_data)
                    $current[$tag . '_attr'] = $attributes_data;
                $repeated_tag_index[$tag . '_' . $level] = 1;
                $current = & $current[$tag];
            }
            else
            {
                if (isset ($current[$tag][0]))
                {
                    $current[$tag][$repeated_tag_index[$tag . '_' . $level]] = $result;
                    $repeated_tag_index[$tag . '_' . $level]++;
                }
                else
                {
                    $current[$tag] = array (
                        $current[$tag],
                        $result
                    );
                    $repeated_tag_index[$tag . '_' . $level] = 2;
                    if (isset ($current[$tag . '_attr']))
                    {
                        $current[$tag]['0_attr'] = $current[$tag . '_attr'];
                        unset ($current[$tag . '_attr']);
                    }
                }
                $last_item_index = $repeated_tag_index[$tag . '_' . $level] - 1;
                $current = & $current[$tag][$last_item_index];
            }
        }
        elseif ($type == "complete")
        {
            if (!isset ($current[$tag]))
            {
                $current[$tag] = $result;
                $repeated_tag_index[$tag . '_' . $level] = 1;
                if ($priority == 'tag' and $attributes_data)
                    $current[$tag . '_attr'] = $attributes_data;
            }
            else
            {
                if (isset ($current[$tag][0]) and is_array($current[$tag]))
                {
                    $current[$tag][$repeated_tag_index[$tag . '_' . $level]] = $result;
                    if ($priority == 'tag' and $get_attributes and $attributes_data)
                    {
                    $current[$tag][$repeated_tag_index[$tag . '_' . $level] . '_attr'] = $attributes_data;
                    }
                    $repeated_tag_index[$tag . '_' . $level]++;
                }
                else
                {
                    $current[$tag] = array (
                        $current[$tag],
                        $result
                    );
                    $repeated_tag_index[$tag . '_' . $level] = 1;
                    if ($priority == 'tag' and $get_attributes)
                    {
                        if (isset ($current[$tag . '_attr']))
                        {
                            $current[$tag]['0_attr'] = $current[$tag . '_attr'];
                            unset ($current[$tag . '_attr']);
                        }
                        if ($attributes_data)
                        {
                            $current[$tag][$repeated_tag_index[$tag . '_' . $level] . '_attr'] = $attributes_data;
                        }
                    }
                    $repeated_tag_index[$tag . '_' . $level]++; //0 and 1 index is already taken
                }
            }
        }
        elseif ($type == 'close')
        {
            $current = & $parent[$level -1];
        }
    }
    return ($xml_array);
}```
第二个函数getPoiAndAdd($address,$mapkey):
$address为查询的关键词，地址就可以啦，$mapkey为你申请的google map api key，
返回的是一个数组，其中包括了经纬度以及详细地址哦~

```php
function gmshc_point ($address,$apikey){
    $find = array("\n","\r"," ");
	$replace = array("","","+");					
    $address = str_replace( $find,$replace, $address);
	$url = 'http://maps.google.com/maps/geo?q='.$address.'&key='.$apikey.
         '&sensor=false&output=xml&oe=utf8';	
	$response = xml2array($url);	//此处调用都一个函数进行解析
	$coordinates = $response['kml']['Response']['Placemark']['Point']['coordinates'];
	$address = $response['kml']['Response']['Placemark']['address'];	
	if (!empty($coordinates)) {	
	$point_array = split(",",$coordinates);	
	$point = $point_array[1].",".$point_array[0];
	$response = array('point'=>$point,'address'=>$address);	
	return  $response;	
	}
}
```