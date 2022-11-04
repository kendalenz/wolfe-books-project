import axios from 'axios';
const auth = (state = {}, action) => {
  if (action.type === 'SET_AUTH') {
    return action.auth;
  }
  if (action.type === 'UPDATE_AUTH') {
    state = action.auth;
  }
  if (action.type === 'DELTE_AUTH') {
    state = {};
  }
  return state;
};

export const logout = () => {
  window.localStorage.removeItem('token');
  return { type: 'SET_AUTH', auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
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
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
  };
};

export const editUser = (user, navigate) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/users', user, {
      headers: { authorization: token },
    });
    dispatch({ type: 'UPDATE_AUTH', auth: response.data });
    navigate(`/users/${response.data.id}`);
  };
};

export const deleteUser = (user, navigate) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    await axios.delete('/api/users', user, {
      headers: { authorization: token },
    });
    logout();
    dispatch({ type: 'DELETE_AUTH', auth: user });
    navigate('/');
  };
};

export default auth;
