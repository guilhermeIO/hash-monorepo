const client = require('./client');

const payload = { product_id: '1234', user_id: '5678' };

client.apply(payload, (err, response) => {
  if (err) {
    return console.error(err);
  }
  console.log('WORKED!', response);
});
