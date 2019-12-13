const { status } = require('grpc');
const { validate } = require('./schema');

function apply (call, callback) {
  const { request } = call;
  const { error } = validate('apply', request);

  if (error) {
    return callback({ code: status.INVALID_ARGUMENT, message: error });
  }

  callback(null, {  });
};

module.exports = { apply };
