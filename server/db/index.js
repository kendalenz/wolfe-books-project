const conn = require('./conn');
const User = require('./User');
const Book = require('./Book');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');
const Checkout = require('./Checkout');

User.hasMany(Order, { hooks: true, onDelete: 'CASCADE' });
Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem, { hooks: true, onDelete: 'CASCADE' });
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
    may,
    lucy,
    larry,
    cece,
    wayward,
    girlInLandscape,
    physics,
    runner,
    claysArk,
    stranger,
    automateWithPython,
    heartbreaking,
    geekLove,
    eloquentJavascript,
    underworld,
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
      username: 'may',
      password: '123',
      firstName: 'marie',
      lastName: 'smith',
      email: 'may@fullstack.edu',
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
    User.create({
      username: 'cece',
      password: '123',
      firstName: 'grace',
      lastName: 'amazing',
      email: 'cece@fullstack.edu',
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
        'Girl in Landscape finds Lethem once again twisting forms and literary conventions to create a dazzling, completely unconventional tale that manages simultaneously to amaze and move the reader. The heroine is a fourteen-year-old Pella Marsh, whose mother dies just as her family flees a postapocalyptic Brooklyn for the frontier of a recently discovered planet.',
      price: '22.95',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/972A945D/EAN-9780385485180',
    }),
    Book.create({
      title: 'Seven Brief Lessons on Physics',
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
      author: 'Octavia E. Butler',
      genre: 'Science Fiction',
      description:
        'A gripping tale of survival as an alien pandemic irrevocably changes humanity, from the critically acclaimed author of Parable of the Sower.\n In a violent near-future, Asa Elias Doyle and her companions encounter an alien life form so heinous and destructive, they exile themselves in the desert so as not to contaminate other humans. Resisting the compulsion to infect others is mental agony, but succumbing would mean relinquishing their humanity and free will. Desperate, they kidnap a doctor and his two daughters as they cross the wasteland -- and, in doing so, endanger the world.',
      price: '16.99',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/B9F06AC5/EAN-9781538751503',
    }),
    Book.create({
      title: 'Stranger in a Strange Land',
      author: 'Robert A. Heinlein',
      genre: 'Science Fiction',
      description:
        "Raised by Martians on Mars, Valentine Michael Smith is a human who has never seen another member of his species. Sent to Earth, he is a stranger who must learn what it is to be a man. But his own beliefs and his powers far exceed the limits of humankind, and as he teaches them about grokking and water-sharing, he also inspires a transformation that will alter Earth's inhabitants forever...",
      price: '9.99',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/29ADBA02/EAN-9781984802781',
    }),
    Book.create({
      title: 'Automate the Boring Stuff with Python',
      author: 'Al Sweigart',
      genre: 'Software Development',
      description:
        "If you've ever spent hours renaming files or updating hundreds of spreadsheet cells, you know how tedious tasks like these can be. But what if you could have your computer do them for you? In this fully revised second edition of the best-selling classic Automate the Boring Stuff with Python, you'll learn how to use Python to write programs that do in minutes what would take you hours to do by hand--no prior programming experience required. You'll learn the basics of Python and explore Python's rich library of modules for performing specific tasks, like scraping data off websites, reading PDF and Word documents, and automating clicking and typing tasks.",
      price: '39.95',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/4351951B/EAN-9781593279929',
    }),
    Book.create({
      title: 'A Heartbreaking Work of Staggering Genius',
      author: 'Dave Eggers',
      genre: 'Non-fiction',
      description:
        'The literary bestseller that redefines both family and narrative for the 21st century, this moving memoir is the story of a college senior who, in the space of five weeks, loses both of his parents to cancer and inherits his eight-year-old brother. This is an exhilarating debut that manages to be simultaneously hilarious and wildly inventive as well as a deeply heartfelt story of the love that holds a family together.',
      price: '18.00',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/E66CC6D6/EAN-9780375725784',
    }),
    Book.create({
      title: 'Geek Love',
      author: 'Katherine Dunn',
      genre: 'Fiction',
      description:
        'At once a highly regarded novel and an enduring cult classic, "Geek Love" is the story of the Binewskis, a carnival family of human oddities. As Dunn charts their journey across the U.S. backwaters, their Machiavellian rivalries, and their galvanic effect on gawking crowds, she takes on everything from definitions of beauty to organized religion to family values.',
      price: '17.95',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/39BFAFD3/EAN-9780375713347',
    }),
    Book.create({
      title: 'Eloquent JavaScript',
      author: 'Marijn Haverbeke',
      genre: 'Software Development',
      description:
        'This much anticipated and thoroughly revised third edition of Eloquent JavaScript dives deep into the JavaScript language to show you how to write beautiful, effective code. It has been updated to reflect the current state of JavaScript and web browsers and includes brand-new material on features like class notation, arrow functions, iterators, async functions, template strings, and block scope. A host of new exercises have also been added to test your skills and keep you on track.',
      price: '39.95',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/57848D64/EAN-9781593279509',
    }),
    Book.create({
      title: 'Underworld',
      author: 'Don DeLillo',
      genre: 'Fiction',
      description:
        'A finalist for the National Book Award, Don DeLillo\'s most powerful and riveting novel--"a great American novel, a masterpiece, a thrilling page-turner" (San Francisco Chronicle)--Underworld is about the second half of the twentieth century in America and about two people, an artist and an executive, whose lives intertwine in New York in the fifties and again in the nineties. With cameo appearances by Lenny Bruce, J. Edgar Hoover, Bobby Thompson, Frank Sinatra, Jackie Gleason and Toots Shor, "this is DeLillo\'s most affecting novel...a dazzling, phosphorescent work of art" (Michiko Kakutani, The New York Times).',
      price: '22.00',
      imageUrl:
        'https://d2p7wwv96gt4xt.cloudfront.net/G/BA6443C5/EAN-9780684848150',
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
      may,
      lucy,
      larry,
      cece,
      ethyl,
    },
    books: {
      wayward,
      girlInLandscape,
      physics,
      runner,
      claysArk,
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
