import axios from 'axios';

const books = (state = [], action)=> {
  if(action.type === 'SET_BOOKS') {
    return action.books;
  }
  return state;
};

export const fetchBooks = ()=> {
    return async(dispatch)=> {
        const response = await axios.get('/api/books');
        dispatch({ type: 'SET_BOOKS', books: response.data });
    };
};

export default books;