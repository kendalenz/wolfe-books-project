import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editIsAdmin } from '../../store';

const AllUsers = () => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const setAdmin = (ev, user) => {
    ev.preventDefault();
    user.isAdmin = ev.target.value;
    dispatch(editIsAdmin(user));
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
