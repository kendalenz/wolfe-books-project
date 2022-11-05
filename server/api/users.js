const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.use(express.json());

app.post('/', async (req, res, next) => {
  try {
    res.send(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

app.put('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

app.get('/', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (err) {
    next(err);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
