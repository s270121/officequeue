<?php
//do the connection with database 

$db = new SQLite3("../office-queue.db");
if($db) {

}
else {
    die("database connection error");
}
header('Content-Type: application/json');
function checkLogin($username, $password){
    global $db;
    $sql = "SELECT * FROM USERS WHERE USERNAME= '".$username."' AND PASSWORD='".$password."'";
    $result = $db->query($sql)->fetchArray(SQLITE3_ASSOC);
    if($result)
        return $result;
    else
        return 0;
}

######################################################
##################      DELETE      ##################
######################################################

//resets the queue every morning
function deleteAllTickets() {
    global $db;

    $sql = "DELETE FROM TICKETS";
    $result = $db->exec($sql);
    if ($result)
        return $db->changes();
    else
        return 0;
}

######################################################
##################      POST        ##################
######################################################

//insert the user in a queue according to the specified request type
function getTicket($requestType){
    $idTicket = getTicketId($requestType);
    $estimatedTime = getEstimatedWaitingTime($requestType);

    global $db;
    $sql = "INSERT INTO TICKETS (idTicket, idRequest, estimatedTime) VALUES ($idTicket, $idRequest, $estimatedTime)";
    $db->exec($sql);
}
//TODO : to support getTicket()
function getEstimatedWaitingTime ($requestType) {
    $time = 99;
    return $time;
}
//TODO : to support getTicket()
function getTicketId ($requestType) {
    $id = 99;
    return $id;
}

######################################################
##################      PUT         ##################
######################################################

//set isReady to true, given a counter ID
function setCounterAsReady($counterId) {
    global $db;

    $sql = "UPDATE COUNTERS SET isReady=true WHERE idCounter='$counterId'";
    $result = $db->exec($sql);
    if ($result)
        return $db->changes();
    else
        return 0;
}

######################################################
##################      GET         ##################
######################################################

//returns the list of available counters to officier starting his turn 
function getAllAvailableCounters () {
    global $db;

    $sql = "SELECT * FROM COUNTERS WHERE idUser IS NULL";
    $result = $db->query($sql);
    while ($row = $result->fetchArray(SQLITE3_ASSOC))
        echo json_encode($row);
}

function getAllRequests(){
    global $db;

    $sql = "SELECT * FROM REQUESTS";
    $result = $db->query($sql);
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $subArray = array(
            "idRequest" => $row['idRequest'],
            "serviceTime" => $row['serviceTime']
        );
        $data[] = $subArray;
    }
    return $data;
}

function getAllUsers(){
    global $db;

    $sql = "SELECT * FROM USERS";
    $result = $db->query($sql);
    $data = array();
    while ($row = $result->fetchArray(SQLITE3_ASSOC)){
        $subArray = array(
            "username" => $row['username'],
            "password" => $row['password'],
            "role" => $row['role'],
            "user_id" => $row['user_id']
        );
        $data[] = $subArray;
    }
    return $data;       
}

function getAllTickets(){
    global $db;

    $sql = "SELECT * FROM TICKETS";
    $result = $db->query($sql);
    $data = array();
    while ($row = $result->fetchArray(SQLITE3_ASSOC)){
        $subArray = array(
            "idTicket" => $row['idTicket'],
            "idRequest" => $row['idRequest'],
            "ticketNumber" => $row['ticketNumber'],
            "estimatedTime" => $row['estimatedTime'],
            "hasBeenServed" => $row['hasBeenServed'],
            "date" => $row['date']
        );
        $data[] = $subArray;
    }
    return $data;
}

function getAllCounters(){
    global $db;

    $sql = "SELECT * FROM COUNTERS";
    $result = $db->query($sql);
    $data = array();
    while ($row = $result->fetchArray(SQLITE3_ASSOC)){
        $subArray = array(
            "idCounter" => $row['idCounter'],
            "idRequest" => $row['idRequest']
        );
        $data[] = $subArray;
    }
    return $data;
}

function getAllServedTickets(){
    global $db;

    $sql = "SELECT * FROM SERVEDTICKETS";
    $result = $db->query($sql);
    $data = array();
    while ($row = $result->fetchArray(SQLITE3_ASSOC)){
        $subArray = array(
            "idTicket" => $row['idTicket'],
            "idCounter" => $row['idCounter'],
            "idRequest" => $row['idRequest'],
            "date" => $row['date']
        );
        $data[] = $subArray;
    }
    return $data;
}

?>