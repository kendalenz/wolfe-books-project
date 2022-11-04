import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFromCart } from '../store';

const RemoveFromCart = (props) => {
  const { books } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantityToRemove, setQuantityToRemove] = useState(0);
  const book = books.find(book => book.id === props.id);

  const removeItem = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteFromCart({ book, quantityToRemove }, navigate));
    } catch (err) {
      console.log(err);
    }
    setQuantityToRemove(0);
  };

  return (
    <div>
      <form onSubmit={removeItem}>
        <label htmlFor='remove-count'>Do you want to remove any copies from your cart?</label>
        <input
          name='remove-count'
          value={quantityToRemove}
          onChange={(e) => setQuantityToRemove(Number(e.target.value))}
        ></input>
        <button>Remove From Cart</button>
      </form>
    </div>
  );
};

export default RemoveFromCart;