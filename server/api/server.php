<?php
//adding database interaction library
require_once('dao.php');

if(isset($_GET['url'])){
    $var = $_GET['url'];
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $number = intval(preg_replace('/[^0-9]+/', '', $var)); //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        switch($var){
            case "users":
                //GET ALL USERS TABLE INFO
                echo "users to be implemented";
            break;
            case "tickets":
                //GET ALL TICKETS INFO
                echo "tickets to be implemented";
            break;
            case "counters":
                //GET ALL COUNTERS INFO
                echo "counters to be implemented";
            break;
            case "requests":
                echo "requests to be implemented";
                //GET ALL REQUESTS INFO
            break;
            case "servedTickets":
                echo "servedtickets to be implemented";
                //GET ALL SERVED TICKETS INFO
            break;

        }
    }
    else if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $number = intval(preg_replace('/[^0-9]+/', '', $var)); //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        switch($var){
            case "users":
                //GET ALL USERS TABLE INFO
                echo "users post to be implemented";
            break;
            case "tickets":
                //GET ALL TICKETS INFO
                echo "tickets post to be implemented";
            break;
            case "counters":
                //GET ALL COUNTERS INFO
                echo "counters post to be implemented";
            break;
            case "requests":
                echo "requests post to be implemented";
                //GET ALL REQUESTS INFO
            break;
            case "servedTickets":
                echo "servedtickets post to be implemented";
                //GET ALL SERVED TICKETS INFO
            break;


        }
    }
    else if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
        $number = intval(preg_replace('/[^0-9]+/', '', $var)); //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        switch($var){
            case "users":
                //GET ALL USERS TABLE INFO
                echo "users delete to be implemented";
            break;
            case "tickets":
                //GET ALL TICKETS INFO
                echo "tickets delete to be implemented";
            break;
            case "counters":
                //GET ALL COUNTERS INFO
                echo "counters delete to be implemented";
            break;
            case "requests":
                echo "requests delete to be implemented";
                //GET ALL REQUESTS INFO
            break;
            case "servedTickets":
                echo "servedtickets delete to be implemented";
                //GET ALL SERVED TICKETS INFO
            break;


        }
    }
}
else{
    //nothing
}


?>