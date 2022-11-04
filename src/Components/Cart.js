import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RemoveFromCart from './RemoveFromCart';

const Cart = () => {
  const { cart, books } = useSelector((state) => state);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.lineItems.length > 0
          ? cart.lineItems.map((lineItem) => {
              const book = books.find((book) => book.id === lineItem.bookId);
              return (
                <li key={book.id}>
                  {book.title} by {book.author} (You have {lineItem.quantity} in your cart)
                  <RemoveFromCart id={book.id} />
                </li>
              );
            })
          : 'Oops, your cart is empty!'}
      </ul>
      <Link to='/books'>Buy Some Books!</Link>
    </div>
  );
};

export default Cart;
