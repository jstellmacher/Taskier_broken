import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserLogin();
  };

  const fetchUserLogin = () => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          onLogin();
          history.push(`/users/:id`);
        } else {
          // Handle login error
        }
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            className="formInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="formInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="button" type="submit">
          Login
        </button>
      </form>
      <div id="signupRedirectButton">
        <h2>Don't have an account?</h2>
        <button className="button" onClick={() => history.push('/signup')}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;
