import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import books from './books';
import cart from './cart';
import review from './review';

const reducer = combineReducers({
    auth,
    cart,
    books,
    review,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './books';
export * from './review';
