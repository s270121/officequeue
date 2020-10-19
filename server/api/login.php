<?php

require_once('dao.php');
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $postBody = file_get_contents("php://input");
    $input = (json_decode($postBody));
    $return = checkLogin($input->username, $input->password);
    if($return == 0){
        echo (json_encode($return));
    }
    else {
        session_start();
        $_SESSION['user_id'] = $return['user_id'];
        $conv = json_encode($return);
        echo ($conv);
    }
}

?>