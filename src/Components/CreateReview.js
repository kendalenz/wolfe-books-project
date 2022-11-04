import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//question: a review belongs to a user and so it has a userId...how do I get the user's id to send with the post request? pull in the token?

const CreateReview = (props) => {
  //plan to pass in the bookId via props
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  console.log(auth);
  const bookID = props.id;
  const [bookId, setBookId] = useState(bookID);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  return (
    <div>
      <hr />
      <h2>Leave a Review</h2>
      <form>
        <label>Rating</label>
        <select
          value={rating}
          onChange={(ev) => {
            setRating(ev.target.value);
          }}
        >
          <option value={undefined}>-- select a rating --</option>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>

        <label>Tell Us What You Thought About {props.book}</label>
        <textarea rows="5" cols="33"></textarea>
      </form>
    </div>
  );
};

export default CreateReview;
