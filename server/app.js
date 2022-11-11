const express = require('express');
const app = express();
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);
app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

const calculateOrderAmount = (items) => {
  // const dollarAmount = items.reduce((acc, curr) => {
  //   acc += Number((curr.book.price * curr.quantity).toFixed(2));
  //   return acc;
  // }, 0);
  // return parseInt(dollarAmount * 100);
  return 1400;
};

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../static/index.html'))
);

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use('/api/auth', require('./api/auth'));
app.use('/api/orders', require('./api/orders'));
app.use('/api/books', require('./api/books'));
app.use('/api/reviews', require('./api/reviews'));
app.use('/api/users', require('./api/users'));

module.exports = app;
