import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';

import NavBar from './NavBar';
import UserPage from './UserPage';
import AddTask from './AddTask';
import Signup from './Signup.js';
import Login from './Login.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const location = useLocation();

  const handleLogin = (userId) => {
    setLoggedIn(true);
    setUserId(userId);
  };

  useEffect(() => {
    fetch('/check-session')
      .then((response) => {
        if (response.ok) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      });
  }, []);

  const shouldDisplayNavBar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <Router>
      {shouldDisplayNavBar && <NavBar />}
      <Switch>
        <Route exact path="/login">
          <Login onLogin={() => setLoggedIn(true)} />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        {loggedIn ? (
          <>
            <Route exact path="/users/:id">
              <UserPage />
            </Route>
            <Route exact path="/users/:id/add-task">
              <AddTask />
            </Route>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
