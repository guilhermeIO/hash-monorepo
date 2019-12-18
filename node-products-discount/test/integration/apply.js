const moment = require('moment');
const { expect } = require('chai');
const { status } = require('grpc');

const mock = require('./mock/apply');
const { client } = require('../../client');
const database = require('../../src/database');
const repository = require('../../src/repository');

describe('Apply', () => {
  before(async () => {
    await database.init();
  });
  after(() => {
    database.closeClient();
  });

  it('should fail when "product_id" is missing', done => {
    const payload = mock.error.requiredProductId;

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
    const payload = mock.error.requiredUserId;

    client.apply(payload, (err, response) => {
      expect(err).to.not.be.equal(null);
      expect(typeof err).to.be.equal('object');
      expect(err.code).to.be.equal(status.INVALID_ARGUMENT);
      expect(err.message).to.contain('user_id');
      expect(err.message).to.contain('empty');
      done();
    })
  });

  it('should fail when product is not found', done => {
    const payload = mock.error.productNotFound;

    client.apply(payload, (err, response) => {
      expect(err).to.not.be.equal(null);
      expect(typeof err).to.be.equal('object');
      expect(err.code).to.be.equal(status.INVALID_ARGUMENT);
      expect(err.message).to.contain('product_id');
      expect(err.message).to.contain('not found');
      done();
    });
  });

  it('should fail when user is not found', done => {
    const payload = mock.error.userNotFound;

    client.apply(payload, (err, response) => {
      expect(err).to.not.be.equal(null);
      expect(typeof err).to.be.equal('object');
      expect(err.code).to.be.equal(status.INVALID_ARGUMENT);
      expect(err.message).to.contain('user_id');
      expect(err.message).to.contain('not found');
      done();
    });
  });

  it('should give zero discount when no rules are elegible', done => {
    try {
      const payload = mock.success.noRulesApply;

      repository.update(
        'users',
        { date_of_birth: moment('1985-06-20').toISOString() },
        { '_id': payload.user_id }
      ).then(() => {
        client.apply(payload, (err, response) => {
          expect(err).to.be.equal(null);
          expect(typeof response).to.be.equal('object');
          const { discount } = response;
          expect(typeof discount).to.be.equal('object');
          expect(parseInt(discount.percent)).to.be.equal(0);
          expect(parseInt(discount.value_in_cents)).to.be.equal(0);
          done();
        });
      })
    } catch (error) {
      done(error);
    }
  });

  it('should give 5% discount when today is user\'s birthday', done => {
    try {
      const payload = mock.success.noRulesApply;

      repository.update(
        'users',
        { date_of_birth: moment().toISOString() },
        { '_id': payload.user_id }
      ).then(() => {
        client.apply(payload, (err, response) => {
          expect(err).to.be.equal(null);
          expect(typeof response).to.be.equal('object');
          const { discount } = response;
          expect(typeof discount).to.be.equal('object');
          expect(parseInt(discount.percent)).to.be.equal(5);
          expect(parseInt(discount.value_in_cents)).to.be.equal(500);
          done();
        });
      });
    } catch (error) {
      done(error);
    }
  });

  it.skip('should give 10% discount when today is Black Friday', done => {
    try {
      const payload = mock.success.isBlackFriday;

      client.apply(payload, (err, response) => {
        expect(err).to.be.equal(null);
        expect(typeof response).to.be.equal('object');
        const { discount } = response;
        expect(typeof discount).to.be.equal('object');
        expect(parseInt(discount.percent)).to.be.equal(10);
        done();
      });
    } catch (error) {
      done(error);
    }
  });

  it.skip('should limit discount to 10% (user birthday + Black Friday)');
});
