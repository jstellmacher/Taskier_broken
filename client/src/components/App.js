import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';

import Home from './components/Home';
import Users from './components/Users';
import Tasks from './components/Tasks';
import Todos from './components/Todos';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/todos" component={Todos} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
