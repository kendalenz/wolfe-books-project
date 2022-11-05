const express = require('express');
const app = express.Router();
const { Book } = require('../db');
const conn = require('../db/conn');

app.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      order: conn.col('title')
    })
    res.send(books);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
