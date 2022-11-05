import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from '../store';

const Users = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account?')) {
      dispatch(deleteUser(auth, navigate));
    }
  };

  return (
    <div style={ {height:'80vh' } }>
      <h1>Account Information</h1>
      <p>Username: {auth.username}</p>
      <p>
        Name: {auth.firstName} {auth.lastName}
      </p>
      <p>Email: {auth.email}</p>
      <Link to={`/users/${auth.id}/edit`}>Edit Account Info</Link>
      <button onClick={() => deleteAccount()}>Delete Account</button>
    </div>
  );
};

export default Users;
