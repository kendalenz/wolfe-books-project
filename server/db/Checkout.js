const conn = require('./conn');
const { STRING, UUID, UUIDV4, DECIMAL, ENUM } = conn.Sequelize;

const Checkout = conn.define('checkout', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  orderId: {
    type: UUID,
    allowNull: false,
  },
  shippingAddress: {
    type: STRING,
    allowNull: false,
  },
  billingAddress: {
    type: STRING,
    allowNull: false,
  },
  couponCode: {
    type: STRING,
  },
  amountDue: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  paymentMethod: {
    type: ENUM('CreditCard', 'PayPal', 'GooglePay'),
    allowNull: false,
  },
  creditCardNumber: {
    type: STRING,
    validate: {
      isCreditCard: true,
    },
  },
});

module.exports = Checkout;
