import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "", // Update the password field name
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
    if (newUser.password === event.target.confirmPassword.value) {
      console.log("good job on the matching passwords");
      handleCreateAccount();
    } else {
      window.alert("Your passwords do not match. Please reenter your password and try again.");
    }
  };

  const handleCreateAccount = () => {
    const { confirmPassword, ...userData } = newUser; // Remove confirmPassword from the userData

    if (userData.password === confirmPassword) {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.alert("Account created successfully. Please log in.");
          history.push("/login");
        })
        .catch((error) => {
          console.log(error);
          // Handle error response if registration fails
          window.alert("Error creating account. Please try again.");
        });
    } else {
      window.alert(
        "Your passwords do not match. Please reenter your password and try again."
      );
    }
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
          value={newUser.password}
          type="password"
          name="password" // Update the name of the password field
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
