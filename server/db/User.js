const conn = require('./conn');
const { STRING, UUID, UUIDV4, BOOLEAN } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

const User = conn.define(
  'user',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    username: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 25],
        notNull: {
          msg: 'Please enter a unique, and valid username between 1 and 25 characters long.',
        },
      },
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20],
        notNull: {
          msg: 'Please enter a password between 1 and 20 characters long.',
        },
      },
    },
    firstName: {
      type: STRING,
      allowNull: false,
      Validate: {
        notEmpty: true,
        len: [1, 100],
        notNull: {
          msg: 'Please contact us if your first name is more than 100 characters long.',
        },
      },
    },
    lastName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
        notNull: {
          msg: 'Please contact us if your last name is more than 100 characters long.',
        },
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [1, 100],
        notNull: {
          msg: 'Please contact us if your email is more than 100 characters long.',
        },
      },
    },
    isAdmin: {
      type: BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

User.prototype.createOrder = async function () {
  const cart = await this.getCart();
  cart.isCart = false;
  await cart.save();
  return cart;
};

User.prototype.getCart = async function () {
  let cart = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true,
    },
  });
  if (!cart) {
    cart = await conn.models.order.create({
      userId: this.id,
    });
  }
  cart = await conn.models.order.findByPk(cart.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.book],
      },
    ],
  });
  return cart;
};

User.prototype.addToCart = async function ({ book, quantity }) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.bookId === book.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      bookId: book.id,
      quantity,
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({ book, quantityToRemove }) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.bookId === book.id;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

User.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw 'user not found';
  } catch (ex) {
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
};

module.exports = User;
