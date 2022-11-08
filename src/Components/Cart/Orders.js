import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { placeOrder, deleteFromCart } from '../../store';
import dayjs from 'dayjs';
import AddToCart from './AddToCart';
import UpdateItemQuantity from './UpdateItemQuantity';

const Orders = () => {
  const { cart, books } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentMethods = ['CreditCard', 'PayPal', 'GooglePay'];
  const [paymentMethod, setPaymentMethod] = useState('');
  const [checkoutDetails, setCheckoutDetails] = useState({
    userId: '',
    orderId: '',
    shippingAddress: '',
    billingAddress: '',
    couponCode: '',
    amountDue: 0,
    paymentMethod,
    creditCardNumber: '',
  });

  const sendOrder = (e) => {
    e.preventDefault();
    if (!cart.isCart) {
      alert('You have no items in your cart to order!');
      throw new Error('missing cart');
    }
    dispatch(placeOrder(cart));
  };

  const deleteBook = (book, quantity) => {
    dispatch(deleteFromCart({ book }, quantity));
  };

  const onChange = (e) => {
    setCheckoutDetails({
      ...checkoutDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ height: '100vh' }}>
      <h1>Checkout</h1>
      <ul>
        {cart.lineItems.length > 0 && cart.isCart ? (
          cart.lineItems.map((item) => {
            const book = books.find((b) => b.id === item.bookId);
            return (
              <div key={book.id}>
                <p>
                  {book.title} by {book.author} ({item.quantity} copies)
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
          <input
            placeholder="credit card number"
            name="creditCardNumber"
            hidden={
              checkoutDetails.paymentMethod === 'CreditCard' ? false : true
            }
            value={checkoutDetails.creditCardNumber}
            onChange={onChange}
          />
        </div>
        <p>Amount Due: ${checkoutDetails.amountDue}</p>
        <button>Place Order</button>
      </form>
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
