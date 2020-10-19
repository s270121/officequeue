async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:80/project1/server/api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((obj) => { 
                    resolve(obj);
                }); 
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) });
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) });
    });
}

async function createNewTicket(type) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:80/project1/server/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({type: type}),
        }).then((response) => {
            //If the ticket is created resolve, else reject
            if (response.ok) {
                resolve();
            } else {
                reject({error: "Error in creating a ticket"});
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) });
    });
}

async function getRequestTypes() {
    const response = await fetch("http://localhost:80/project1/server/api/requests");
    const requestTypes = await response.json();
    if(response.ok) {
        return requestTypes.map((type) => type.idRequest);
    } else {
        let err = {status: response.status, errorObj: requestTypes};
        throw err; 
    }
}

async function getNumberOfCustomers() {
    const response = await fetch("http://localhost:80/project1/server/api/requests");       //To be defined
    const n = await response.json();
    if(response.ok) {
        return n;
    } else {
        let err = {status: response.status, errorObj: n};
        throw err; 
    }
}

async function getAllCounters() {
    const response = await fetch("http://localhost:80/project1/server/api/counters");
    const counters = await response.json();
    if(response.ok) {
        return counters;
    } else {
        let err = {status: response.status, errorObj: counters};
        throw err; 
    }
}

const API = { userLogin, createNewTicket, getRequestTypes, getNumberOfCustomers, getAllCounters };
export default API;