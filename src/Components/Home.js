import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logout } from '../store';

const blah = window.location.href.slice(-2, -1);

const Home = () => {
  
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  return (
    <div>
      <h1>Home</h1>
      <div>
        
       
  {
  auth.username ? (
    <div>
    Welcome {auth.username}!!
    <button onClick={()=> dispatch(logout())}>Logout</button>
    </div>
  ) : 
  (
    <div>
      Welcome to Wolfe Books!!
    </div>
  )
 

  } 
       
        
       
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
