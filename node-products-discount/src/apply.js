const { status } = require('grpc');
const { LOG_TAG } = require('./config');
const { validate } = require('./schema');
const database = require("./database");

function apply (call, callback) {
  const { request } = call;
  const { error } = validate('apply', request);

  if (error) {
    console.error(`${LOG_TAG}: ${error}`);
    return callback({ code: status.INVALID_ARGUMENT, message: error });
  }

  findProduct(request.product_id)
  .then(product => {
    if (!product) {
      return callback({
        code: status.INVALID_ARGUMENT,
        message: `Product not found (product_id: ${request.product_id})`
      });
    }
    return callback(null, {
      discount: { percent: 0, values_in_cents: 0 }
    });
  })
  .catch(({ message }) => {
    console.error(`${LOG_TAG}: ${message}`)
    return callback({ code: status.INTERNAL, message });
  });
}

function findProduct (id) {
  return new Promise((resolve, reject) => {
    try {
      const connection = database.connection();

      connection
        .collection('products')
        .find({ _id: id })
        .toArray((err, products) => {
          if (err) {
            console.error(`${LOG_TAG}: ${err}`);
            return reject(err);
          }
          if (!products.length) {
            console.error(`${LOG_TAG}: Product not found (id: ${id})`);
            return resolve(null);
          }
          console.log(`${LOG_TAG}: Product found (id: ${id})`);
          return resolve(product[0]);
        });
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = { apply };
