<?php
require './kern/LeeFramework.php';
$updir='./';
lee::get_ini($updir);
$p=$_GET['p'];
$page=$_GET['page'];
if (!$p)
$p='index';
if (!$page)
$page=1;





if ($p=='index'){
    lee::template_load('page.html',$updir);
}
elseif($p=='showout'){
    lee::template_load('showout.html',$updir);
}


?>