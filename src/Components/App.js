import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Books from './Books';
import Cart from './Cart';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart, fetchBooks } from '../store';
import { Link, Routes, Route } from 'react-router-dom';

const App = ()=> {
  const { auth, books } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  useEffect(()=> {
    if(auth.id){
      dispatch(fetchCart());
    }
  }, [auth]);

  useEffect(()=> {
    dispatch(fetchBooks())
  }, []);

  return (
    <div>
      <h1>Wolfe Books</h1>
      {
        auth.id ? <Home /> : <Login />
      }
      {
        !!auth.id  && (
          <div>
            <nav> 
              <Link to='/'>Home</Link>
              <Link to='/books'>Books</Link>
              <Link to='/cart'>Cart</Link>
            </nav>
            <Routes>
              {/* <Route path='/' element={<Home />} /> */}
              <Route path='/books' element={<Books />} />
              <Route path='/cart' element={ <Cart /> } />
            </Routes>
          </div>
        )
      }
    </div>
  );
};

export default App;
