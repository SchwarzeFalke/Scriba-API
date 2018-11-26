/**
 * @Author: schwarze_falke
 * @Date:   2018-11-26T15:00:25-06:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-11-26T16:18:19-06:00
 */

const morgan = require('morgan');
const express = require('express');
const app = express();

// Importing Routes
const indexRoutes = require('./routes/index');


// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));

// Routes
app.use('/', indexRoutes);

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`The server is running on ${app.get('port')}`);
});
