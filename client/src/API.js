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
        return requestTypes;
    } else {
        let err = {status: response.status, errorObj: requestTypes};
        throw err; 
    }
}

const API = { userLogin, createNewTicket, getRequestTypes};
export default API;