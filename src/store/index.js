import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import books from './books';
import cart from './cart';
import reviews from './reviews';

const reducer = combineReducers({
  auth,
  cart,
  books,
  reviews,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './books';
export * from './reviews';
