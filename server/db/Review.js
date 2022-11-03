const conn = require('./conn');
const { INTEGER, UUID, UUIDV4, TEXT, DATE } = conn.Sequelize;

const Review = conn.define('review', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  bookId: {
    type: UUID,
    allowNull: false,
  },
  text: {
    type: TEXT,
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 0,
    },
  },
});

module.exports = Review;
