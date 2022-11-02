import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Books from './Books';
import Book from './Book';
import Cart from './Cart';
import Review from './Review';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart, fetchBooks } from '../store';
import { Link, Routes, Route } from 'react-router-dom';

<<<<<<< HEAD
const App = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loginWithToken());
    }, []);

    useEffect(() => {
        if (auth.id) {
            dispatch(fetchCart());
        }
    }, [auth]);
    return (
        <div>
            <h1>Acme Shopping</h1>
            {auth.id ? <Home /> : <Login />}
            {!!auth.id && (
                <div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/cart">Cart</Link>
                    </nav>
                    <Routes>
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            )}
            <Review />
        </div>
    );
=======
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
              <Route path='/books' element={<Books />} />
              <Route path='/books/:id' element={<Book />} />
              <Route path='/cart' element={ <Cart /> } />
            </Routes>
          </div>
        )
      }
    </div>
  );
>>>>>>> 94666aafe92e300f88a553d31bd1e9fa778a6967
};

export default App;
