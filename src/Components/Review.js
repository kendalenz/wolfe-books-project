import React from 'react';
import { useSelector } from 'react-redux';

const Review = (props) => {
  const { reviews } = useSelector((state) => state);
  const bookID = props.id;
  const getReviews = reviews.filter((review) => review.bookId === bookID);
  const book = props.book;
  return (
    <div>
      <hr />
      <p>Reviews for {book}</p>
      <div>
        {getReviews.map((review) => {
          return (
            <div>
              <h3>{review.user.username}</h3>
              Rating: {review.rating} stars
              <p>{review.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Review;
