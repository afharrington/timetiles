// Entry point into the app
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import Welcome from './components/Welcome';
import Authentication from './components/Authentication';
import EntriesView from './views/EntriesView';
import TilesView from './views/TilesView';
import Signup from './components/Signup';
import Login from './components/Login';
import Goodbye from './components/Goodbye';

import "./styles/main.scss";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/app/:tileId" component={EntriesView}/>
          <Route path="/app" component={Authentication(TilesView)}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <Route path="/goodbye" component={Goodbye}/>
          <Route path="/" component={Welcome}/>
        </Switch>
      </div>
    )
  }
}

export default App;
