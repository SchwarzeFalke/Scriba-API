/**
 * @Author: schwarze_falke
 * @Date:   2018-11-26T19:24:15-06:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-11-26T22:52:42-06:00
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
 * Definition of the DB schema
 * @type {Schema}
 * A simple schema of a user entity;
 * has attributes as title, [creation] date
 * and the body of the note
 */

const UserSchema = new Schema({
  userName: String,  // String datatype
  pass: String,
  email: String,
});

/* Module exportation of the schema */
module.exports = mongoose.model('users', UserSchema);
