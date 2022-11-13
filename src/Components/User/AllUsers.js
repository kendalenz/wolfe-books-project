import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { editIsAdmin, adminDeleteUser } from '../../store';

const AllUsers = () => {
  const { auth, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const setAdmin = (ev, user) => {
    ev.preventDefault();
    user.isAdmin = ev.target.value;
    dispatch(editIsAdmin(user));
  };

  const destroy = (user) => {
    if (
      confirm(
        `Are you sure you want to delete ${user.firstName} ${user.lastName}`
      )
    ) {
      dispatch(adminDeleteUser(user));
    }
  };

  return (
    <div id='users_page' style={{ height: '200vh' }}>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <div>
            <label><strong>Admin: </strong></label>
            <select value={user.isAdmin} onChange={(ev) => setAdmin(ev, user)}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
            <br></br>
            <div id='delete_user_button'>
            {auth.id !== user.id ? (
              <button onClick={() => destroy(user)}>Delete User</button>
            ) : null}
            </div>
          </div>
        </div>
      ))}
      <h3><Link to="/createaccount">Create a New User</Link></h3>
    </div>
  );
};

export default AllUsers;
