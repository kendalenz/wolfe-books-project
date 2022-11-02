import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Books = () => {
  const { books } = useSelector((state) => state);
  return (
    <div>

      {books.map((book) => {
        // const fictionGenre = books.filter(book => book.genre === 'Fiction');

        // const nonFictionGenre = books.filter(book => book.genre === 'Non-fiction');
        return (
          <div className='books_div'key={book.id}>
            <img src={book.imageUrl} className='books_page_img' alt='Book cover'/>
            <br></br>
            <Link to={`/books/${book.id}`}><strong>{book.title}</strong></Link>
            <br></br>
            <strong>{book.author}</strong>
            <br></br>
            <br></br>
            ${book.price}
            <br></br>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default Books;
