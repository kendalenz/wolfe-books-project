const express = require('express');
const app = express.Router();
const { Book } = require('../db');
const conn = require('../db/conn');

app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      order: conn.col('title'),
    });
    res.send(books);
  } catch (err) {
    next(err);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.send(await book.update(req.body));
  } catch (err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  try {
    res.send(await Book.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = app;
