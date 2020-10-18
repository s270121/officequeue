<?php
//adding database interaction library
require_once('dao.php');

if(isset($_GET['url'])){
    $var = $_GET['url'];
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $number = intval(preg_replace('/[^0-9]+/', '', $var)); //id number user for query; it is found in  the url ex: localhost:80/users/id
        switch($var){
            case "users":
                //GET ALL USERS TABLE INFO
                echo "users to be implemented";
            break;
            case "tickets":
                //GET ALL TICKETS INFO
                echo "users to be implemented";
            break;
            case "counters":
                //GET ALL COUNTERS INFO
                echo "users to be implemented";
            break;
            case "requests":
                echo "users to be implemented";
                //GET ALL REQUESTS INFO
            break;
            case "servedTickets":
                echo "users to be implemented";
                //GET ALL SERVED TICKETS INFO
            break;

        }
    }
}


?>