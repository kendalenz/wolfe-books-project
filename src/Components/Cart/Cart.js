import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RemoveFromCart from './UpdateItemQuantity';
import Orders from './Orders';

const Cart = () => {
  const { cart, books } = useSelector((state) => state);

  return (
    <div style={{ height: '80vh' }}>
      <h1>Cart</h1>
      <ul>
        {cart.lineItems.length > 0
          ? cart.lineItems.map((lineItem) => {
              const book = books.find((book) => book.id === lineItem.bookId);
              return (
                <li key={book.id}>
                  {book.title} by {book.author} (You have {lineItem.quantity} in
                  your cart)
                  <RemoveFromCart
                    key={lineItem.id}
                    id={lineItem.id}
                    quantity={lineItem.quantity}
                    bookId={book.id}
                  />
                </li>
              );
            })
          : 'Oops, your cart is empty!'}
      </ul>
      <div>
        <Link to="/books">
          <button>Buy Some Books!</button>
        </Link>
      </div>
      <br />
      <div>
        <Link to="/orders">
          <button>Checkout!</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
