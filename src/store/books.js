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
  if (action.type === 'CREATE_BOOK') {
    state = [...state, action.book];
  }
  if (action.type === 'DELETE_BOOK') {
    state = state.filter((book) => book.id !== action.book.id);
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

export const createBook = (book, navigate) => {
  return async (dispatch) => {
    const response = await axios.post('/api/books', book);
    dispatch({ type: 'CREATE_BOOK', book: response.data });
    navigate(`/books/${response.data.id}`);
  };
};

export const deleteBook = (book, navigate) => {
  return async (dispatch) => {
    await axios.delete(`/api/books/${book.id}`);
    dispatch({ type: 'DELETE_BOOK', book });
    navigate('/books');
  };
};

export default books;
