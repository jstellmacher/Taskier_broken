import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

function Authentication() {
  const [signUp, setSignUp] = useState(false); // Set initial value to false
  const history = useHistory(); // Initialize the history variable

  const handleClick = (e) => setSignUp((signUp) => !signUp);

  const formSchema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter your email address'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(signUp ? '/users' : '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((user) => {
          updateUser(user);
          history.push('/');
        });
    },
  });

  return (
    <>
      <h1>Login</h1>
      <h2>Please Log in or Sign up!</h2>
      <h2>{signUp ? 'Already a member?' : 'Not a member?'}</h2>
      <button onClick={handleClick}>{signUp ? 'Log In!' : 'Register Now!'}</button>
      <Form onSubmit={formik.handleSubmit}>
        <label>Username</label>
        <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
        {signUp && (
          <>
            <label>Email</label>
            <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} />
          </>
        )}
        <button type="submit">{signUp ? 'Sign Up' : 'Log In'}</button>
      </Form>
    </>
  );
}

export default Authentication;
