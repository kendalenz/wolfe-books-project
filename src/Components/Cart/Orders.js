import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { placeOrder, deleteFromCart } from '../../store';
import dayjs from 'dayjs';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51M23fbAkBv8BefytURbFJEO79NQvz7YEMatl9GUevJODTqbr3EfP1l0vZhMudNCWrk16VjO4oejkffTZCf4N7ttu00LK3mQSV5'
);

const Orders = () => {
  const { cart, books } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [amountDue, setAmountDue] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.lineItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  const sendOrder = (e) => {
    e.preventDefault();
    if (!cart.isCart || cart.lineItems.length === 0) {
      alert('You have no items in your cart to order!');
      throw new Error('missing cart');
    }
    dispatch(placeOrder(cart));
  };

  const deleteBook = (book, quantity) => {
    dispatch(deleteFromCart({ book }, quantity));
  };

  useEffect(() => {
    setAmountDue(
      cart.lineItems.reduce((acc, curr) => {
        acc += Number((curr.book.price * curr.quantity).toFixed(2));
        return acc;
      }, 0)
    );
  }, [cart]);

  return (
    <div style={{ height: '100vh' }}>
      <h1>Checkout</h1>
      <ul>
        {cart.lineItems.length > 0 && cart.isCart ? (
          cart.lineItems.map((item) => {
            const book = books.find((b) => b.id === item.bookId);
            const copyText = item.quantity > 1 ? 'copies' : 'copy';
            return (
              <div key={book.id}>
                <p>
                  {book.title} by {book.author} ({item.quantity} {copyText} @ $
                  {book.price} each)
                </p>
                <button onClick={() => navigate('/cart')}>Edit Quantity</button>
                <button onClick={() => deleteBook(book, item.quantity)}>
                  Remove Book
                </button>
              </div>
            );
          })
        ) : (
          <Link to="/books">Your cart is empty - Click here to add books!</Link>
        )}
      </ul>
      {cart.isCart ? <p>Amount Due: ${amountDue}</p> : ''}
      {cart.lineItems.length > 0 && clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <button disabled={cart.lineItems.length === 0} onClick={sendOrder}>Submit Order</button>
      <h2>Past Orders</h2>
      <ul>
        {!cart.isCart
          ? cart.lineItems.map((item) => {
              const book = books.find((b) => b.id === item.bookId);
              return (
                <li key={item.id}>
                  {book.title} - {item.quantity} copies ordered on{' '}
                  {dayjs(cart.updatedAt).toString()}
                </li>
              );
            })
          : ''}
      </ul>
    </div>
  );
};

export default Orders;
