import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logout } from '../store';

const blah = window.location.href.slice(-2, -1);

const Home = () => {
  // const { id } = useParams();
  
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
   
  // useEffect(()=> {
  //   const blah = window.location.href.slice(-2, -1);
  //   console.log(blah)
  //  }, []);

  return (
    <div>
      <h1>{blah === '#' ? 'Home' : ''}</h1>
      <div>
        Welcome {auth.username}!!
        <button onClick={() => dispatch(logout())}>Logout</button>
        <p>
          Established in 2022 by Kendal Enz, C. Felix Lee, Anisah Moise and Jill Thomas, Wolfe Books is a bookstore and gallery space located in New York City’s East Village.
        </p>
      </div>
    </div>
  );
};

export default Home;
