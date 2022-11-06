import axios from 'axios';
import { getToken, setToken } from '.';

const auth = (state = {}, action) => {
  if (action.type === 'SET_AUTH') {
    return action.auth;
  }
  if (action.type === 'UPDATE_AUTH') {
    state = { ...state, auth: action.auth };
  }
  return state;
};

export const logout = () => {
  window.localStorage.removeItem('token');
  return { type: 'SET_AUTH', auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = getToken();
    if (token) {
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  };
};

export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post('/api/auth', credentials);
    setToken(response.data);
    dispatch(loginWithToken());
  };
};

export const editUser = (user, navigate) => {
  return async (dispatch) => {
    console.log(user);
    const token = getToken();
    console.log(token);
    const response = await axios.put('/api/users', user, {
      headers: { authorization: token },
    });
    dispatch({ type: 'UPDATE_AUTH', auth: response.data });
    navigate(`/users/${response.data.id}`);
  };
};

export const deleteUser = (user, navigate) => {
  return async (dispatch) => {
    console.log(user);
    await axios.delete(`/api/users/${user.id}`);
    dispatch(logout());
    navigate('/');
  };
};

export const addUser = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post('/api/auth/register', credentials);
    setToken('token', response.data);
    dispatch(loginWithToken());
  };
};

export default auth;
