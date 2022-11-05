import axios from 'axios';

//reducer
const reviews = (state = [], action) => {
  if (action.type === 'GET_REVIEWS') {
    return action.reviews;
  }
  if (action.type === 'ADD_REVIEW') {
    return [...state, action.review];
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

const addReview = (review) => {
  return {
    type: 'ADD_REVIEW',
    review,
  };
};

//thunks
export const fetchReviews = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/reviews');
    dispatch(getReviews(response.data));
  };
};

export const createReview = (review) => {
  return async (dispatch) => {
    const response = await axios.post('/api/reviews', review);
    console.log(response.data);
    dispatch(addReview(response.data));
  };
};

export default reviews;
