import React from 'react';
import TopBar from './TopBar';
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

  render(props) {
    return (
      <Router>
        <TopBar loggedin = {this.state.loggedin}></TopBar>
        <Switch>
          <Route path="/login">
            <p>Login form</p>
          </Route>
          <Route path="/">
            <p>Home</p>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
