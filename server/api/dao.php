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

function getAllRequestsType(){
    global $db;

    $sql = "SELECT * FROM REQUESTS";
    $result = $db->query($sql);
    while ($row = $result->fetchArray(SQLITE3_ASSOC))
        echo json_encode($row);
}

//resets the queue every morning
function resetTickets() {
    global $db;

    $sql = "DELETE FROM TICKETS";
    $db->exec($sql);
}

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
function getTicketId ($requestType) {
    $id = 99;
    return $id;
}

//set isReady to true, given a counter ID
function iAmReady($counterId) {
    global $db;

    $query = $db->exec('UPDATE COUNTERS SET isReady=true WHERE idCounter="$counterId"');
    if ($query)
        echo 'Number of rows modified: ', $db->changes();
}

//returns the list of available counters to officier starting is 
function getAveilableCounters () {

}


?>