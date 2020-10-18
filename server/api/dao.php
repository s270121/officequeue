<?php
//do the connection with database 

$db = new SQLite3("../office-queue.db");
if($db){
    



}
else{
    die("database connection error");
}

function checkLogin($username, $password){
    global $db;
    $sql1 = "SELECT * FROM USERS WHERE USERNAME= '".$username."' AND PASSWORD='".$password."'";
    $result = $db->query($sql1)->fetchArray(SQLITE3_ASSOC);
    if($result){
        return $result;
    }
    else
        return 0;

}


?>