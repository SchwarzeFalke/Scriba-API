/**
 * @Author: schwarze_falke
 * @Date:   2018-11-26T16:16:31-06:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-11-26T21:00:23-06:00
 */
const express = require('express');
const router = express.Router();

const Note = require('../models/notes');

/*
 * The following functions are defined to
 * retrieve, create or modify data from
 * mongodb database
 */
router.get('/', (req, res) => {
  res.send('Welcome to Scriba!');
});

/*
 * Retrieves all the notes from database
 */
router.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.send(notes);
});

/*
 * Retrieves a single note from its ID
 */
router.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.send(note);
});

/*
 * Deletes a note from its ID
 */
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Note.deleteOne( {_id: id} );
});

/*
 * Updates a note from the DB
 */
router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  await Note.update({_id: id}, req.body);
});

/*
 * Creates a new note
 */
router.post('/create', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.send('Recieved');
});

/* Module exportation of the routes [Router] */
module.exports = router;
