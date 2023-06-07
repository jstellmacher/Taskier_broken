import React, { useState } from 'react';

function Authentication() {
  const [signUp, setSignUp] = useState(false); // Set initial value to false

  const handleClick = (e) => setSignUp((signUp) => !signUp);

  return (
    <>
      <h1>Test</h1>
      <button onClick={handleClick}>
        {signUp ? 'Log In!' : 'Register Now!'}
      </button>
    </>
  );
}

export default Authentication;
