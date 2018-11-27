/**
 * @Author: schwarze_falke
 * @Date:   2018-11-26T15:00:25-06:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-11-26T19:22:56-06:00
 */

const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Database connection
mongoose.connect("mongodb://localhost:27017/scriba-db", { useNewUrlParser: true })
  .then(db => console.log('Connected DB'))
  .catch(err => console.log(err));

// Importing Routes
const indexRoutes = require('./routes/index');


// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


// Routes
app.use('/', indexRoutes);

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`The server is running on ${app.get('port')}`);
});
