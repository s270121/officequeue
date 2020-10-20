import React from 'react';
import API from './API';
import TopBar from './TopBar';
import TicketForm from './TicketForm';
import OfficerPage from './OfficerPage';
import LoginForm from './LoginForm';
import ServingTickets from './ServingTickets';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,            
      requestTypes: [],
      servingTickets: [],
      ticket: undefined,
      numberOfCustomers: undefined,
    };
  }

  componentDidMount() {
    this.getRequestTypes();
  }

  getRequestTypes = () => {
    API.getRequestTypes().then((types) => { 
      this.setState({requestTypes: types}); 
      this.getServingTickets();
    });
  }
  
  getServingTickets = () => {
    /* TODO API.getServingTickets().then((tickets) => {
      const servingTickets = {};
      for(const req of this.state.requestTypes) {
        const found = tickets.find(t => t.idRequest === req.requestName); // TODO change requestName to idRequest ???
        if(found === undefined) {
          servingTickets[req.requestName] = {
            ticketNumber: '-',
            counterId: '-', 
          };
        } else {
          servingTickets[req.requestName] = {
            ticketNumber: found.ticketNumber,
            counterId: found.counterId, 
          };
        }
      }
      this.setState({servingTickets: servingTickets}) 
    });*/
    
    const tickets = [
      {idRequest: 'DEPOSIT', ticketNumber: 10, counterId: 1},
      {idRequest: 'WITHDRAWAL', ticketNumber: 2, counterId: 4},
      {idRequest: 'SHIPPING', ticketNumber: 5, counterId: 7}
    ]

    const servingTickets = {};
    for(const req of this.state.requestTypes) {
      const found = tickets.find(t => t.idRequest === req.requestName);
      if(found === undefined) {
        servingTickets[req.requestName] = {
          ticketNumber: '-',
          counterId: '-', 
        };
      } else {
        servingTickets[req.requestName] = {
          ticketNumber: found.ticketNumber,
          counterId: found.counterId, 
        };
      }
    }

    this.setState({servingTickets: servingTickets});
  }


  createNewTicket = (type) => {
    API.createNewTicket(type).then((ticket) => {this.setState({ticket: ticket})})
      .catch((e) => {
        console.log("Error in get a new ticket: " + e);
      });
      //console.log("New ticket for type: " + type);
  }

  getNumberOfCustomers = (type) => {
    //API.getNumberOfCustomers(type).then((n) => {this.setState({numberOfCustomers: n})});
    this.setState({numberOfCustomers: 4});
  }

  setLoggedIn = (name) => {
    this.setState({loggedin: true});
  }

  logout = () =>{
    this.setState({loggedin: false});
  }

  render(props) {
    return (
      <Router>
        <TopBar loggedin = {this.state.loggedin} logout={this.logout} ></TopBar>
        <Switch>
          <Route path="/login">
            <Row className="height-100">
              <Col sm={4}></Col>
              <Col sm={4} className="below-nav my-2">
                <LoginForm setLoggedIn={this.setLoggedIn}/>
              </Col>
            </Row>
          </Route>

          <Route path="/officer">
            <OfficerPage/>
          </Route>

          <Route path="/">
            <ServingTickets requestTypes={this.state.requestTypes} servingTickets={this.state.servingTickets} />
            <TicketForm createNewTicket = {this.createNewTicket} requestTypes = {this.state.requestTypes} ticket = {this.state.ticket} getNumberOfCustomers = {this.getNumberOfCustomers} numberOfCustomers = {this.state.numberOfCustomers} defaultType = {this.state.requestTypes[0]}></TicketForm>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
