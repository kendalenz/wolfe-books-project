import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateItemQuantity from './UpdateItemQuantity';

const Cart = () => {
  const { cart, books } = useSelector((state) => state);

  return (
    <div id='cart_page'>
      <h1>Cart</h1>
      <div id="cart_page_content" style={{ height: '400vh' }}>
        <div id="cart-book-list">
          {cart.lineItems.length > 0 ? (
            cart.lineItems.map((lineItem) => {
              const book = books.find((book) => book.id === lineItem.bookId);
              return (
                <div key={book.id}>
                  <img className="cart-book-img" src={book.imageUrl}></img>
                  <pre>
                    {book.title} by {book.author}
                    <br />${book.price}
                    <br />
                    (You have {lineItem.quantity} in your cart)
                  </pre>
                  <UpdateItemQuantity
                    key={lineItem.id}
                    id={lineItem.id}
                    quantity={lineItem.quantity}
                    bookId={book.id}
                  />
                </div>
              );
            })
          ) : (
            <h4>Oops, your cart is empty!</h4>
          )}
        </div>
        <div id="cart-actions">
          <div>
            <Link to="/books">
              <button className="buy_btn">Buy Some Books</button>
            </Link>
          </div>
          <br />
          <div>
            <Link to="/orders">
              <button
                className="checkout_btn"
                disabled={cart.lineItems.length === 0}
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
