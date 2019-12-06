const express = require('express');
const router = express.Router();

//testing
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Retrieves Sequelize object and accesses Book model
const Book = require('../models').models.Book;

//Handles async requests and catch errors
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      console.log(error);
    }
  }
}

//Page Number Function
let pages;
const pageLinks = (async (req, res) => {
  const allBooks = await Book.findAll();
  pages = Math.ceil(allBooks.length / 5);
  return pages;
})

pageLinks();


/*  GET All book listings and display to homepage */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ 
    offset: 0,
    limit: 5,
    order: [[ "author", "ASC"], ["year", "DESC"]]
  })
  res.render("index", { books, pages, style: '../static/stylesheets/style.css', header: "The Library"});
}))

//In Progress
/* Get a particular page link*/
router.get('/page/:n', asyncHandler(async (req, res) => {
  let page = req.params.n;
  let offset = (page * 5) - 5;
  let limit = 5;

  const books = await Book.findAll({ 
    offset: offset,
    limit: limit,
    order: [[ "author", "ASC"], ["year", "DESC"]],
  })
  res.render("index", { books, pages, style: '../../static/stylesheets/style.css', header: "The Library"});
}))

/* New Book Route*/
router.get('/new', asyncHandler(async (req, res) => {
  res.render("new-book", {book: {}, header: "New Book"});
}));

// Post New Book Route and checks if fields are valid
router.post('/new', asyncHandler(async (req, res, next) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("new-book", {book: {}, error, header: "New Book"})
    } else {
      throw error;
    }
  }
}));

//GET update book form
router.get('/:id', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('update-book', {book, header: "Update Book"})
  } else {
    const err = new Error("Sorry, we couldn't find that particular book.");
    err.status = 404;
    next(err);
  }
}))

// Update a book
router.post('/:id', asyncHandler(async (req, res) => {
  debugger
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      //Waiting to update individual book from the Book table
      await book.update(req.body);
      res.redirect("/");
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render('update-book', { book, error, header: "Update Book"})
    } else {
      throw error;
    }
  }
}));

// Delete a book
router.post("/:id/delete", asyncHandler(async (req, res)=> {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/");
  } else {
      res.sendStatus(404);
  }
}))





module.exports = router;