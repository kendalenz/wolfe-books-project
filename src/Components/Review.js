import React from 'react';
import { useSelector } from 'react-redux';

const Review = () => {
  const { reviews } = useSelector((state) => state);
  console.log(reviews);
  return (
    <div>
      <p>See reviews...</p>
      <div>
        {reviews.map((review) => {
          return <div>{review.userId}</div>;
        })}
      </div>
    </div>
  );
};

export default Review;
