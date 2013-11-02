title: "jQuery+google weather API轻松实现天气地图（二）"
id: 283
date: 2009-10-19 10:15:31
tags:
- 网络技术
categories:
- 乱七八糟
---
原理：通过来输入的关键词查询出**城市**的经纬度，然后调用google的**weather**接口，查出城市的天气情况，根据**xml**解析出来的结果返货**json**格式，便于代码的传输~！

这里我使用的是**MapBar**的地图免费API，其他的如：**Google **就不做说明了～方法类似～截图如下：
[![](/uploads/userup/0905/021309521305.png)](/uploads/userup/0905/021309521305.png)
现在把Mysql.php的全部代码，使用了simpleXML对Google返回的数据进行解析：
PS：关于各个城市的**经纬度**数据，请阅览：[全国各省市，县级城市经纬度**SQL数据**以及js数组](http://js8.in/285.html)

```php
<?php
  include("conn.php");
$strsql="select * from latlon where name=’".$_GET['city']."’";
    $result=mysql_db_query($mysql_database, $strsql, $conn);
    // u83b7u53d6u67e5u8be2u7ed3u679c,1 = name 2= latlon 3=weidu 4 = jingdu
    $row=mysql_fetch_row($result);
    mysql_data_seek($result, 0);
    $row=mysql_fetch_row($result);
    if(empty($row[1])){
        $re =array(        "noCity"=>"no data",
        "yes"=>0,
    );
        echo "";
    }else{
    $nlatlon= $row[4].’,’.$row[3];
    $back=$row[3]*1000000
.$row[4]*1000000;
$url=’http://www.google.com/ig/api?weather=,,,’.$back;
$xml =  simplexml_load_file($url);
$re=array(
    "yes"=>1,
"today" =>(string)($xml->weather->forecast_conditions[0]->condition['data']),
"ssd"=>(string)($xml->weather->current_conditions->temp_c['data']),
"sd"=>(string)($xml->weather->current_conditions->humidity['data']),
"fx"=>(string)($xml->weather->current_conditions->wind_condition['data']),
"icon"=>’http://www.google.com’.($xml->weather->forecast_conditions[0]->icon['data']),
"week1" =>(string)($xml->weather->forecast_conditions[1]->day_of_week['data']),
"week1zuidi" =>(int)((int)((string)($xml->weather->forecast_conditions[1]->low['data'])-32)/1.8+1),
"week1zuigao" =>(int) ((int)((string)($xml->weather->forecast_conditions[1]->high['data'])-32)/1.8+1),
"week1tianqi" =>(string)($xml->weather->forecast_conditions[1]->condition['data']),
"week1icon" =>’http://www.google.com’.($xml->weather->forecast_conditions[1]->icon['data']),
"week2" =>(string)($xml->weather->forecast_conditions[2]->day_of_week['data']),
"week2zuidi" =>(int) ((int)((string)($xml->weather->forecast_conditions[2]->low['data'])-32)/1.8+1),
"week2zuigao" =>(int) ((int)((string)($xml->weather->forecast_conditions[2]->high['data'])-32)/1.8+1),
"week2tianqi" =>(string)($xml->weather->forecast_conditions[2]->condition['data']),
"week2icon" =>’http://www.google.com’.($xml->weather->forecast_conditions[2]->icon['data']),
"week3" =>(string)($xml->weather->forecast_conditions[3]->day_of_week['data']),
"week3zuidi" =>(int) ((int)((string)($xml->weather->forecast_conditions[3]->low['data'])-32)/1.8+1),
"week3zuigao" =>(int) ((int)((string)($xml->weather->forecast_conditions[3]->high['data'])-32)/1.8+1),
"week3tianqi" =>(string)($xml->weather->forecast_conditions[3]->condition['data']),
"week3icon" =>’http://www.google.com’.($xml->weather->forecast_conditions[3]->icon['data']),
"nlatlon" =>$nlatlon,
"googleurl"=>$url,
);
}
echo json_encode($re);
    mysql_free_result($result);
mysql_close($conn);

?>```