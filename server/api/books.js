const express = require('express');
const app = express.Router();
const { Book } = require('../db');

module.exports = app;

app.get('/books', async(req, res, next)=> {
    try {
        const books = await Book.findAll();
        res.send(books);
    }
    catch(err) {
        next(err);
    }
});

