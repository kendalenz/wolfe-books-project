const express = require('express');
const app = express.Router();
const { Review, User, Book } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: User }, { model: Book }],
    });
    res.send(reviews);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    const reviewPlus = await Review.findByPk(review.id, {
      include: [{ model: User }, { model: Book }],
    });
    res.send(reviewPlus);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    await review.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
