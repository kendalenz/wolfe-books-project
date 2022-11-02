import axios from 'axios';

//reducer
const reviews = (state = [], action) => {
  if (action.type === 'GET_REVIEWS') {
    return action.reviews;
  }
  return state;
};
console.log(reviews);

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
    const response = await axios.get(`/api/reviews/${book.id}`);
    dispatch(getReviews(response.data));
  };
};

export default reviews;
