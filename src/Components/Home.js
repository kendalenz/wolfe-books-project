import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logout } from '../store';

const Home = () => {
  
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  return (
    <div>
      <div className='hero-background'>
        <div className='hero-image'>
        <img src='../static/assets/BOOOKS.jpg' alt='Logo' width='80%' height='100%' />
        </div>
      </div>
      <div className='home-page-text'>
      <p>
          Established in 2022 by Kendal Enz, C. Felix Lee, Anisah L. Moise and
          Jill Thomas, Wolfe Books is a bookstore and gallery space located in
          New York City’s East Village.
      </p>
      <p>
          Wolfe Books curates a rotating selection of rare and out-of-print titles presented alongside contemporary publications from small press publishers worldwide.
      </p>
      <p>
          From its inception Wolfe Books has developed exhibitions, cultural programming and events, including readings, performances, and public talks. Past collaborators have included such luminaries as Bilbo Baggins, Elio Perlman and Miami Man, among others. 
      </p>
        {
          auth.username ? (
            <div>
              <div>
                Welcome {auth.username}! You are logged in.
              </div>
              <button onClick={()=> dispatch(logout())}>Logout</button>
            </div>
          ) : 
          (
            <div>
            </div>
          )
        } 
      </div>
      </div>
  );
};

export default Home;
