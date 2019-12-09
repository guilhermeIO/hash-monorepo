'use strict';

const { apply } = require('./src/apply');
const { grpc, productsdiscount } = require('./package-definition');

function createServer() {
  const server = new grpc.Server();

  server.addService(
    productsdiscount.ProductsDiscount.service, { apply }
  );

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

  return server;
}

createServer().start();
