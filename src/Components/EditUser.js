import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../store';

const EditUser = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: auth.username,
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email,
  });

  const onChange = (ev) => {
    setInputs({
      ...inputs,
      [ev.target.name]: ev.target.value,
    });
  };

  const update = (ev) => {
    console.log(ev);
    ev.preventDefault();
    dispatch(editUser({ id: auth.id, ...inputs }, navigate));
  };

  return (
    <form onSubmit={update}>
      <h1>Edit Account Info</h1>
      <div>
        <label>Username</label>
        <input name="username" value={inputs.username} onChange={onChange} />
      </div>
      <div>
        <label>First Name</label>
        <input name="firstName" value={inputs.firstName} onChange={onChange} />
      </div>
      <div>
        <label>Last Name</label>
        <input name="lastName" value={inputs.lastName} onChange={onChange} />
      </div>
      <div>
        <label>Email</label>
        <input name="email" value={inputs.email} onChange={onChange} />
      </div>
      <button>Save Changes</button>
    </form>
  );
};

export default EditUser;
