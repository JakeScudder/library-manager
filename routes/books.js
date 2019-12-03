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
  const books = await Book.findAll({ order: [[ "author", "ASC"]]})
  res.render("index", { books, header: "The Library"});
}))

/* New Book Route*/
router.get('/new', asyncHandler(async (req, res) => {
  res.render("new-book", {book: {}, header: "The Library", title: "New Book"});
}));

// Post New Book Route
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/");
  } catch (error) {
      console.error(error);
  }
}));

//GET update book form
router.get('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id)
    res.render('update-book', {book, header: "Update Book", title: book.title})
  } catch (error) {
    console.error(error);
}
}))

// Update a book
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id)
    await book.update(req.body);
    res.redirect("/");
  } catch (error) {
      console.error(error);
  } 
}));

// Delete a book
router.post("/:id/delete", asyncHandler(async (req, res)=> {
  let book;
  try {
    console.log(req.body)
    book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/");
  } catch (error) {
      console.error(error)
  }
}))





module.exports = router;