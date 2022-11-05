import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Books from './Books';
import Book from './Book';
import Cart from './Cart';
import Users from './Users';
import Review from './Review';
import EditUser from './EditUser';
import AllUsers from './AllUsers';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginWithToken,
  fetchCart,
  fetchBooks,
  fetchReviews,
  fetchUsers,
} from '../store';
import { Link, Routes, Route } from 'react-router-dom';

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

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  useEffect(() => {
    if (auth.isAdmin) {
      dispatch(fetchUsers());
    }
  });

  return (
    <div>
      {!!auth.id ? (
        <div>
          <nav>
            <Link to="/" className="wolfe_books">
              <h2>Wolfe Books</h2>
            </Link>
            <Link to="/books">Store</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/users/:id">Account</Link>
            {auth.isAdmin ? <Link to="/users">All Users</Link> : null}
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Book />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/users/:id" element={<Users />} />
            <Route path="/users/:id/edit" element={<EditUser />} />
            <Route path="/users" element={<AllUsers />} />
          </Routes>
          <footer className='footer'>
        <p>
          HOURS: 12-8PM DAILY
        </p>
        <p>
          Wolfe BOOKS
        <br></br>
          99 AVENUE A
        <br></br>
          NEW YORK, NY 10009
        <br></br>
          (646) 370-1666
        <br></br>
          INFO@WOLFEBOOKS.COM</p>
      </footer>
        </div>
        
      ) : (
        <div>
          <nav>
            <Link to="/" className="wolfe_books">
              <h2>Wolfe Books</h2>
            </Link>
            <Link to="/books">Store</Link>
            <Link to="/login">Log in</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Book />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <footer className='footer'>
        <p>
          HOURS: 12-8PM DAILY
        </p>
        <p>
          Wolfe BOOKS
        <br></br>
          99 AVENUE A
        <br></br>
          NEW YORK, NY 10009
        <br></br>
          (646) 370-1666
        <br></br>
          INFO@WOLFEBOOKS.COM</p>
      </footer>
        </div>
      )}
    </div>
  );
};

// return (
//   <div>
//     <nav>
//       <Link to="/" className="wolfe_books">
//         <h2>Wolfe Books</h2>
//       </Link>
//       <Link to="/books">Store</Link>
//       {auth.id ? (
//         <Link to="/users/:id">Account</Link>
//       ) : (
//         <Link to="/login">Log in</Link>
//       )}
//       {auth.id ? <Link to="/cart">Cart</Link> : null}
//       {auth.isAdmin ? <Link to="/users">All Users</Link> : null}
//     </nav>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/books" element={<Books />} />
//       <Route path="/books/:id" element={<Book />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/users/:id" element={<Users />} />
//       <Route path="/users/:id/edit" element={<EditUser />} />
//       <Route path="/login" element={<Login />} />
//       <Route path='/users' element={<AllUsers />} />
//     </Routes>
//   </div>
// );

export default App;
