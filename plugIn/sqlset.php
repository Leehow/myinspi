<?php
require './kern/LeeFramework.php';

//$s=new sqluse("localhost", "root", "leehow","dq_talk");
$sql_data = "
  CREATE TABLE IF NOT EXISTS `data` (
  `data_id` int(11) NOT NULL AUTO_INCREMENT,
  `data_upid` int(11) DEFAULT NULL,
  `data_author` int(11) NOT NULL,
  `data_kind` int(11) NOT NULL DEFAULT '1',
  `data_content` text NOT NULL,
  `data_time` int(11) NOT NULL,
  `data_ctime` int(11) NOT NULL,
  PRIMARY KEY (`data_id`)
  ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=184 ;";
$sql_usr = "
CREATE TABLE IF NOT EXISTS `usr` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`usr_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=408 ;";
    
    
$s->mq($sql_data);
$s->mq($sql_usr);
echo "sucssess!";
$s->close();
?>