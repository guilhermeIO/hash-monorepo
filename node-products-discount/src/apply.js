const moment = require('moment');
const { status } = require('grpc');

const { validate } = require('./schema');
const repository = require('./repository');

module.exports = {
  apply: (call, callback) => {
    const { request } = call;
    const { error } = validate('apply', request);

    if (error) {
      return callback({ code: status.INVALID_ARGUMENT, message: error });
    }

    return findProduct(request)
      .then(payload => findUser(payload))
      .then(payload => setDefaultDiscount(payload))
      .then(payload => verifyUserBirthday(payload))
      .then(payload => verifyBlackFriday(payload))
      .then(payload => limitDiscountPercent(payload))
      .then(({ discount }) => callback(null, { discount }))
      .catch(error => callback(error));
  }
};

async function findProduct (payload) {
  const product = await repository
    .find('products', { '_id': payload.product_id });

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
        .find('users', { '_id': payload.user_id });

  if (!user) {
    const error = {
      code: status.INVALID_ARGUMENT,
      message: `User not found (user_id: ${payload.user_id})`
    };
    return Promise.reject(error);
  }
  return { ...payload, user };
}

async function setDefaultDiscount (payload) {
  return {
    ...payload,
    discount: { percent: 0, value_in_cents: 0 }
  };
}

async function verifyUserBirthday (payload) {
  const { user, discount } = payload;

  const isBirthday = moment().diff(moment(user.date_of_birth), 'days') === 0;

  if (isBirthday) {
    discount.percent += 5;
  }
  return { ...payload, discount };
}

async function verifyBlackFriday (payload) {
  const { discount } = payload;

  const isBlackFriday = moment().format('DD-MM') === '25-11';

  if (isBlackFriday) {
    discount.percent += 10;
  }
  return { ...payload, discount };
}

async function limitDiscountPercent (payload) {
  const { discount } = payload;

  if (discount.percent > 10) {
    discount.percent = 10;
  }
  return { ...payload, discount };
}
