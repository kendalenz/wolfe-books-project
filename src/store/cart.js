import axios from 'axios';
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === 'SET_CART') {
    return action.cart;
  }
  if (action.type === 'ADD_TO_CART') {
    return [...state.lineItems, action.item]
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

export const putInCart = ({item}) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post(
      '/api/orders/cart',
      {
        headers: {
          authorization: token,
        },
      },
      item
    );
    dispatch({ type: 'ADD_TO_CART', item: response.data });
  };
};

export default cart;
