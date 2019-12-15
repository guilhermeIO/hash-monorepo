'use strict';

const config = require('./src/config');
const { apply } = require('./src/apply');
const database = require('./src/database');
const { LOG_TAG } = require('./src/config');
const { grpc, productsdiscount } = require('./package-definition');

function createServer() {
  const server = new grpc.Server();

  server.addService(
    productsdiscount.ProductsDiscount.service, { apply }
  );

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

  return server;
}

async function bootstrap() {
  await database.init();

  createServer().start();
  console.log(`${LOG_TAG}: gRPC Server started`);
}

bootstrap();

process.on('SIGINT', () => database.closeClient());
