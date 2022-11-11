import React, { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { placeOrder } from '../../store';
import { useSelector } from 'react-redux';

const CheckoutForm = () => {
  const { cart } = useSelector((state) => state);
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  // const sendOrder = () => {
  //   if (!cart.isCart) {
  //     alert('You have no items in your cart to order!');
  //     throw new Error('missing cart');
  //   }
  //   dispatch(placeOrder(cart));
  // };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/#/orders',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
    setPaymentSuccessful(true);
    // sendOrder();

    // const result = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: '/orders',
    //   },
    // });

    // if (result.error) {
    //   console.log(result.error.message);
    // } else {
    //   // ??
    // }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;