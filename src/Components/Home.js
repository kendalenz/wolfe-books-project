import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome {auth.username}!!
        <button onClick={() => dispatch(logout())}>Logout</button>
        <p>
          Established in 2022 by Kendal Enz, C. Felix Lee, Anisah L. Moise and
          Jill Thomas, Wolfe Books is a bookstore and gallery space located in
          New York City’s East Village.
        </p>
      </div>
    </div>
  );
};

export default Home;
