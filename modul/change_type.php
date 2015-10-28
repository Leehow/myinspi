<?php
lee::lib_load("cont");
$conid	 =$_GET['conid'];

content::change_kind($conid,"con_content_public");