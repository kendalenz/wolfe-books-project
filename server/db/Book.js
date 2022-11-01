const conn = require('./conn');
const { STRING, UUID, UUIDV4, DECIMAL, TEXT } = conn.Sequelize;

const Book = conn.define('book', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  author: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  genre: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Book;
