import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class TicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: undefined};
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.getNewTicket(this.state.type);
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formTicket">
                <Form.Label>Type of request</Form.Label>
                <Form.Control as="select" name="type" onChange={(ev) => this.setState({type: ev.target.value})}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Take a ticket
                </Button>
            </Form>
        )
    }
}

export default TicketForm