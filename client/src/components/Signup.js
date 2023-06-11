import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    _password_hash: "",
  });

  const history = useHistory();

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitSignup = (event) => {
    event.preventDefault();
    if (newUser._password_hash === event.target.confirmPassword.value) {
      console.log("good job on the matching passwords");
      handleCreateAccount();
    } else {
      window.alert("Your passwords do not match. Please reenter your password and try again.");
    }
  };

  const handleCreateAccount = () => {
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((newUserData) => {
        console.log(newUserData);
        window.alert("Account created successfully. Please log in.");
        history.push("/login");
      });
  };

  return (
    <div id="signupDiv">
      <form className="signupForm" onSubmit={(event) => handleSubmitSignup(event)}>
        <input
          className="formInput"
          value={newUser.username}
          type="text"
          name="username"
          placeholder="Enter your username here."
          onChange={handleNewUserChange}
        />
        <br />
        <input
          className="formInput"
          value={newUser.email}
          type="email"
          name="email"
          placeholder="Enter your email here."
          onChange={handleNewUserChange}
        />
        <br />
        <input
          className="formInput"
          value={newUser._password_hash}
          type="password"
          name="_password_hash"
          placeholder="Enter your password here."
          onChange={handleNewUserChange}
        />
        <br />
        <input
          className="formInput"
          value={newUser.confirmPassword}
          type="password"
          name="confirmPassword"
          placeholder="Reenter your password."
          onChange={handleNewUserChange}
        />
        <br />
        <button className="button" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
