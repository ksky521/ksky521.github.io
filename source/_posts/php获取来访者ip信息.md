title: "php获取来访者IP信息"
id: 509
date: 2010-03-23 05:25:34
tags:
- php
- 网络技术
categories:
- 后端运维
---
前几天幼学笔记写了一篇《[可以在前端实现的几个地理位置小功能](http://www.oncoding.cn/2010/geo-location-frontend/)》里面提到了我使用的QQ ip接口，其实我们也可以在PHP端实现根据IP定位用户**地理位置**，方法就是根据纯真的IP库来获取IP地理信息。我一个**Google map API**逆经纬度查询结合IP数据库接口的demo[[点击查看](http://js8.in/mywork/ipsearch/)]，其实使用的方法就是Ajax过去IP，通过QQ IP接口查询出来地理信息，然后调用Google map API逆经纬度查询经纬度信息，然后在Google地图上标注地理位置。

### 1、PHP获取来访者IP函数getIP()


```php
function getIP()
{ 
        if(getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")) 
                $ip = getenv("HTTP_CLIENT_IP"); 
        elseif(getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown")) 
                $ip = getenv("HTTP_X_FORWARDED_FOR"); 
        elseif (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown")) 
                $ip = getenv("REMOTE_ADDR"); 
        elseif (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) 
                $ip = $_SERVER['REMOTE_ADDR']; 
        else 
                $ip = "0.0.0.0"; 
        return $ip;
}```<!--more-->

### 2、查询纯真IP库PHP类IpLocation


```php
class IpLocation {
    /**
     * QQWry.Dat文件指针
     *
     * @var resource
     */
    var $fp;
    /**
    * 第一条IP记录的偏移地址
     *
    * @var int
       */
       var $firstip;
         /**
        * 最后一条IP记录的偏移地址
        *
        * @var int
        */
       var $lastip;
        /**
        * IP记录的总条数（不包含版本信息记录）
        *
        * @var int
        */
       var $totalip;
         /**
        * 返回读取的长整型数
        *
       * @access private
        * @return int
        */
       function getlong() {
           //将读取的little-endian编码的4个字节转化为长整型数
           $result = unpack('Vlong', fread($this->fp, 4));
           return $result['long'];
       }
         /**
        * 返回读取的3个字节的长整型数
        *
        * @access private
        * @return int
       */
       function getlong3() {
           //将读取的little-endian编码的3个字节转化为长整型数
           $result = unpack('Vlong', fread($this->fp, 3).chr(0));
           return $result['long'];
       }
    /**
     * 返回压缩后可进行比较的IP地址
     *
       * @access private
        * @param string $ip
        * @return string
        */
       function packip($ip) {
           // 将IP地址转化为长整型数，如果在PHP5中，IP地址错误，则返回False，
        // 这时intval将Flase转化为整数-1，之后压缩成big-endian编码的字符串
        return pack('N', intval(ip2long($ip)));
    }
    /**
     * 返回读取的字符串
        *
        * @access private
        * @param string $data
        * @return string
     */
    function getstring($data = "") {
        $char = fread($this->fp, 1);
        while (ord($char) > 0) {        // 字符串按照C格式保存，以\0结束
            $data .= $char;             // 将读取的字符连接到给定字符串之后
            $char = fread($this->fp, 1);
        }
           return $data;
       }
      /**
     * 返回地区信息
     *
     * @access private
     * @return string
     */
    function getarea() {
        $byte = fread($this->fp, 1);    // 标志字节
           switch (ord($byte)) {
            case 0:                     // 没有区域信息
                 $area = "";
                 break;
             case 1:
             case 2:                     // 标志字节为1或2，表示区域信息被重定向
                 fseek($this->fp, $this->getlong3());
                 $area = $this->getstring();
                 break;
             default:                    // 否则，表示区域信息没有被重定向
                 $area = $this->getstring($byte);
                break;
        }
        return $area;
    }
    /**
     * 根据所给 IP 地址或域名返回所在地区信息
     *
     * @access public
     * @param string $ip
     * @return array
      */
    function getlocation($ip) {
        if (!$this->fp) return null;            // 如果数据文件没有被正确打开，则直接返回空
        $location['ip'] = gethostbyname($ip);   // 将输入的域名转化为IP地址
        $ip = $this->packip($location['ip']);   // 将输入的IP地址转化为可比较的IP地址
                                               // 不合法的IP地址会被转化为255
        // 对分搜索
        $l = 0;                         // 搜索的下边界
        $u = $this->totalip;            // 搜索的上边界
        $findip = $this->lastip;        // 如果没有找到就返回最后一条IP记录（QQWry.Dat的版本信息）
         while ($l <= $u) {              // 当上边界小于下边界时，查找失败
             $i = floor(($l + $u) / 2);  // 计算近似中间记录
            fseek($this->fp, $this->firstip + $i * 7);
            $beginip = strrev(fread($this->fp, 4));     // 获取中间记录的开始IP地址
            // strrev函数在这里的作用是将little-endian的压缩IP地址转化为big-endian的格式
            // 以便用于比较，后面相同。
            if ($ip < $beginip) {       // 用户的IP小于中间记录的开始IP地址时
                $u = $i - 1;            // 将搜索的上边界修改为中间记录减一
            }
            else {
                 fseek($this->fp, $this->getlong3());
                 $endip = strrev(fread($this->fp, 4));   // 获取中间记录的结束IP地址
                 if ($ip > $endip) {     // 用户的IP大于中间记录的结束IP地址时
                    $l = $i + 1;        // 将搜索的下边界修改为中间记录加一
                }
                else {                  // 用户的IP在中间记录的IP范围内时
                    $findip = $this->firstip + $i * 7;
                    break;              // 则表示找到结果，退出循环
                }
            }
         }
         //获取查找到的IP地理位置信息
         fseek($this->fp, $findip);
         $location['beginip'] = long2ip($this->getlong());   // 用户IP所在范围的开始地址
        $offset = $this->getlong3();
        fseek($this->fp, $offset);
        $location['endip'] = long2ip($this->getlong());     // 用户IP所在范围的结束地址
        $byte = fread($this->fp, 1);    // 标志字节
        switch (ord($byte)) {
             case 1:                     // 标志字节为1，表示国家和区域信息都被同时重定向
                 $countryOffset = $this->getlong3();         // 重定向地址
                 fseek($this->fp, $countryOffset);
                 $byte = fread($this->fp, 1);    // 标志字节
                 switch (ord($byte)) {
                    case 2:             // 标志字节为2，表示国家信息又被重定向
                        fseek($this->fp, $this->getlong3());
                        $location['country'] = $this->getstring();
                        fseek($this->fp, $countryOffset + 4);
                        $location['area'] = $this->getarea();
                         break;
                     default:            // 否则，表示国家信息没有被重定向
                         $location['country'] = $this->getstring($byte);
                         $location['area'] = $this->getarea();
                         break;
                 }
                break;
            case 2:                     // 标志字节为2，表示国家信息被重定向
                fseek($this->fp, $this->getlong3());
                $location['country'] = $this->getstring();
                 fseek($this->fp, $offset + 8);
                 $location['area'] = $this->getarea();
                 break;
             default:                    // 否则，表示国家信息没有被重定向
                 $location['country'] = $this->getstring($byte);
                 $location['area'] = $this->getarea();
                 break;
        }
        if ($location['country'] == " CZNET") {  // CZNET表示没有有效信息
            $location['country'] = "未知";
         }
         if ($location['area'] == " CZNET") {
             $location['area'] = "";
         }
         return $location;
     }
     /**
     * 构造函数，打开 QQWry.Dat 文件并初始化类中的信息
     *
       * @param string $filename
       * @return IpLocation
       */
      function IpLocation($filename = "QQWry.Dat") {
          $this->fp = 0;
          if (($this->fp = @fopen($filename, 'rb')) !== false) {
              $this->firstip = $this->getlong();
              $this->lastip = $this->getlong();
              $this->totalip = ($this->lastip - $this->firstip) / 7;
           //注册析构函数，使其在程序执行结束时执行
           register_shutdown_function(array(&$this, '_IpLocation'));
       }
   }
   /**
    * 析构函数，用于在页面执行结束后自动关闭打开的文件。
    *
    */
   function _IpLocation() {
       if ($this->fp) {
              fclose($this->fp);
        }
        $this->fp = 0;
   }
}```

### 3、使用方法


```php
$ip=getIP();
$iplocation = new IpLocation();
$location = $iplocation->getlocation($ip);
//转码为UTF-8
$address=mb_convert_encoding($location['country'].$location['area'], "UTF-8", "GBK");```