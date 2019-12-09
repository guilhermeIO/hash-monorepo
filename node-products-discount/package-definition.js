const PROTO_PATH = '/protobufs/products_discount.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const { productsdiscount } = grpc.loadPackageDefinition(packageDefinition);

module.exports = { grpc, productsdiscount };
