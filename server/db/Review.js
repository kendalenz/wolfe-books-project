const conn = require('./conn')
const { INTEGER, UUID, UUIDV4, TEXT } = conn.Sequelize

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
    productId: {
        type: UUID,
        allowNull: false,
    },
    text: {
        type: TEXT,
    },
    rating: {
        type: INTEGER,
        allowNull: false,
    },
})

module.exports = Review
