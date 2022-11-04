import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Review from './Review';
import CreateReview from './CreateReview';
import AddToCart from './AddToCart';

const Book = () => {
  const { books } = useSelector((state) => state);
  const { id } = useParams();

  const book = books.find((book) => book.id === id);

  if (!book) return <h1>...loading</h1>;

  return (
    <div>
      <div className="book_page">
        <img src={book.imageUrl} className="book_page_img" alt="Book cover" />
        <div className="book_text">
          <h4>{book.title}</h4>
          <p>${book.price}</p>
          <p>{book.description}</p>
          <AddToCart />
        </div>
      </div>
      <div>
        <Review id={book.id} book={book.title} />
        <CreateReview id={book.id} book={book.title} />
      </div>
    </div>
  );
};

export default Book;
