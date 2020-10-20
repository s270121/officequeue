import React from 'react';

/* 
    props.requestTypes: { 
        "idRequest": ...
        "serviceTime": ...
        "requestName": ...
    }
*/

class ServingTickets extends React.Component {

    render() {
        /*for(const r of this.props.requestTypes) {
            console.dir(`this.props.servingTickets[${r.requestName}]: ` + this.props.servingTickets[r.requestName])
        }*/

        return(
            <table className='table '>
                <thead>
                <tr>
                    <th className='col-6'>Service</th>
                    <th className='col-2'>Ticket n°</th>
                </tr>
                </thead>
                <tbody>{
                    this.props.requestTypes.map((r) => <TicketRow key={r.idRequest} request={{...r, ticketNumber: this.props.servingTickets[r.requestName]}}/>)
                }
                </tbody>
            </table>
        )
    }
}

function TicketRow(props) {
    return <tr><TicketRowData requestName={props.request.requestName} ticketNumber={props.request.ticketNumber}/></tr>
}

function TicketRowData(props) {
    return <>
        <td>{props.requestName}</td>
        <td>{props.ticketNumber}</td>
    </>;
}

export default ServingTickets;