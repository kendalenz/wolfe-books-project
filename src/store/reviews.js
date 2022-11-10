import axios from 'axios';

//reducer
const reviews = (state = [], action) => {
  if (action.type === 'GET_REVIEWS') {
    return action.reviews;
  }
  if (action.type === 'ADD_REVIEW') {
    return [...state, action.review];
  }
  if (action.type === 'DELETE_REVIEW') {
    console.log(state);
    return state.filter((review) => review.id !== action.review.id);
  }
  if (action.type === 'UPDATE_REVIEW') {
    return state.map((review) =>
      review.id === action.review.id ? action.review : review
    );
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

const removeReview = (review) => {
  return {
    type: 'DELETE_REVIEW',
    review,
  };
};

const updateReview = (review) => {
  return {
    type: 'UPDATE_REVIEW',
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
    dispatch(addReview(response.data));
  };
};

export const deleteReview = (review) => {
  return async (dispatch) => {
    console.log(review.id);
    await axios.delete(`/api/reviews/${review.id}`);
    dispatch(removeReview(review));
  };
};

export const editReview = (review) => {
  console.log(review);
  return async (dispatch) => {
    const response = await axios.put(`/api/reviews/${review.id}`, review);
    dispatch(updateReview(response.data));
  };
};

export default reviews;
