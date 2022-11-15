import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from '../../store';

const Users = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let users;
  auth.isAdmin ? ({ users } = useSelector((state) => state)) : null;

  const deleteAccount = () => {
    if (auth.isAdmin) {
      const admins = users.filter((user) => user.isAdmin === true);
      if (admins.length < 2) {
        alert('Please create another admin before deleting your account.');
      }
    }
    if (confirm('Are you sure you want to delete your account?')) {
      dispatch(deleteUser(auth, navigate));
    }
  };

  return (
    <div id='account_page' style={{ height: '80vh' }}>
      <h1>Account Information</h1>
      <p>
        <strong>Username:</strong> {auth.username}
      </p>
      <p>
        <strong>Name:</strong> {auth.firstName} {auth.lastName}
      </p>
      <p>
        <strong>Email:</strong> {auth.email}
      </p>
      <h3><Link to={`/users/${auth.id}/edit`}>Edit Account Info</Link></h3>
      <br></br>
      <button onClick={() => deleteAccount()}>Delete Account</button>
    </div>
  );
};

export default Users;
