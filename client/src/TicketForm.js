import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class TicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: undefined};
    }

    updateField = (name, value) => {
        this.setState({[name]: value});
        this.props.getNumberOfCustomers(value);
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.createNewTicket(this.state.type);
    }

    render() {
        return(
            <>
            <Container fluid>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formTicket">
                            <Form.Label>Type of request</Form.Label>
                            <Form.Control as="select" name="type" onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}>
                                {this.props.requestTypes.map((type) => <option key={type}>{type}</option>)}
                            </Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Take a ticket
                            </Button>
                        </Form>
                    </Col>

                    <Col>
                        <Alert variant='primary'>{this.props.numberOfCustomers} customers are waiting for this service.</Alert>
                    </Col>
                </Row>
                
            </Container>
            

            {this.props.ticketNumber === undefined ? null : <Alert variant='primary'> Your ticket number: <b>{this.props.ticketNumber}</b></Alert>}
            </>
        )
    }
}

export default TicketForm