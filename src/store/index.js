import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import books from './books';
import cart from './cart';

const reducer = combineReducers({
  auth,
  cart,
  books,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './books';
