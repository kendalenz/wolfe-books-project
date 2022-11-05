import React from 'react';
import { useSelector } from 'react-redux';

const AllUsers = () => {
  const { users } = useSelector((state) => state);

  return (
    <div>
      {users.map((user) => (
        <h3 key={user.id}>{user.username}</h3>
      ))}
    </div>
  );
};

export default AllUsers;
