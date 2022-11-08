import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const navigate = useNavigate();

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate('/');
  };
  return (
    <div style={{ height: '80vh' }}>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <button>Login</button>
        <div>
          <label>Don't have an account?</label>
          <Link to="/createaccount">
            <button>Create an Account!</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
