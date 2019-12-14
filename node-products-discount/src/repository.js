const { LOG_TAG } = require('./config');
const database = require("./database");

module.exports = {
  find: (collection, where) => {
    return new Promise((resolve, reject) => {
      const connection = database.connection();

      try {
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
  }
}
