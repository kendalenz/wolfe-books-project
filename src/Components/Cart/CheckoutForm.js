import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import cart from '../../store/cart';
import Orders from './Orders';

// const CheckoutForm = () => {
//   const { cart } = useSelector((state) => state);
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentSuccessful, setPaymentSuccessful] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       'payment_intent_client_secret'
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case 'succeeded':
//           setMessage('Payment succeeded!');
//           break;
//         case 'processing':
//           setMessage('Your payment is processing.');
//           break;
//         case 'requires_payment_method':
//           setMessage('Your payment was not successful, please try again.');
//           break;
//         default:
//           setMessage('Something went wrong.');
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: 'http://localhost:3000/#/orders',
//       },
//     });

//     if (error.type === 'card_error' || error.type === 'validation_error') {
//       setMessage(error.message);
//     } else {
//       setMessage('An unexpected error occurred.');
//     }

//     setIsLoading(false);
//     setPaymentSuccessful(true);
//   };
//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <PaymentElement id="payment-element" />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
//         </span>
//       </button>
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// };

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
      {cart.lineItems.map((item) => {
        return (
          <div key={item.id} className="product">
            <img src={item.book.imageUrl} />
            <div className="description">
              <h3>{item.book.title}</h3>
              <h4>{item.book.description}</h4>
              <h5>{item.book.price}</h5>
            </div>
          </div>
        );
      })}
      <button onClick={checkout}>Checkout</button>
    </section>
  );
};

const Message = ({message}) => {
  return (
    <section>
      <p>{message}</p>
    </section>
  );
};

const CheckoutForm = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
};

export default CheckoutForm;
