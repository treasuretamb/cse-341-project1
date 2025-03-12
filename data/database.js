const dotenv = require('dotenv');
dotenv.config();

const mongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Db is already initialised');
    return callback(null, database);
  }
  mongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client.db();
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialised');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};
