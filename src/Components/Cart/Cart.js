import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateItemQuantity from './UpdateItemQuantity';

const Cart = () => {
  const { cart, books } = useSelector((state) => state);

  return (
    <div id='cart_page_content' style={{ height: '400vh' }}>
      <h1>Cart</h1>
      <div>
        {cart.lineItems.length > 0
          ? cart.lineItems.map((lineItem) => {
              const book = books.find((book) => book.id === lineItem.bookId);
              return (
                <div key={book.id}>
                  {book.title} by {book.author} - ${book.price} (You have {lineItem.quantity} in
                  your cart)
                  <UpdateItemQuantity
                    key={lineItem.id}
                    id={lineItem.id}
                    quantity={lineItem.quantity}
                    bookId={book.id}
                  />
                </div>
              );
            })
          : 'Oops, your cart is empty!'}
      </div>
      <div>
        <Link to="/books">
          <button>Buy Some Books!</button>
        </Link>
      </div>
      <br />
      <div>
        <Link to="/orders">
          <button disabled={cart.lineItems.length === 0}>Checkout!</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
