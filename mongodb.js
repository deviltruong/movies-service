const mongoose = require('mongoose');

const getMongoURI = options => options.DATABASE_URI;

const connect = options => new Promise((resolve, reject) => {
  const connection = mongoose.connect(getMongoURI(options), {
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (err) => {
    if (err) {
      reject(err);
    }
    resolve(connection);
  });
});

module.exports = Object.assign({}, { connect });
