const express = require('express');
const router = express.Router();
const Book = require('../models/book').Book;

console.log(Book);

function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      res.status(500).send(error);
    }
  }
}


/*  GET Book listing */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [[ "id", "DESC"]]})
  console.log(books);
  res.render("books/index", { books, title: "The Library"});
}))

module.exports = router;