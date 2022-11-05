import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store';

const Review = (props) => {
  const dispatch = useDispatch();
  const { reviews, auth } = useSelector((state) => state);
  const bookID = props.id;
  const getReviews = reviews.filter((review) => review.bookId === bookID);
  const book = props.book;

  return (
    <div>
      <hr />
      <h2>Reviews for {book}</h2>
      <div>
        {getReviews.map((review) => {
          console.log(review.id);
          return (
            <div key={review.id}>
              <h3>{review.user.username}</h3>
              Rating: {review.rating} stars
              <p>{review.text}</p>
              {auth.id === review.userId ? (
                <button
                  onClick={() => {
                    dispatch(updateReview(review));
                  }}
                >
                  Edit Review
                </button>
              ) : null}
              {auth.id === review.userId || auth.isAdmin === true ? (
                <div>
                  <button
                    onClick={() => {
                      dispatch(deleteReview(review));
                    }}
                  >
                    Delete Review
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Review;
