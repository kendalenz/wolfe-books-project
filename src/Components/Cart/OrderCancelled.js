import React from 'react';

const OrderCancelled = () => {
  return (
    <div id="order_cancelled">
      <h4>
        Aw, snap! Go toss some more books in your cart and checkout when you're
        ready!
      </h4>
      <img src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1017&q=80"></img>
      <Link to="/books">
        <button className="buy_btn">Buy Some Books!</button>
      </Link>
    </div>
  );
};

export default OrderCancelled;
