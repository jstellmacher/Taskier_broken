import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import SplashScreen from './SplashScreen';
import Login from './Login';
import Signup from './Signup';
import AddTask from './AddTask';
import UserPage from './UserPage';
import About from './About';
import Account from './Account';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SplashScreen} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={DefaultLayout} />
      </Switch>
    </Router>
  );
}

function DefaultLayout() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/users/:id/add-task" component={AddTask} />
        <Route path="/users/:id/account" component={Account} />
        <Route path="/users/:id" component={UserPage} />
        <Route path="/about" component={About} />
      </Switch>
    </>
  );
}

export default App;
