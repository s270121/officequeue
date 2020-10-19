<?php
//adding database interaction library
require_once('dao.php');
header('Content-Type: application/json');
if(isset($_GET['url'])){
    $var = $_GET['url'];
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $number = intval(preg_replace('/[^0-9]+/', '', $var)); //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        switch($var){
            case "users":
                //GET ALL USERS TABLE INFO
                echo json_encode(getAllUsers());
            break;
            case "tickets":
                //GET ALL TICKETS INFO
                echo json_encode(getAllTickets());
            break;
            case "counters":
                //GET ALL COUNTERS INFO
                echo json_encode(getAllCounters());
            break;
            case "requests":
                //GET ALL REQUESTS INFO
                echo json_encode(getAllRequests());
            break;
            case "servedTickets":
                //GET ALL SERVED TICKETS INFO
                echo json_encode(getAllServedTickets());
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
            //returns ticket number and estimated waiting time given a request type; returns 0 on error.
            case "tickets/$number":
                echo json_encode(insertTicket($number));
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
                echo deleteAllTickets();
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
            default:
                echo "Invalid API!";
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
            //SET THE COUNTER WITH THE GIVEN ID AS FREE; RETURNS THE NUMBER OF AFFECTED ROWS.
            case "counterReady/$number":
                echo setCounterAsReady($number);
            break;
            default:
                echo "Invalid API!";
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