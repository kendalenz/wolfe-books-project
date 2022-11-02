import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../store';

//sample code for testing
const book = {
    id: '765eff4a-41f6-47a1-b4b2-b7152c9ce5fc',
    title: 'Wayward',
    author: 'Chris Burkhard',
};

const Review = () => {
    const { reviews } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchReviews(book));
    }, []);
    return <hr />;
};

export default Review;
