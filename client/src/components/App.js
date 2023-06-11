import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserPage from './UserPage';
import NavBar from './NavBar';

const App = () => {
  return (
    <Router>
      <NavBar /> {/* Include the NavBar component here */}
      <Switch>
        <Route exact path="/">
          <Redirect to="/users/1" /> {/* Redirect to a specific user page */}
        </Route>
        <Route path="/users/:id">
          <UserPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
