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

app.put('/:id', async (req, res, next) => {
  console.log(req.body);
  try {
    console.log('put route', req.body);
    const review = await Review.findByPk(req.params.id, {
      include: [{ model: User }, { model: Book }],
    });
    console.log('update', review);
    await review.update(req.body);

    res.send(review);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    console.log(review.id);
    await review.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
