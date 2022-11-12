const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const secretKey = process.env.STRIPE_CLIENT_SECRET;
const stripe = require('stripe')(secretKey);
app.use(express.json());
app.use(cors());
// app.use(cors({ origin: ['http://localhost:3000', 'https://checkout.stripe.com'] }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

// const YOUR_DOMAIN = 'http://localhost:3000';

// const calculateOrderAmount = (items) => {
//   // const dollarAmount = items.reduce((acc, curr) => {
//   //   acc += Number((curr.book.price * curr.quantity).toFixed(2));
//   //   return acc;
//   // }, 0);
//   // return parseInt(dollarAmount * 100);
//   return 1400;
// };

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../static/index.html'))
);

// app.post('/create-checkout-session', async (req, res) => {
//   console.log('create-checkout-session req.body: ', req.body);
//   // const lineItems = req.body;
//   const session = await stripe.checkout.sessions.create({
//     // line_items: [{
//     //   price_data: {
//     //     currency: 'usd',
//     //     product_data: {
//     //       name: 'book'
//     //     },
//     //     unit_amount_decimal: 14.00,
//     //   },
//     //   quantity: 4,
//     // }],
//     line_items: req.body.lineItems.map((item) => {
//       return {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: item.book.title,
//             description: item.book.description,
//             images: item.book.imageUrl,
//           },
//           unit_amount_decimal: item.book.price,
//         },
//         quantity: item.quantity,
//       };
//     }),
//     mode: 'payment',
//     success_url: `${req.protocol}://${req.hostname}:${
//       process.env.PORT || 3000
//     }?success=true`,
//     cancel_url: `${req.protocol}://${req.hostname}:${
//       process.env.PORT || 3000
//     }?canceled=true`,
//   });
//   console.log('SESSION: ', session);

//   res.redirect(303, session.url);
// });

// app.post('/create-payment-intent', async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: 'usd',
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

app.use('/api/auth', require('./api/auth'));
app.use('/api/orders', require('./api/orders'));
app.use('/api/books', require('./api/books'));
app.use('/api/reviews', require('./api/reviews'));
app.use('/api/users', require('./api/users'));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
  
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
    }?canceled=true`,
  });

  res.send(session.url);
});

module.exports = app;
