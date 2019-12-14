const Joi = require('@hapi/joi');
const { get } = require('lodash');
const { LOG_TAG } = require('./config')

const schemas = {
  'apply': Joi.object({
    product_id: Joi.string().required(),
    user_id: Joi.string().required(),
  })
};

function validate (method, payload) {
  const schema = schemas[method];
  if (!schema) {
    return console.error(`${LOG_TAG}: Validation schema not found (${method})`);
  }
  const { error } = schema.validate(payload);

  if (error) {
    console.error(`${LOG_TAG}: ${error}`);
  }

  return {
    payload,
    ...error && {
      error: get(error, 'details.0.message', 'Undefined validation error')
    }
  }
}

module.exports = { validate };
