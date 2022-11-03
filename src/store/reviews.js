import axios from 'axios';

//reducer
const reviews = (state = [], action) => {
  if (action.type === 'GET_REVIEWS') {
    return action.reviews;
  }
  return state;
};

//action creators
const getReviews = (reviews) => {
  return {
    type: 'GET_REVIEWS',
    reviews,
  };
};

//thunks
export const fetchReviews = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/reviews');
    dispatch(getReviews(response.data));
  };
};

export default reviews;
