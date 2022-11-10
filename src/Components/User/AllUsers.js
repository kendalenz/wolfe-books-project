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
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <div>
            <label>Admin:</label>
            <select value={user.isAdmin} onChange={(ev) => setAdmin(ev, user)}>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
            <br />
            {auth.id !== user.id ? (
              <button onClick={() => destroy(user)}>Delete User</button>
            ) : null}
          </div>
        </div>
      ))}
      <Link to="/createaccount">Create a New User</Link>
    </div>
  );
};

export default AllUsers;
