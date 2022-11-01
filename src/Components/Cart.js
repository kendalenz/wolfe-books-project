import React from 'react';
import { useSelector } from 'react-redux';

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
                <li>
                  {book.title} by {book.author}
                </li>
              );
            })
          : 'Oops, your cart is empty!'}
      </ul>
    </div>
  );
};

export default Cart;
