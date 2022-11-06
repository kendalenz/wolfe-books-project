import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store';
import StarRatingComponent from 'react-star-rating-component';
import { FaStar } from 'react-icons/fa';

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
};

const Review = (props) => {
  const dispatch = useDispatch();
  const { reviews, auth } = useSelector((state) => state);
  const bookID = props.id;
  const getReviews = reviews.filter((review) => review.bookId === bookID);
  const book = props.book;

  const [starRating, setStarRating] = useState(0);
  const [hoverVal, setHoverVal] = useState(undefined);

  return (
    <div>
      <hr />
      <div>
        <h2>Reviews for {book}</h2>
        {getReviews.map((review) => {
          console.log(review.rating);
          return (
            <div key={review.id}>
              <h3>{review.user.username}</h3>
              {[...Array(5)].map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={25}
                    color={review.rating >= index + 1 ? '#FFBA5A' : '#a9a9a9'}
                  />
                );
              })}{' '}
              ({review.rating} stars)
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
