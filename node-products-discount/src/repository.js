const { ObjectID } = require('mongodb');

const database = require("./database");
const { LOG_TAG } = require('./config');

const self = module.exports = {
  find: (collection, where) => {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await database.connection();

        where = self._formatCondition(where);

        connection
          .collection(collection)
          .find(where)
          .toArray((err, documents) => {
            if (err) {
              console.error(`${LOG_TAG}: ${err}`);
              return reject(err);
            }
            const conditionAsString = JSON.stringify(where);

            if (!documents.length) {
              console.error(
                `${LOG_TAG}: "${collection}" not found (${conditionAsString})`
              );
              return resolve(null);
            }
            console.log(
              `${LOG_TAG}: "${collection}" found (${conditionAsString})`
            );
            return resolve(documents[0]);
          });
      } catch (error) {
        console.error(`${LOG_TAG}: ${error}`);
        return reject(error);
      }
    });
  },

  update: async (collection, values, where) => {
    try {
      const connection = await database.connection();

      where = self._formatCondition(where);

      const { result } = await connection
        .collection(collection)
        .updateMany(where, { $set: { ...values } });

      console.log(`${LOG_TAG}: "${collection}" updated`, values, where);
      return Promise.resolve(result);
    } catch (err) {
      console.error(`${LOG_TAG}: ${err}`);
      return Promise.reject(err);
    }
  },

  _formatCondition: payload => {
    if (payload._id && !(payload._id instanceof ObjectID)) {
      payload._id = new ObjectID(payload._id);
    }
    return payload;
  }
}
