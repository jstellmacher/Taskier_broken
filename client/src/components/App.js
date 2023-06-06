import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';

import Home from './Home';
import Users from './Users';
import Tasks from './Tasks';
import Todos from './Todos';

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
