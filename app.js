const express = require('express');
const path = require('path');
const app = express()

const routes = require('./routes/index');
const books = require('./routes/books');

//Set view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);
app.use('/books', books);

