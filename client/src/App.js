import React from 'react';
import TopBar from './TopBar';
import TicketForm from './TicketForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: "false",            
    };
  }

  getNewTicket = (type) => {
    /*
    API.getNewTicket(type).then((ticket) => {this.setState({ticketNumber: ticket, type: type})})
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
          <Route path="/">
            <TicketForm getNewTicket = {this.getNewTicket}></TicketForm>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
