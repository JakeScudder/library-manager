// Importing and setting up express
const express = require('express');
const path = require('path');
const app = express()
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(cookieParser());

// Importing json file and defining projects variable
const routes = require('./routes/index');
const books = require('./routes/books');


// Setting up static route to public folder
app.use('/static', express.static(path.join(__dirname, '/public')))

//Set view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);
app.use('/books', books);



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;