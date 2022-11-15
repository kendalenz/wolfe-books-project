import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReview } from '../../store';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const CreateReview = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reviews } = useSelector((state) => state);

  const { auth } = useSelector((state) => state);

  const userId = auth.id;
  const bookId = props.id;
  const [text, setText] = useState('');
  const [rating, setRating] = useState(undefined);
  const [hover, setHover] = useState(undefined);

  const submit = async (ev) => {
    ev.preventDefault();
    if (userId) {
      const review = { userId, bookId, rating, text };
      try {
        await dispatch(createReview(review));
        setText('');
        setRating(0);
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <form onSubmit={submit}>
        <label>Select a Rating</label>
        <select
          value={rating}
          onChange={(ev) => {
            setRating(ev.target.value);
          }}
        >
          <option default value={undefined}>
            -- -- 
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => {
                    setRating(ratingValue);
                  }}
                />
                <FaStar
                  key={index}
                  size={22}
                  color={
                    (hover || rating) >= ratingValue ? '#FFBA5A' : '#a9a9a9'
                  }
                  onMouseOver={() => setHover(ratingValue)}
                  onMouseOut={() => setHover(undefined)}
                />
              </label>
            );
          })}
        </div>

        <label>Tell us what you thought about {props.book}</label>
        <textarea
          rows="5"
          cols="33"
          onChange={(ev) => setText(ev.target.value)}
          value={text}
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateReview;
