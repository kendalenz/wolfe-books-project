const express = require('express');
const app = express.Router();
const { Book } = require('../db');

app.get('/', async(req, res, next)=> {
    try {
        const books = await Book.findAll();
        res.send(books);
    }
    catch(err) {
        next(err);
    }
});

module.exports = app;

