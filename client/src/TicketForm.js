import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class TicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: undefined};
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.createNewTicket(this.state.type);
    }

    render() {
        return(
            <>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formTicket">
                <Form.Label>Type of request</Form.Label>
                <Form.Control as="select" name="type" onChange={(ev) => this.setState({type: ev.target.value})}>
                    {this.props.requestTypes.map((type) => <option key={type}>{type}</option>)}
                </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Take a ticket
                </Button>
            </Form>

            {this.props.ticketNumber === undefined ? null : <Alert variant='primary'> Your ticket number: <b>{this.props.ticketNumber}</b></Alert>}
            </>
        )
    }
}

export default TicketForm