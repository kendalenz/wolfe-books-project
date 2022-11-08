import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFromCart, putInCart } from '../../store';

const UpdateItemQuantity = (props) => {
  const { cart, books } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [quantityToRemove, setQuantityToRemove] = useState(0);
  // const currentQuantity = props.quantity;
  const book = books.find((b) => b.id === props.bookId);
  const item = cart.lineItems.find((item) => item.id === props.id);
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantity = async (e) => {
    e.preventDefault();
    if (quantity < 0) {
      alert('Enter a positive number!');
      setQuantity(item.quantity)
      throw new Error('invalid quantity');
    }
    try {
      if (quantity > item.quantity) {
        const quantityToAdd = quantity - item.quantity;
        await dispatch(putInCart({ book }, quantityToAdd)); 
      } else {
        const quantityToRemove = item.quantity - quantity;
        await dispatch(deleteFromCart({ book }, quantityToRemove));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={updateQuantity}>
        <label htmlFor="quantity">Update Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button>Update Cart</button>
      </form>
    </div>
  );
};

export default UpdateItemQuantity;
