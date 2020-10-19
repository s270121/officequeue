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
//TODO : to support getTicket()
function getEstimatedWaitingTime ($idRequest, $serviceTime) {
    return 99;
}

//insert the user in a queue according to the specified request type
function insertTicket($idRequest){
    global $db;
    
    $sql = "SELECT * FROM REQUESTS WHERE idRequest='$idRequest'";
    $row = $db->query($sql)->fetchArray(SQLITE3_ASSOC);
    if (!empty($row)) {
        $requestCode = $row['requestCode'];
        $requestName = $row['requestName'];
        $serviceTime = $row['serviceTime'];
    }
    else {
        return 0;
    }

    $sql = "SELECT MAX(ticketNumber) AS last FROM TICKETS WHERE date=CURRENT_DATE";
    $ticketNumber = str_pad( $db->query($sql)->fetchArray(SQLITE3_ASSOC)['last']+1, 4, "0", STR_PAD_LEFT );

    $estimatedTime = getEstimatedWaitingTime($idRequest, $serviceTime);
    $idTicket = date('Ymd') . $requestCode . $ticketNumber;

    $sql = "INSERT INTO TICKETS ('idTicket', 'requestCode', 'ticketNumber', 'estimatedTime', 'date') VALUES ('$idTicket', '$requestCode', '$ticketNumber', '$estimatedTime', CURRENT_DATE)";
    $result = $db->exec($sql);
    if ($result)
        return array(
            "ticketNumber" => $ticketNumber,
            "estimatedTime" => $estimatedTime,
            "requestName" => $requestName
        );
    else
        return 0;
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
            "serviceTime" => $row['serviceTime'],
			"requestName" => $row['requestName']
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