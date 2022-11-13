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
    <div id='order_success'>
      <h4>Now, those are some solid book choices!</h4>
      <img src='https://images.unsplash.com/photo-1568223236648-b6da0be89b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'></img>
      <Link to="/orders">
        <button id="view_orders_btn">View Orders</button>
      </Link>
    </div>
  );
};

export default OrderSuccess;
