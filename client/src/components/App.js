import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import SplashScreen from './SplashScreen';
import Login from './Login';
import Signup from './Signup';
import AddTask from './AddTask';
import UserPage from './UserPage';
import About from './About';
import Account from './Account';
import MyCalendar from './Calendar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // Assume user is not logged in initially

  // Function to handle user login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SplashScreen} />
        <Route
          path="/login"
          render={() => (loggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} />)}
        />
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
        <Route path="/users/:id/calendar" component={MyCalendar} />
        <Route path="/users/:id" component={UserPage} />
        <Route path="/about" component={About} />
        <Route render={() => <Redirect to="/users/:id" />} /> {/* Add this route for redirection */}
      </Switch>
    </>
  );
}

export default App;
