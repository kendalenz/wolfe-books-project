const conn = require('./conn');
const { STRING, UUID, UUIDV4, FLOAT } = conn.Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  title: {
    type: STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  author: {
    type: STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  genre: {
    type: STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  description: {
    type: STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  price: {
    type: FLOAT,
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  }

});

module.exports = Product;
