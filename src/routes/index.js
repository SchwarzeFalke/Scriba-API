/**
 * @Author: schwarze_falke
 * @Date:   2018-11-26T16:16:31-06:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-11-26T23:05:09-06:00
 */
const express = require('express');
const router = express.Router();

const Note = require('../models/notes');
const User = require('../models/users');

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

router.get('/notes/:userId', async (req, res) => {
  const { userId } = req.params;
  const notes = await Note.find({userId});
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
  await Note.deleteOne({ _id: id });
});

/*
 * Login for the app
 */
router.post('/login', async (req, res) => {
  const userData = req.body;
  await User.find({
    userName: `${userData.userName}`,
    pass: `${userData.pass}`
  }, (err, user) => {
    if (err) {
      res.send(false);
    } else {
      res.send(user);
    }
  });
});

/*
 * Sign-up for the app
 */
router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user._id);
});

/*
 * Updates a note from the DB
 */
router.post('/edit', async (req, res) => {
  const { id } = req.params;
  await Note.update({
    _id: id
  }, req.body);
});

/*
 * Creates a new note
 */
router.post('/create', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.send('Successfully created!');
});

/* Module exportation of the routes [Router] */
module.exports = router;
