'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model{}
  Book.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING, 
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"',
        },
        notEmpty: {
          msg: 'Please provide a value for the "title"',
        }
      }

    },
    author: {
      type: Sequelize.STRING, 
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "author"',
        },
        notEmpty: {
          msg: 'Please provide a value for the "author"',
        }
      }
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "genre"',
        },
        notEmpty: {
          msg: 'Please provide a value for the "genre"',
        }
      }
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "year"',
        },
        notEmpty: {
          msg: 'Please provide a value for the "year"',
        }
      }

    }
  }, { sequelize });

  return Book;
}
