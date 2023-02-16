try {
  require('../secrets');
} catch (err) {
  console.log(err);
  console.log(
    'if running locally, add a secrets.js file which sets the environment variables for STRIPE_CLIENT_ID and STRIPE_CLIENT_SECRET'
  );
}

const app = require('./app');
const { syncAndSeed } = require('./db');

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3002;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
