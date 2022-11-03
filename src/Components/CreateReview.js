import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const createReview = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state);
  return <hr />;
};

export default createReview;
