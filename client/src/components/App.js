// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import NavBar from './NavBar';
import UserPage from './UserPage';
import AddTask from './AddTask';
import Signup from "./Signup.js";
import Login from "./Login.js";

function App() {


  return (
    <Router>
      <NavBar /> 
      <Switch>
        <Route path="/users/:id">
          <UserPage />
        </Route>
        <Route exact path="/users/:id/add-task">
          <AddTask />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
