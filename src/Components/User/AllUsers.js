import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AllUsers = () => {
  const { users } = useSelector((state) => state);
  // const [isAdmin, setIsAdmin] = useState(false);

  const setAdmin = (ev, user) => {
    ev.preventDefault();
    console.log(user.isAdmin);
    // user.isAdmin = ev.target.value;
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <div>
            <label>Admin:</label>
            <select
              value={user.isAdmin}
              onChange={(ev, user) => setAdmin(ev, user)}
            >
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
