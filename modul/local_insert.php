<?php
//lee::lib_load("cont");

$country    = 464; //德国2
$bundes     = $_POST['bundes'];     //州名
$city       = $_POST['city'];     //城市名称

echo $bundes."<br>";
print_r($city);
//echo $city;

class con extends content {
    static function insert_con($country, $bundes, $city,$limitwords){
        $result=self::insert_sudo($bundes, 1, 'local_bundes', $country, $limitwords);
//        $result=self::insert($bundes, 'local_bundes', $country, $limitwords);
        foreach ($city as $v) {
            if($v){
                self::insert_sudo($v, 1, 'local_city', $result, $limitwords);
                
//                self::insert($v, 'local_city', $result, $limitwords);
            }
        }
        return $result;
    }
}
//$result=con::insert_con($country,$bundes,$city,100);
//echo $result;
?>

<html>
    <body>
        <form action="link.php?m=local_insert" method="post">
            <p>州：<input type="text" name="bundes"/><input type="submit" /></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p><p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p><p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p><p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            <p>城市：<input type="text" name="city[]"/></p>
            
            
            
            
        </form>
        
        
    </body>
    
    
</html>