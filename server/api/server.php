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
                getAllRequestsType();
            break;
            case "servedTickets":
                echo "servedtickets to be implemented";
                //GET ALL SERVED TICKETS INFO
            break;
            case "getTicket":
                $type = "SHPP";
                getTicket($type);
            break;
            default:
                echo "Invalid API!";

        }
    }
    else if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $number = intval(preg_replace('/[^0-9]+/', '', $var)); //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        switch($var){
            case "users":
                
                echo "users post to be implemented";
            break;
            case "tickets":
                
                echo "tickets post to be implemented";
            break;
            case "counters":
               
                echo "counters post to be implemented";
            break;
            case "requests":
                echo "requests post to be implemented";
               
            break;
            case "servedTickets":
                echo "servedtickets post to be implemented";
               
            break;
            case "freeCounter":
                $id = $_GET['id'];
                iAmReady($id);
            break;
            default:
                echo "Invalid API!";

        }
    }
    else if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
        $number = intval(preg_replace('/[^0-9]+/', '', $var)); //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        switch($var){
            case "users":
                
                echo "users delete to be implemented";
            break;
            case "tickets":
                resetTickets();
            break;
            case "counters":
                
                echo "counters delete to be implemented";
            break;
            case "requests":
                echo "requests delete to be implemented";
                
            break;
            case "servedTickets":
                echo "servedtickets delete to be implemented";
                
            break;
            
        }
    }
    else if($_SERVER['REQUEST_METHOD'] == 'PUT'){
        $number = intval(preg_replace('/[^0-9]+/', '', $var)); //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        switch($var){
            case "users":
                
                echo "users put to be implemented";
            break;
            case "tickets":
                
                echo "tickets put to be implemented";
            break;
            case "counters":
                
                echo "counters put to be implemented";
            break;
            case "requests":
                echo "requests put to be implemented";
                
            break;
            case "servedTickets":
                echo "servedtickets put to be implemented";
                
            break;


        }
    }
    else{
        //nothing
    }
}
else{
    //nothing
}


?>