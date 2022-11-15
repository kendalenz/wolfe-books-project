const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const secretKey = process.env.STRIPE_CLIENT_SECRET;
const stripe = require('stripe')(secretKey);
app.use(express.json());
app.use(cors());

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../static/index.html'))
);

app.use('/api/auth', require('./api/auth'));
app.use('/api/orders', require('./api/orders'));
app.use('/api/books', require('./api/books'));
app.use('/api/reviews', require('./api/reviews'));
app.use('/api/users', require('./api/users'));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.lineItems.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.book.title} by ${item.book.author}`,
          },
          unit_amount_decimal: parseInt((item.book.price * 100).toFixed(2)),
        },
        quantity: item.quantity,
      };
    }),
    mode: 'payment',
    success_url: `${req.protocol}://${req.hostname}:${
      process.env.PORT || 3000
    }/#/order-success`,
    cancel_url: `${req.protocol}://${req.hostname}:${
      process.env.PORT || 3000
    }/#/order-cancelled`,
  });

  res.send(session.url);
});

module.exports = app;
