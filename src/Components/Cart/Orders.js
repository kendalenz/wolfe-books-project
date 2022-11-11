import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { placeOrder, deleteFromCart } from '../../store';
import dayjs from 'dayjs';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import PaymentModal from './PaymentModal';

const stripePromise = loadStripe(
  'pk_test_51M23fbAkBv8BefytURbFJEO79NQvz7YEMatl9GUevJODTqbr3EfP1l0vZhMudNCWrk16VjO4oejkffTZCf4N7ttu00LK3mQSV5'
);

const Orders = () => {
  const { cart, books } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [checkoutDetails, setCheckoutDetails] = useState({
    userId: '',
    orderId: '',
    shippingAddress: '',
    billingAddress: '',
    couponCode: '',
    amountDue,
    paymentSuccessful: false,
  });

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

  // const onChange = (e) => {
  //   setCheckoutDetails({
  //     ...checkoutDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

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
      {/* <button onClick={showModal}>Enter Payment Details</button> */}
      {/* <PaymentModal show={modal}>
        <form onSubmit={sendOrder}>
          <div>
            <select
              value={paymentMethod}
              name={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">--select a payment method--</option>
              {paymentMethods.map((method) => {
                return (
                  <option key={method} value={method}>
                    {method}
                  </option>
                );
              })}
            </select>
            {checkoutDetails.paymentMethod === 'CreditCard' ? (
              <input
                placeholder="credit card number"
                name="creditCardNumber"
                // hidden={
                //   checkoutDetails.paymentMethod === 'CreditCard' ? false : true
                // }
                value={checkoutDetails.creditCardNumber}
                onChange={onChange}
              />
            ) : (
              ''
            )}
            <input
              placeholder="shipping address"
              name="shippingAddress"
              value={checkoutDetails.shippingAddress}
              onChange={onChange}
            />
            <input
              placeholder="billing address"
              name="billingAddress"
              value={checkoutDetails.billingAddress}
              onChange={onChange}
            />
            <input
              placeholder="coupon code"
              name="couponCode"
              value={checkoutDetails.couponCode}
              onChange={onChange}
            />
          </div>
          <button>Place Order</button>
        </form>
      </PaymentModal> */}
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
