const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isLoggedIn } = require('./middleware');
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);

module.exports = app;

app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: items.amountDue,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get('/cart', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.post('/cart', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put('/cart', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});
