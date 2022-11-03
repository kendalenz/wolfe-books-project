import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../store';

const Review = (props) => {
  const { reviews } = useSelector((state) => state);
  console.log(reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviews(props));
  }, []);
  return (
    <div>
      See reviews...
      {reviews.map((review) => {
        <div>{review.text}</div>;
      })}
    </div>
  );
};

export default Review;
