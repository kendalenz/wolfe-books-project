import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = () => {
  const { cart } = useSelector((state) => state);

  const checkout = async () => {
    try {
      const response = await axios.post('/create-checkout-session', cart);
      window.open(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section>
      <button className="checkout_btn" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

const Message = ({ message }) => {
  return (
    <section>
      <p>{message}</p>
    </section>
  );
};

const CheckoutForm = () => {
  const [message, setMessage] = useState('');
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setMessage(
        "Order cancelled. Continue to shop and checkout when you're ready."
      );
      navigate('/order-cancelled');
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : cart.isCart ? (
    <ProductDisplay />
  ) : (
    ''
  );
};

export default CheckoutForm;
