import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { editReview } from '../../store';
import { FaStar } from 'react-icons/fa';
import Dialog from '@mui/material/Dialog';

const EditReview = (props) => {
  const dispatch = useDispatch();

  const { reviews, auth } = useSelector((state) => state);

  const bookId = window.location.hash.slice(14);
  const userId = auth.id;

  const [text, setText] = useState(props.text);
  const [rating, setRating] = useState(props.rating);
  const [hover, setHover] = useState(undefined);
  const id = props.id;

  const submit = async (ev) => {
    ev.preventDefault();

    const review = { id, rating, text };
    console.log(review);
    try {
      await dispatch(editReview(review));
      props.onClose();
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <Dialog open={true} onClose={props.onClose}>
      <div className="edit-review">
        <h2>Edit Your Review</h2>
        <form onSubmit={submit}>
          <label>Rating</label>
          <select
            value={rating}
            onChange={(ev) => {
              setRating(ev.target.value);
            }}
          >
            <option default value={undefined}>
              -- select a rating --
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
                    value={rating}
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

          <label>Tell Us What You Thought About {}</label>
          <textarea
            rows="5"
            cols="33"
            onChange={(ev) => setText(ev.target.value)}
            value={text}
          ></textarea>
          <button>Submit</button>
        </form>
      </div>
    </Dialog>
  );
};

export default EditReview;
