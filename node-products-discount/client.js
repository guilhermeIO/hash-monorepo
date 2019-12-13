'use strict';

const { grpc, productsdiscount } = require('./package-definition');

const client = new productsdiscount.ProductsDiscount(
  'localhost:50051', grpc.credentials.createInsecure()
);

module.exports = { client };
