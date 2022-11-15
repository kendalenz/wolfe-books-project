import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteFromCart } from '../../store';
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
  const [amountDue, setAmountDue] = useState('');

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    appearance,
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
    <div id="checkout_page" style={{ height: '200vh' }}>
      <h1>Checkout</h1>
      <div>
        {cart.lineItems.length > 0 && cart.isCart ? (
          cart.lineItems.map((item) => {
            const book = books.find((b) => b.id === item.bookId);
            const copyText = item.quantity > 1 ? 'copies' : 'copy';
            return (
              <div key={book.id}>
                <div id="checkout_info">
                  <img id="checkout_page_img" src={book.imageUrl} />
                  <div id="checkout_text">
                    {book.title} by {book.author} ({item.quantity} {copyText} @
                    ${book.price} each)
                    <br></br>
                    <br></br>
                    <br></br>
                    <div id="checkout_buttons">
                      <div id="edit_quantity_button">
                        <button onClick={() => navigate('/cart')}>
                          Edit Quantity
                        </button>
                      </div>
                      <button onClick={() => deleteBook(book, item.quantity)}>
                        Remove Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Link to="/books">
            <p>Your cart is empty — Click here to shop.</p>
          </Link>
        )}
        <br></br>
        {cart.isCart ? <><strong>Amount Due:</strong> ${amountDue}</> : ''}
      </div>
      {cart.lineItems.length > 0 && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <div id='past_orders_div'>
        <h2>Past Orders</h2>
        <div>
          {!cart.isCart
            ? cart.lineItems.map((item) => {
                const book = books.find((b) => b.id === item.bookId);
                const copyText = item.quantity > 1 ? 'copies' : 'copy';
                return (
                  <div key={item.id}>
                    {book.title} - {item.quantity} {copyText} ordered on{' '}
                    {dayjs(cart.updatedAt).format('MM/DD/YYYY').toString()}
                  </div>
                );
              })
            : 'You have no past orders.'}
        </div>
      </div>
    </div>
  );
};

export default Orders;
