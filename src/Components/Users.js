import React from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const { auth } = useSelector((state) => state);
  return (
    <div>
      <h1>Account Information</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
};

export default Users;
