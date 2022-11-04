import axios from 'axios';

const cart = (state = { lineItems: [] }, action) => {
  if (action.type === 'SET_CART') {
    return action.cart;
  }
  if (action.type === 'ADD_TO_CART' || action.type === 'REMOVE_FROM_CART') {
    return { ...state, ...action.cart };
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};

export const putInCart = ({ book, quantity }, navigate) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post(
      '/api/orders/cart',
      { book, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: 'ADD_TO_CART', cart: response.data });
    navigate('/cart');
  };
};

export const deleteFromCart = ({ book, quantityToRemove }) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.put(
      '/api/orders/cart',
      { book, quantityToRemove },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: 'REMOVE_FROM_CART', cart: response.data });
  };
};

export default cart;
