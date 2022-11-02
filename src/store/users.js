import axios from 'axios';

const users = (state = [], action) => {
  return state;
};

// export const fetchUsers = () => {
//   return async (dispatch) => {
//     const response = await axios.get('/api/users');
//     dispatch({ type: 'SET_USERS', users: response.data });
//   };
// };

export default users;
