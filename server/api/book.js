const express = require('express');
const app = express.Router();
const { Book } = require('../db');

app.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPK(req.params.id);
    res.send(book);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
