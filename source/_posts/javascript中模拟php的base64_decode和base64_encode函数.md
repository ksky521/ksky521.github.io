title: "Javascript中模拟PHP的base64_decode和base64_encode函数"
id: 532
date: 2010-05-03 16:45:43
tags:
- javascript
categories:
- 前端开发
---
PHP中的base64_decode和base64_encode函数不再是PHP的独享，而JS也可以使用这两个函数，下面把JS中的base64_decode和base64_encode函数贴出来，希望对需要的童鞋有所帮助~

### javscript的base64_decode

<!--more-->
> 
```javascript
function base64_decode (data) {    
>     // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
>     // *     returns 1: 'Kevin van Zonneveld'  
> 
>     var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
>     var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
> 
>     if (!data) {
>         return data;
>     }
> 
>     data += '';
> 
>     do {  // unpack four hexets into three octets using index points in b64
>         h1 = b64.indexOf(data.charAt(i++));
>         h2 = b64.indexOf(data.charAt(i++));
>         h3 = b64.indexOf(data.charAt(i++));
>         h4 = b64.indexOf(data.charAt(i++));
> 
>         bits = h1<<18 | h2<<12 | h3<<6 | h4;
> 
>         o1 = bits>>16 & 0xff;
>         o2 = bits>>8 & 0xff;
>         o3 = bits & 0xff;
> 
>         if (h3 == 64) {
>             tmp_arr[ac++] = String.fromCharCode(o1);
>         } else if (h4 == 64) {
>             tmp_arr[ac++] = String.fromCharCode(o1, o2);
>         } else {
>             tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
>         }
>     } while (i < data.length);
> 
>     dec = tmp_arr.join('');
>     dec = this.utf8_decode(dec);
> 
>     return dec;
> }```

### javscript的base64_encode

> 
```javascript
function base64_encode (data) {
>     // Encodes string using MIME base64 algorithm  
>     // *     example 1: base64_encode('Kevin van Zonneveld');
>     // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='  
> 
>     var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
>     var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc="", tmp_arr = [];
> 
>     if (!data) {
>         return data;
>     }
> 
>     data = this.utf8_encode(data+'');
> 
>     do { // pack three octets into four hexets
>         o1 = data.charCodeAt(i++);
>         o2 = data.charCodeAt(i++);
>         o3 = data.charCodeAt(i++);
> 
>         bits = o1<<16 | o2<<8 | o3;
> 
>         h1 = bits>>18 & 0x3f;
>         h2 = bits>>12 & 0x3f;
>         h3 = bits>>6 & 0x3f;
>         h4 = bits & 0x3f;
> 
>         // use hexets to index into b64, and append result to encoded string
>         tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
>     } while (i < data.length);
> 
>     enc = tmp_arr.join('');
> 
>     switch (data.length % 3) {
>         case 1:
>             enc = enc.slice(0, -2) + '==';
>         break;
>         case 2:
>             enc = enc.slice(0, -1) + '=';
>         break;
>     }
> 
>     return enc;
> }```