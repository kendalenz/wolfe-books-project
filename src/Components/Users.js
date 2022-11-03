import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const { auth } = useSelector((state) => state);

  const edit = () => {
    return <hr />;
  };

  return (
    <div>
      <h1>Account Information</h1>
      <p>Username: {auth.username}</p>
      <p>
        Name: {auth.firstName} {auth.lastName}
      </p>
      <p>Email: {auth.email}</p>
      <Link to={`/users/:id/edit`}>Edit Account Info</Link>
    </div>
  );
};

export default Users;
