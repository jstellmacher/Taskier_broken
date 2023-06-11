import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';
import AddTask from './AddTask';
import UserPage from './UserPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={DefaultLayout} />
      </Switch>
    </Router>
  );
}

function DefaultLayout() {
  return (
    <>
      <NavBar /> {/* Display Navbar component on all routes except Login and Signup */}
      <Switch>
        <Route path="/users/:id/add-task" component={AddTask} />
        <Route path="/users/:id" component={UserPage} />
      </Switch>
    </>
  );
}

export default App;
