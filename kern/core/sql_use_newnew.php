<?php

class sql_use_k {
    //    以后要是要改配置文件啥的别忘了改这里
    static public $data_table                 = "data";
    static public $data_id                    = "data_id";
    static public $data_columns               = array(
                        upid	=> "data_upid",
                        author	=> "data_author",
                        kind	=> "data_kind",
                        content => "data_content",
                        time	=> "data_time",
                        createtime	=> "data_createtime",
                        changetime	=> "data_changetime"
                );
    
    static function select_c($columns,$where,$page,$pagesize);
    
    static function select_w($where,$page,$pagesize);
    
    static function select($kind,$where,$page,$pagesize,$order);
    
    static function insert($value,$kind,$upid=null,$author=null){
        if(!$author){
            $author=data_use::get_usr('userid'); 
            if(!$author){
                die("请登录后重试！");
            }
        }
        if(is_array($value)){
                foreach ($value as $c){
                    $values=array($upid,$author,$kind,$c,time(),time(),time());
                    $out=sql_use::insert(self::$data_table, self::$data_columns, $values);
                }
                
                return $out;
            }
            else{
                $values=array($upid,$author,$kind,$value,time(),time(),time());
                return sql_use::insert(self::$data_table, self::$data_columns, $values);
            }
    }
    
    static function update_w($columns=null,$value,$where,$author=null){
        if(!$author){
                $author= data_use::get_usr('userid');
                if(!$author){
                    die("请登录后重试！");
                }
                $where= $where." and ".self::$data_columns[author]."=".$author;    //只能修改自己的
        }
        if(!$columns){
            $columns=self::$data_columns[content];
        }
        
        sql_use::update_nowtime(self::$data_table, self::$data_columns[changetime], $where);
        $result=sql_use::update_one(self::$data_table, $columns, $value, $where);
        return $result;
    }
    static function update($value,$id=null,$kind=null,$upid=null,$author=null,$where=null){
        if(!$where){
            $where="1=1";
        }
        if($id){
            $where_plus= " and ".self::$data_id."=".$id;
        }
        if($kind && $upid){
            $where_plus= " and ".self::$data_columns[upid]."=".$upid." and ".self::$data_columns[kind]."='".$kind."'";
        }
        if($where_plus){
            $where=$where.$where_plus;
        }
        return self::update_w(null, $value, $where, $author);
    }
    
    static function delete_w($where,$author=null){
        if(!$author){
            $author= data_use::get_usr('userid');
            if(!$author){
                die("请登录后重试！");
            }
            $where= $where." and ".self::$data_columns[author]."=".$author;    //只能修改自己的
        }
        return sql_use::delet(self::$data_table, $where);
    }
    
    static function delete($id=null,$kind=null,$upid=null,$author=null,$where=null){
        if (!$where){
            $where="1=1";
        }
       if($id){
            $where_plus= " and ".self::$data_id."=".$id;
        }
        if($upid){
            $where_plus= " and ".self::$data_columns[upid]."=".$upid;
        }
        if($kind){
            $where_plus= $where_plus." and ".self::$data_columns[kind]."='".$kind."'";
        }
        if($where_plus){
            $where=$where.$where_plus;
        }
        self::delete_w($where, $author);
    }
    
    
    //------------------------------------------------------分割线，下面是一些常用的方便使用的函数
    
    static function add_one($id=null,$kind=null,$upid=null,$author=null,$where=null){
        if(!$author){
            $author= data_use::get_usr('userid');
            if(!$author){
                die("请登录后重试！");
            }
            $where= $where." and ".self::$data_columns[author]."=".$author;    //只能修改自己的
        }
        $columns=self::$data_columns[content];
        if($id){
            $where_plus= " and ".self::$data_id."=".$id;
        }
        if($kind && $upid){
            $where_plus= " and ".self::$data_columns[upid]."=".$upid." and ".self::$data_columns[kind]."='".$kind."'";
        }
        if($where_plus){
            $where=$where.$where_plus;
        }
        sql_use::update_nowtime(self::$data_table, self::$data_columns[changetime], $where);
        $result=sql_use::update_addone(self::$data_table, $columns, $where);
        return $result;
    }
    static function del_one($id=null,$kind=null,$upid=null,$author=null,$where=null){
        if(!$author){
            $author= data_use::get_usr('userid');
            if(!$author){
                die("请登录后重试！");
            }
            $where= $where." and ".self::$data_columns[author]."=".$author;    //只能修改自己的
        }
        $columns=self::$data_columns[content];
        if($id){
            $where_plus= " and ".self::$data_id."=".$id;
        }
        if($kind && $upid){
            $where_plus= " and ".self::$data_columns[upid]."=".$upid." and ".self::$data_columns[kind]."='".$kind."'";
        }
        if($where_plus){
            $where=$where.$where_plus;
        }
        sql_use::update_nowtime(self::$data_table, self::$data_columns[changetime], $where);
        $result=sql_use::update_delone(self::$data_table, $columns, $where);
        return $result;
    }
}