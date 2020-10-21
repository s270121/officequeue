async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:80/project1/server/api/login.php', {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
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
        fetch('http://localhost:80/project1/server/api/insertTicketsWithType', {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: JSON.stringify({type: type}),
        }).then((response) => {
            //If the ticket is created resolve, else reject
            if (response.ok) {
                response.json().then((obj) => { 
                    resolve(obj);
                }); 
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

async function getNumberOfCustomers(type) {
    const response = await fetch("http://localhost/project1/server/api/getTicketsWithRequestType?req="+type); 
    const n = await response.json();
    if(response.ok) {
        return n.total;
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

async function getServingTickets() {
    const response = await fetch("http://localhost:80/project1/server/api/getServingTickets");
    const servingTickets = await response.json();
    if(response.ok) {
        return servingTickets;
    } else {
        let err = {status: response.status, errorObj: servingTickets};
        throw err; 
    }
}

async function putCounterReady(counterId) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:80/project1/server/api/counterReady/' + counterId, {
            method: 'PUT',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }).then((response) => {
            if (response.ok) {
                resolve(response);
            } else {
                console.log('error from server when sending PUT http://localhost:80/project1/server/api/counterReady/' + counterId);
            	reject();
            }
        }).catch((err) => { 
            console.log('could not reach server'); 
            console.log(err);
            reject(err);
        });
    });
}

async function putTicketServed(ticketNumber) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:80/project1/server/api/ticketServed/' + ticketNumber, {
            method: 'PUT',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }).then((response) => {
            if (response.ok) {
                resolve(response);
            } else {
            	console.log('error from server when sending PUT http://localhost:80/project1/server/api/ticketServed/' + ticketNumber);
            	reject();
            }
        }).catch((err) => { 
            console.log('could not reach server'); 
            console.log(err);
            reject(err);
        });
    });
}

async function getTicketToBeServed(counterId) {
    const response = await fetch('http://localhost:80/project1/server/api/getTicketToBeServed/', {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: JSON.stringify({idCounter: counterId}),
    });
    
    try{
        const resJ = await response.json();
        if(response.ok) {
		    return resJ;
		} else {
		    let err = {status: response.status, errorObj: resJ};
		    throw err; 
		}
    }
    catch(e){
        //console.log('error in reading json from POST /api/getTicketToBeServed/');
        //console.log(e);
        return 0;   //meaning: no new customer
    }
}

const API = {
    userLogin, createNewTicket, getRequestTypes, getNumberOfCustomers, getAllCounters, getServingTickets, putCounterReady, putTicketServed, 
    getTicketToBeServed 
};
export default API;
