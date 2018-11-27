/**
 * @Author: schwarze_falke
 * @Date:   2018-11-26T19:24:15-06:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-11-26T20:32:25-06:00
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Definition of the DB schema
 * @type {Schema}
 * A simple schema of a note entity;
 * has attributes as title, [creation] date
 * and the body of the note
 */

const NoteSchema = new Schema({
  title: String,  // String datatype
  date: Date,     // Date datatype
  body: String,   // String datatype
});

/* Module exportation of the schema */
module.exports = mongoose.model('notes', NoteSchema);
