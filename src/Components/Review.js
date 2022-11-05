import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { fetchReviews } from '../store';

const Review = (props) => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state);
  const bookID = props.id;
  const getReviews = reviews.filter((review) => review.bookId === bookID);
  const book = props.book;

  return (
    <div>
      <hr />
      <h2>Reviews for {book}</h2>
      <div>
        {getReviews.map((review) => {
          return (
            <div key={review.id}>
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
