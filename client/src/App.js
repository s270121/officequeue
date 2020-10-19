import React from 'react';
import API from './API';
import TopBar from './TopBar';
import TicketForm from './TicketForm';
import OfficerPage from './OfficerPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: "false",            
      requestTypes: [],
      ticketNumber: undefined,
    };
  }

  componentDidMount() {
    this.getRequestTypes();
    this.testLogin();
  }

  testLogin = () => {
    API.userLogin("calogero", "test")
      .then((res) => {console.log(res)})
      .catch((err) => {console.log(err)});
  }

  getRequestTypes = () => {
    API.getRequestTypes().then((types) => {this.setState({requestTypes: types}) });
    //console.log("Request types loading");
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

  render(props) {
    return (
      <Router>
        <TopBar loggedin = {this.state.loggedin}></TopBar>
        <Switch>
          <Route path="/login">
            <p>Login form</p>
          </Route>

          <Route path="/officer">
            <OfficerPage/>
          </Route>

          <Route path="/">
            <TicketForm createNewTicket = {this.createNewTicket} requestTypes = {this.state.requestTypes} ticketNumber = {this.state.ticketNumber}></TicketForm>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
