import axios from 'axios';
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === 'SET_CART') {
    return action.cart;
  }
  if (action.type === 'ADD_TO_CART') {
    return { ...state, lineItems: [...state.cart.lineItems, action.cart.lineItems] };
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

export const putInCart = ({ book, quantity }) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/orders/cart', { book, quantity }, {
      headers: {
        authorization: token,
      },
    });
    console.log('putInCart response: ', response.data);
    dispatch({ type: 'ADD_TO_CART', item: response.data });
  };
};

export default cart;
