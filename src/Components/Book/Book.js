import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Review from '../Review/Review';
import CreateReview from '../Review/CreateReview';
import AddToCart from '../Cart/AddToCart';
import { BsArrowLeft } from 'react-icons/bs';
const Book = () => {
  const { books, auth } = useSelector((state) => state);
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
      <p>
        <Link to="/books">
          <BsArrowLeft size={30} />
          <>Back</>
        </Link>
      </p>
      <div>
        <Review id={book.id} book={book.title} />
        {auth.id ? <CreateReview id={book.id} book={book.title} /> : null}
      </div>
    </div>
  );
};

export default Book;
