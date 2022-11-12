import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, createUser } from '../../store';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const [error, setError] = useState({});

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      if (auth.isAdmin) {
        await dispatch(createUser(credentials));
        navigate('/users');
      } else if (!auth.id) {
        await dispatch(addUser(credentials));
        navigate('/');
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  let messages = [];
  if (error.errors) {
    messages = error.errors.map((e) => e.message);
  } else if (error.status) {
    if (error.status === 401) {
      messages.push('invalid credentials');
    } else messages.push(error.status);
  }

  return (
    <div>
      {!auth.id ? <h2>Create An Account With Us!</h2> : null}
      {auth.isAdmin ? <h2>Create a New User Account!</h2> : null}
      <ul>
        {messages.map((message) => {
          return <li key={message}>{message}</li>;
        })}
      </ul>
      <form onSubmit={register}>
        <input
          placeholder="first name"
          value={credentials.firstName}
          name="firstName"
          onChange={onChange}
        />
        <input
          placeholder="last name"
          value={credentials.lastName}
          name="lastName"
          onChange={onChange}
        />
        <input
          placeholder="email"
          value={credentials.email}
          name="email"
          onChange={onChange}
        />
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          type="password"
          value={credentials.password}
          name="password"
          onChange={onChange}
        />
        {!auth.id ? <button>Create Account & Login</button> : null}
        {auth.isAdmin ? <button>Create New User</button> : null}
      </form>
    </div>
  );
};

export default CreateAccount;
