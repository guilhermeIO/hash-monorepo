const Joi = require('@hapi/joi');
const { get } = require('lodash');

const schemas = {
  'apply': Joi.object({
    product_id: Joi.string().required(),
    user_id: Joi.string().required(),
  })
};

function validate (method, payload) {
  const { error } = schemas[method].validate(payload);

  return !error
    ? {}
    : { error: get(error, 'details.0.message', 'Undefined validation error') };
}

module.exports = { validate };
