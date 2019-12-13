const { expect } = require('chai');
const { status } = require('grpc');
const mock = require('./mock/apply');
const { client } = require('../../client');

describe('Apply', () => {
  it('should fail when "product_id" is missing', done => {
    const payload = mock.requiredProductId;

    client.apply(payload, (err, response) => {
      expect(err).to.not.be.equal(null);
      expect(typeof err).to.be.equal('object');
      expect(err.code).to.be.equal(status.INVALID_ARGUMENT);
      expect(err.message).to.contain('product_id');
      expect(err.message).to.contain('empty');
      done();
    });
  });

  it('should fail when "user_id" is missing', done => {
    const payload = mock.requiredUserId;

    client.apply(payload, (err, response) => {
      expect(err).to.not.be.equal(null);
      expect(typeof err).to.be.equal('object');
      expect(err.code).to.be.equal(status.INVALID_ARGUMENT);
      expect(err.message).to.contain('user_id');
      expect(err.message).to.contain('empty');
      done();
    })
  })
});
