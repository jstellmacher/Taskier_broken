import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const containerStyles =
  "bg-gradient-to-r from-green-900 to-teal-200 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8";
const cardStyles = "max-w-md w-full p-6 bg-white rounded-lg shadow-2xl";
const titleStyles = "text-2xl font-bold text-center";
const errorStyles = "text-red-500 text-center border";
const formStyles = "mt-8 space-y-6";
const inputStyles =
  "formInput w-full border-2 border-gray-300 rounded-md mb-4 p-2";
const buttonStyles =
  "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400";
const textStyles = "text-gray-500 m-3";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username input contains an email
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(username)) {
      setError("Please enter your username instead of an email.");
      return;
    }

    fetchUserLogin();
  };

  const fetchUserLogin = () => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed. Please check your credentials.");
        }
      })
      .then((data) => {
        console.log(data);
        // Redirect to the user profile page after successful login
        history.push(`/users/${data.user_id}`);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <div>
          <h1 className={titleStyles}>Login</h1>
          {error && <p className={errorStyles}>{error}</p>}
        </div>
        <form className={formStyles} onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={inputStyles}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={inputStyles}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className={buttonStyles}>
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <h2 className={textStyles}>Don't have an account?</h2>
          <button
            className={buttonStyles}
            onClick={() => history.push("/signup")}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
