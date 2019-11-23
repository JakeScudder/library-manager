const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db',
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
}

db.models.Book = require('./book.js') (sequelize);

module.exports = db;