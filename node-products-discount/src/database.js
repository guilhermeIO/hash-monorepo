const { LOG_TAG } = require('./config');
const { MongoClient } = require('mongodb');

let _connection;
let _client;

module.exports = {
  init: function (url) {
    return new Promise((resolve, reject) => {
      try {
        if (!_client) {
          _client = new MongoClient(url, { useNewUrlParser: true });
        }

        if (_connection) {
          console.log(`${LOG_TAG}: Reusing database connection`);
          return resolve(_connection);
        }

        _client.connect(err => {
          if (err) {
            console.error(`${LOG_TAG}: ${err}`);
            return reject(Error(err));
          }
          console.log(`${LOG_TAG}: Database connection opened`);
          _connection = _client.db('admin');
          return resolve(_connection);
        });
      } catch (error) {
        console.error(`${LOG_TAG}: Database connection error` + error);
        return reject(Error(error));
      }
    })
  },
  connection: () => _connection,
  closeClient: () => {
    if (!_connection) {
      return console.log(`${LOG_TAG}: No database connection open.`);
    }
    _client.close();
    console.log(`${LOG_TAG}: Database connection closed`);
  }
};
