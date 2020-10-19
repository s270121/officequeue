import React from 'react';
import API from './API';
import TopBar from './TopBar';
import TicketForm from './TicketForm';
import OfficerPage from './OfficerPage';
import LoginForm from './LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,            
      requestTypes: [],
      ticketNumber: undefined,
      numberOfCustomers: undefined,
    };
  }

  componentDidMount() {
    this.getRequestTypes();
  }

  getRequestTypes = () => {
    API.getRequestTypes().then((types) => {this.setState({requestTypes: types}) });
  }

  createNewTicket = (type) => {
    /*
    API.createNewTicket(type).then((ticket) => {this.setState({ticketNumber: ticket, type: type})})
      .catch((e) => {
        console.log("Error in get a new ticket: " + e);
      });
    */
      console.log("New ticket for type: " + type);
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
              <Col sm={4} className="below-nav">
                <LoginForm setLoggedIn={this.setLoggedIn}/>
              </Col>
            </Row>
          </Route>

          <Route path="/officer">
            <OfficerPage/>
          </Route>

          <Route path="/">
            <TicketForm createNewTicket = {this.createNewTicket} requestTypes = {this.state.requestTypes} ticketNumber = {this.state.ticketNumber} getNumberOfCustomers = {this.getNumberOfCustomers} numberOfCustomers = {this.state.numberOfCustomers}></TicketForm>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
