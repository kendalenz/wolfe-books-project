import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
  const { cart } = useSelector((state) => state);
  return (
    <div>
      <h1>Cart</h1>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
};

export default Cart;
