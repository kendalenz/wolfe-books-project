import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../store';

const OrderSuccess = () => {
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placeOrder(cart, navigate));
  }, []);

  return (
    <div>
      <h4>Now, those are some solid book choices!</h4>
      <Link to='/orders'>View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
