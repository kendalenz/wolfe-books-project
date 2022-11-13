import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../../store';

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
    ev.preventDefault();
    dispatch(editUser({ id: auth.id, ...inputs }, navigate));
  };

  return (
    <div id='edit_account_page' style={{ height: '80vh' }}>
      <form onSubmit={update}>
        <h1>Edit Account Info</h1>
        <div>
          <label><strong>Username: </strong></label>
          <input name="username" value={inputs.username} onChange={onChange} />
        </div>
        <div>
          <label><strong>First Name: </strong></label>
          <input
            name="firstName"
            value={inputs.firstName}
            onChange={onChange}
          />
        </div>
        <div>
          <label><strong>Last Name: </strong></label>
          <input name="lastName" value={inputs.lastName} onChange={onChange} />
        </div>
        <div>
          <label><strong>Email: </strong></label>
          <input name="email" value={inputs.email} onChange={onChange} />
        </div>
        <br></br>
        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
