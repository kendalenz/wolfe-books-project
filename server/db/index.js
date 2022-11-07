const conn = require('./conn');
const User = require('./User');
const Book = require('./Book');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');
const Checkout = require('./Checkout');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Book);
Review.belongsTo(Book);
Book.hasMany(Review);
Review.belongsTo(User);
User.hasMany(Review);
Checkout.belongsTo(Order);
Order.hasOne(Checkout);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [
    moe,
    lucy,
    larry,
    wayward,
    girlInLandscape,
    physics,
    runner,
    claysArk,
    ethyl,
  ] = await Promise.all([
    User.create({
      username: 'moe',
      password: '123',
      firstName: 'monique',
      lastName: 'harvey',
      email: 'moe@fullstack.edu',
      isAdmin: true,
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
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/B8C2C643/EAN-9781419732768',
    }),
    Book.create({
      title: 'Girl in Landscape',
      author: 'Jonathan Lethem',
      genre: 'Fiction',
      description:
        'Girl in Landscape finds Lethem once again twisting forms and literary conventions to create a dazzling, completely unconventional tale that manages simultaneously to amaze and move the reader. The heronine is a fourteen-year-old Pella Marsh, whose mother dies just as her family flees a postapocalyptic Brooklyn for the frontier of a recently discovered planet.',
      price: '22.95',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/972A945D/EAN-9780385485180',
    }),
    Book.create({
      title: 'Seven Brief Lessons on Physcis',
      author: 'Carlo Rovelli',
      genre: 'Non-fiction',
      description: `This playful, entertaining, and mind-bending introduction to modern physics briskly explains Einstein's general relativity, quantum mechanics, elementary particles, gravity, black holes, the complex architecture of the universe, and the role humans play in this weird and wonderful world. Carlo Rovelli, a renowned theoretical physicist, is a delightfully poetic and philosophical scientific guide. He takes us to the frontiers of our knowledge: to the most minute reaches of the fabric of space, back to the origins of the cosmos, and into the workings of our minds. The book celebrates the joy of discovery. "Here, on the edge of what we know, in contact with the ocean of the unknown, shines the mystery and the beauty of the world," Rovelli writes. "And it's breathtaking.`,
      price: '18.00',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/7F8A6166/EAN-9780399184413',
    }),
    Book.create({
      title: 'Once a Runner',
      author: 'John L. Parker, Jr.',
      genre: 'Fiction',
      description: `Originally self-published in 1978 and sold at road races out of the trunk of the author's car, ONCE A RUNNER, an inspiring, funny and spot-on tale of one man's quest to become a champion, eventually found its way into the hands of highschool, college, and postgraduate athletes all over the country. The book captures what it means to be a competitive runner, to devote one's entire existence to a single-minded pursuit of excellence. In doing so, it has become one of the most beloved posrts novels ever published. 272p. /n Perhaps the best novel ever written about running. There are parts of "Once a Runner" that are pure poetry. I have never read descriptions of what it is to run and race as accurate and compelling as Parker's.--Tom Jordan, "Track & Field News.`,
      price: '17.00',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/100ADAB7/EAN-9781416597896',
    }),
    Book.create({
      title: "Clay's Ark",
      author: 'Octavia E. Bulter',
      genre: 'Science Fiction',
      description:
        'A gripping tale of survival as an alien pandemic irrevocably changes humanity, from the critically acclaimed author of Parable of the Sower.\n In a violent near-future, Asa Elias Doyle and her companions encounter an alien life form so heinous and destructive, they exile themselves in the desert so as not to contaminate other humans. Resisting the compulsion to infect others is mental agony, but succumbing would mean relinquishing their humanity and free will. Desperate, they kidnap a doctor and his two daughters as they cross the wasteland -- and, in doing so, endanger the world.',
      price: '16.99',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/B9F06AC5/EAN-9781538751503',
    }),
    User.create({
      username: 'ethyl',
      password: '123',
      firstName: 'ethylin',
      lastName: 'grace',
      email: 'ethyl@fullstack.edu',
    }),
  ]);
  await Review.create({
    userId: moe.id,
    bookId: wayward.id,
    rating: 5,
    text: 'amaaaazing!!',
  });
  await Review.create({
    userId: lucy.id,
    bookId: wayward.id,
    rating: 4,
    text: 'must buy!!',
  });
  await Review.create({
    userId: larry.id,
    bookId: girlInLandscape.id,
    rating: 5,
    text: '2 thumbs up!!',
  });
  await Review.create({
    userId: ethyl.id,
    bookId: girlInLandscape.id,
    rating: 5,
    text: 'greeaaaat!!',
  });
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
      physics,
      runner,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Book,
  Review,
  Checkout,
};
