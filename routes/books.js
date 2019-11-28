const express = require('express');
const router = express.Router();

//Retrieves Sequelize object and accesses Book model
const Book = require('../models').models.Book;

//Handles async requests and catch errors
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      next(error);
    }
  }
}


/*  GET All book listings and display to homepage */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [[ "year", "DESC"]]})
  console.log(books);
  res.render("index", { books, header: "The Library"});
}))

/* New Book Route*/
router.get('/new', asyncHandler(async (req, res) => {
  res.render("new-book", {book: {}, header: "The Library", title: "New Book"});
}));

//Broken post request to add a book to the database
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    console.log(req);
    book = await Book.create(req.body);
    res.redirect("index", {book, header: "The Library"});
  } catch (error) {
      console.error(error);
  }
    
}));







module.exports = router;