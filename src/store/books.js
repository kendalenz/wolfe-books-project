import axios from 'axios';

const books = (state = [], action) => {
  if (action.type === 'SET_BOOKS') {
    return action.books;
  }
  if (action.type === 'UPDATE_BOOK') {
    state = state.map((book) =>
      book.id === action.book.id ? action.book : book
    );
  }
  return state;
};

export const fetchBooks = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/books');
    dispatch({ type: 'SET_BOOKS', books: response.data });
  };
};

export const editBook = (book, navigate) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/books/${book.id}`, book);
    dispatch({ type: 'UPDATE_BOOK', book: response.data });
    navigate(`/books/${response.data.id}`);
  };
};

export default books;
