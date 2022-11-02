const conn = require('./conn');
const User = require('./User');
const Book = require('./Book');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Book);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, wayward, girlInLandscape, ethyl] = await Promise.all(
    [
      User.create({
        username: 'moe',
        password: '123',
        firstName: 'monique',
        lastName: 'harvey',
        email: 'moe@fullstack.edu',
      }),
      User.create({
        username: 'lucy',
        password: '123',
        firstName: 'lucinda',
        lastName: 'daniel',
        email: 'lucy@fullstack.edu',
      }),
      User.create({
        username: 'larry',
        password: '123',
        firstName: 'laurence',
        lastName: 'fishburn',
        email: 'larry@fullstack.edu',
      }),
      Book.create({
        title: 'Wayward',
        author: 'Chris Burkhard',
        genre: 'Non-fiction',
        description:
          'Wayward is a collection of strking photographs and the revealing personal stories behind them by one of the leading surf, nature, and adventure photographers of our time.',
        price: '35.00',
        imageUrl: 'https://d2p7wwv96gt4xt.cloudfront.net/G/B8C2C643/EAN-9781419732768'
      }),
      Book.create({
        title: 'Girl in Landscape',
        author: 'Jonathan Lethem',
        genre: 'Fiction',
        description:
          'Girl in Landscape finds Lethem once again twisting forms and literary conventions to create a dazzling, completely unconventional tale that manages simultaneously to amaze and move the reader. The heronine is a fourteen-year-old Pella Marsh, whose mother dies just as her family flees a postapocalyptic Brooklyn for the frontier of a recently discovered planet.',
        price: '22.95',
        imageUrl: 'https://d2p7wwv96gt4xt.cloudfront.net/G/972A945D/EAN-9780385485180'
      }),
      User.create({
        username: 'ethyl',
        password: '123',
        firstName: 'ethylin',
        lastName: 'grace',
        email: 'ethyl@fullstack.edu',
      }),
    ]
  );

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ book: wayward, quantity: 3 });
  await ethyl.addToCart({ book: girlInLandscape, quantity: 2 });
  return {
    users: {
      moe,
      lucy,
      larry,
    },
    books: {
      wayward,
      girlInLandscape,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Book,
  Review,
};
