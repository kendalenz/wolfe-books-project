const conn = require('./conn')
const User = require('./User')
const Book = require('./Book')
const Order = require('./Order')
const LineItem = require('./LineItem')
const Review = require('./Review')

Order.belongsTo(User)
LineItem.belongsTo(Order)
Order.hasMany(LineItem)
LineItem.belongsTo(Book)
Review.belongsTo(Book)
Book.hasMany(Review)

const syncAndSeed = async () => {
    await conn.sync({ force: true })
    const [moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
        User.create({ username: 'moe', password: '123' }),
        User.create({ username: 'lucy', password: '123' }),
        User.create({ username: 'larry', password: '123' }),
        Book.create({ name: 'foo' }),
        Book.create({ name: 'bar' }),
        Book.create({ name: 'bazz' }),
        User.create({ username: 'ethyl', password: '123' }),
    ])
    const testReview = await Review.create({
        bookId: foo.id,
        userId: lucy.id,
        rating: '5',
        text: 'what an awesome read! highly recommend :D',
    })
    const testReview2 = await Review.create({
        bookId: foo.id,
        userId: lucy.id,
        rating: '3',
        text: 'kinda meh...',
    })
    const testReview3 = await Review.create({
        bookId: bar.id,
        userId: lucy.id,
        rating: '4',
        text: 'pretty good!',
    })
    const cart = await ethyl.getCart()
    await ethyl.addToCart({ book: bazz, quantity: 3 })
    await ethyl.addToCart({ book: foo, quantity: 2 })
    return {
        users: {
            moe,
            lucy,
            larry,
        },
        books: {
            foo,
            bar,
            bazz,
        },
    }
}

module.exports = {
    syncAndSeed,
    User,
    Book,
    Review,
}
