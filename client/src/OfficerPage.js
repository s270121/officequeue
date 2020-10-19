import React from 'react';
import { Alert, Container, Row, Col, Dropdown, Button } from 'react-bootstrap'
import API from './API';

class OfficerPage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = { 
            counterId: 1, 
            counterList: [],
            ticketNumber: -1         //current ticket that the officer is serving
        };
    }

    render(){
        return <>
            <Container fluid>
                <Row>
                    <Col className='col-2'>
                        <Alert variant='info'>You are serving at counter: {this.state.counterId}</Alert>
                    </Col>

                    <Col className='col-2'>
                        <Dropdown className='mt-2'>
                            <Dropdown.Toggle variant='danger'>Change counter:</Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.state.counterList.map( (c) => {return this.createDropdownItem(c)} )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                <Row>
                    <Col className='col-3'>
                        { (this.state.ticketNumber !== -1) && (<Alert variant='info'>You are serving ticket number: {this.state.ticketNumber}</Alert>)}
                        { (this.state.ticketNumber === -1) && (<Alert variant='warning'>You are currently not serving any customer</Alert>)}
                    </Col>

                    <Col className='col-2'>
                        <Button className='mt-2' variant='success' onClick={this.updateTickerNumber}>Call next customer</Button>
                    </Col>
                </Row>
            </Container>
        </>
    }

    componentDidMount = () => {
        this.updateCounterList();
    }

    updateCounterList = () => {
        //this should get the counter list from the server

        API.getAllCounters()
        .then((res) => {
            /*
            res is an array of objects like this:
            { idCounter: 1, idRequest: "SHPP" }
            so here you can also have information about which requests you can serve
            */
           
            var allCountersIds = res.map(c => c.idCounter);
            var counters_unique = [...new Set(allCountersIds)];
            this.setState({ counterList : counters_unique });
        })
        .catch((err) => {
            console.log('error in getting list of counters from server:');
            console.log(err);
        })
    }

    createDropdownItem = (counterId) => {
        return <Dropdown.Item key={counterId} onClick={() => {this.changeCurrentCounter(counterId)}}>
            {counterId}
        </Dropdown.Item>
    }

    changeCurrentCounter = (counterId) => {
        this.setState({ counterId: counterId });
    }

    updateTickerNumber = () => {
        /*
        - this shuld get the next ticket number to serve from the server
        - to access the current counter number, use this.state.counterId
        - to indicate that there is no new customer to serve, set newTicketNumber = -1
        */
        var newTicketNumber = 1;

        this.setState({ ticketNumber: newTicketNumber });
    }
}

export default OfficerPage;