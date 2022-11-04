import axios from 'axios';

const cart = (state = { lineItems: [] }, action) => {
  if (action.type === 'SET_CART') {
    return action.cart;
  }
  if (action.type === 'ADD_TO_CART') {
    return {...state, ...action.cart}
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
    const response = await axios.post('/api/orders/cart', { book, quantity }, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'ADD_TO_CART', cart: response.data });
    navigate('/cart');
  };
};

export default cart;
