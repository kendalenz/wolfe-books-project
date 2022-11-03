const express = require('express');
const app = express.Router();
const { Review, User } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: [{ model: User }] });
    res.send(reviews);
  } catch (ex) {
    next(ex);
  }
});

app.post('/:id', async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.send(review);
  } catch (ex) {
    next(ex);
  }
});
