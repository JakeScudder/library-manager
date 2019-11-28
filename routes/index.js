const express = require('express');
const router = express.Router();

/* Get home page
   Redirect to routes/books.js
*/
router.get('/', (req, res, next) => {
  res.redirect("/books")
});

module.exports = router;