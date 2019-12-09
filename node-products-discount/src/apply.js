function apply (call, callback) {
  callback(null, { discount: { percent: 0, value_in_cents: 0 } });
};

module.exports = { apply };
