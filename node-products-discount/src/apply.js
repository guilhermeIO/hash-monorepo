const { status } = require('grpc');
const { ObjectID } = require('mongodb');
const { validate } = require('./schema');
const repository = require('./repository');

function apply (call, callback) {
  const { request } = call;
  const { error } = validate('apply', request);

  if (error) {
    return callback({ code: status.INVALID_ARGUMENT, message: error });
  }

  findProduct(request)
    .then(payload => findUser(payload))
    .then(payload => {
      return callback(null, {
        discount: { percent: 0, value_in_cents: 0 }
      });
    })
    .catch(error => {
      callback(error);
    });
}

async function findProduct (payload) {
  const product = repository
    .find('products', { '_id': new ObjectID(payload.product_id) });

  if (!product) {
    const error = {
      code: status.INVALID_ARGUMENT,
      message: `Product not found (product_id: ${payload.product_id})`
    };
    return Promise.reject(error);
  }
  return { ...payload, product };
}

async function findUser (payload) {
  const user = await repository
        .find('users', { '_id': new ObjectID(payload.user_id) });

  if (!user) {
    const error = {
      code: status.INVALID_ARGUMENT,
      message: `User not found (user_id: ${payload.user_id})`
    };
    return Promise.reject(error);
  }
  return { ...payload, user, };
}

module.exports = { apply };
