import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Review from '../Review/Review';
import CreateReview from '../Review/CreateReview';
import AddToCart from '../Cart/AddToCart';
import { BsArrowLeft } from 'react-icons/bs';
import { deleteBook } from '../../store';
import Recs from './Recs';
const Book = () => {
  const { books, auth } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const book = books.find((book) => book.id === id);

  if (!book) return <h1>...loading</h1>;

  const destroyBook = () => {
    if (
      confirm(`Are you sure you want to delete ${book.title} from the store?`)
    ) {
      dispatch(deleteBook(book, navigate));
    }
  };

  return (
    <div className="site">
      <div className="site-content">
        <div className="book_page">
          <img src={book.imageUrl} className="book_page_img" alt="Book cover" />
          <div className="book_text">
            <h4>{book.title}</h4>
            <p>${book.price}</p>
            <p>{book.description}</p>
            <AddToCart />
            {auth.isAdmin ? (
              <Link to={`/books/${book.id}/edit`}>Edit Book Info</Link>
            ) : null}
            {auth.isAdmin ? (
              <button onClick={() => destroyBook()}>Delete Book</button>
            ) : null}
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
        <Recs />
      </div>
    </div>
  );
};

export default Book;
