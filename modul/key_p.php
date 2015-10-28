<?php
$str = iconv("GBK", "utf-8", "芸芸众生绿水青山名胜古迹敞开心胸便会云蒸霞蔚快乐将永远伴随着你"); 
if(!is_string($str) || !mb_check_encoding($str,"utf-8")) 
{ 
exit("不是字符串或者不是utf-8"); 
} 
$zhongwenku_size; 
// 按UTF-8编码方式获取字符串的长度 
$zhongwenku_size = mb_strlen($str,"UTF-8"); 
// 把上述字符导入数组中 
$zhongwenku = array(); 
for( $i=0; $i<$zhongwenku_size; $i++) 
{ 
$zhongwenku[$i] = mb_substr($str, $i,1,"UTF-8"); 
} 
$result = ""; 
// 图片上要写入的四个字符 
for($i=0; $i<4; $i++) 
{ 
switch (rand(0, 1)) 
{ 
case 0: 
$result.=$zhongwenku[rand(0, $zhongwenku_size-1)]; 
break; 
case 1: 
$result.=dechex(rand(0,15)); 
break; 
} 

} 
$_SESSION["check"] = $result; 

// 创建一个真彩图片 宽100，高30 
$img = imagecreatetruecolor(100, 30); 
// 分配背景颜色 
$bg = imagecolorallocate($img, 0, 0, 0); 
// 分配文字颜色 
$te = imagecolorallocate($img, 255,255,255); 
// 在图片上写字符串 
//imagestring($img, rand(3,8), rand(1,70), rand(1,10), $result, $te); 
// 在图片上根据载入字体可以写出特殊字体 
imagettftext($img, 13, rand(2, 9), 20 ,20, $te, "MSYH.TTF",$result); 
$_SESSION["check"] = $result; 
for($i=0; $i<3; $i++) 
{ 
// $t = imagecolorallocate($img, rand(0, 255),rand(0, 255),rand(0, 255)); 
// 画线 
imageline($img, 0, rand(0, 20), rand(70,100), rand(0, 20), $te); 
} 
$t = imagecolorallocate($img, rand(0, 255),rand(0, 255),rand(0, 255)); 
// 为图片添加噪点 
for($i=0; $i<200; $i++) 
{ 
imagesetpixel($img, rand(1, 100), rand(1, 30), $t); 
} 
// 发送http头信息 指定本次发送的是image中的jpeg 
header("Content-type: image/jpeg"); 
// 输出jpeg图片至浏览器 
imagejpeg($img); 
?> 
<form action="" method="post"> 
<img src="http://freetofind.sinaapp.com/link.php?m=key_p"/> </br> 
<input type="text" name="check"></br> 
<input type="submit" value="submit"></br> 
</form> 
