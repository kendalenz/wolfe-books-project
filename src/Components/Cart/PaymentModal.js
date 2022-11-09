import React from 'react';

const PaymentModal = (props) => {
  if (!props.show) return null;

  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};

export default PaymentModal;
