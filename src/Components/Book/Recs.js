import React from 'react';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Recs = (props) => {
  const id = props.book;
  const genre = props.genre;
  const { books } = useSelector((state) => state);
  const booksByGenre = books.filter(
    (book) => book.genre === genre && book.id !== id
  );
  console.log('books by genre array', booksByGenre);
  return (
    <>
      <hr />
      <h2>You Might Also Enjoy...</h2>
      <Carousel
        responsive={responsive}
        infinite={false}
        showDots={true}
        centerMode={true}
      >
        {booksByGenre.map((book) => (
          <Item key={book.id} book={book} />
        ))}
      </Carousel>
    </>
  );
};

const Item = (props) => {
  console.log(props.book.id);
  return (
    <div className="book_rec_info">
      <h3>{props.book.title}</h3>
      <a href={`/#/books/${props.book.id}`}>
        <img
          style={{ height: '10em' }}
          src={props.book.imageUrl}
          alt={props.book.title}
        />
      </a>
    </div>
  );
};
export default Recs;
