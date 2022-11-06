import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { putInCart, deleteFromCart } from '../../store';
import AddToCart from './AddToCart';
import RemoveFromCart from './UpdateItemQuantity';

const Orders = () => {
  const { cart, books } = useSelector((state) => state);

  const save = (e) => {
    e.preventDefault();
    console.log('event target: ', e.target);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={save}>
        <ul>
          {cart.lineItems.map((item) => {
            const book = books.find(b => b.id === item.bookId);
            return (
              <div key={book.id}>
                <p>{book.title}</p>
                <p>{item.quantity}</p>
              </div>
            );
          })}
        </ul>
        <button>Place Order</button>
      </form>
      <h2>Past Orders</h2>
    </div>
  );
};

export default Orders;
