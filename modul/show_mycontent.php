<?php

//lee::lib_load("usr");
lee::lib_load("cont");
$page    =$_GET['page'];
$pagesize  =$_GET['pagesize'];
$id  =$_GET['tapid'];
$search  =$_GET['search'];
//echo json_encode($page) ;
class con extends content {
    static function select_con($kindkey,$page,$pagesize=null,$tid=null,$search=null){
        $where="1=1";
        if($tid){
            $where=$where." and ".sql_use_f::$data_id."=".$tid;
            $result[] = con::select("con_content",$kindkey,0,1,$where);
            $id=sql_use_f::select("id",sql_use_f::$data_columns["upid"]."=".$tid,"con_content");
            if(!$id){
                return $result;
            }
            $id = array_reverse($id);//倒序数组 按时间顺序出现
            foreach ($id as $eid) {
                $where=sql_use_f::$data_id."=".$eid[sql_use_f::$data_id];
                $result[] = con::select("con_content",$kindkey,0,1,$where);
            }
            return $result;
        }
        else{
            $myid=data_use::get_usr('userid');
            $where=$where." and ".sql_use_f::$data_columns[author]."=".$myid;
        }
        //有search的情况下进行筛选
        if($search){
            $where=$where." and ".sql_use_f::$data_columns[content]." like '%".$search."%'";
        }
        //查找数据
        $result = con::select("con_content",$kindkey,$page,$pagesize,$where);
        return $result;
    }
}

////如果类别是数组的情况下
//if("all_list"==$kindkey){
////    $kind=array("con_pic","con_type");
//    $kind="con_pic";
//}
$kind=array("con_pic","con_audi","con_swf","con_ytb");

$result=con::select_con($kind, $page,$pagesize,$id,$search);

echo json_encode($result) ; 

