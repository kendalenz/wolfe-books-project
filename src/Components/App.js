import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Books from './Books';
import Book from './Book';
import Cart from './Cart';
import Users from './Users';
import Review from './Review';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart, fetchBooks } from '../store';
import { Link, Routes, Route } from 'react-router-dom';

const App = () => {
  const { auth, books } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <div>
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/"><h2 className='wolfe_books'>Wolfe Books</h2></Link>
            <Link to="/books">Books</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/users/:id">Account</Link>
          </nav>
          <Routes>
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Book />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/users/:id" element={<Users />} />
          </Routes>
        </div>
      )}
      {auth.id ? <Home /> : <Login />}
    </div>
  );
};

export default App;
