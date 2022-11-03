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
export const fetchReviews = (book) => {
  return async (dispatch) => {
    const response = await axios.get('/api/reviews');
    console.log(response.data);
    try {
      dispatch(getReviews(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default reviews;
