<?php
lee::lib_load( "usr",$updir);
class logout extends usr_use {}
logout::logout();
//header("Location: http://".$_SERVER['HTTP_HOST']);
echo json_encode(1);
?>
