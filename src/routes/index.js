/**
 * @Author: schwarze_falke
 * @Date:   2018-11-26T16:16:31-06:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-11-29T18:31:49-06:00
 */
const express = require('express');
const router = express.Router();

const Note = require('../models/notes');
const User = require('../models/users');


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/*
 * The following functions are defined to
 * retrieve, create or modify data from
 * mongodb database
 */
router.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('Welcome to Scriba!');
});

/*
 * Retrieves all the notes from database
 */

router.get('/notes/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(req.params);
  const notes = await Note.find({userId});
  res.header("Access-Control-Allow-Origin", "*");
  res.send(notes);
});

/*
 * Retrieves a single note from its ID
 */
router.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(note);
});

/*
 * Deletes a note from its ID
 */
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Note.deleteOne({ _id: id });
  res.header("Access-Control-Allow-Origin", "*");
  res.send(true);
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
    if (isEmpty(user)) {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(false);
    } else {
      const answer = JSON.parse(JSON.stringify(user));
      res.header("Access-Control-Allow-Origin", "*");
      res.send(answer[0]._id);
    }
  });
});

/*
 * Sign-up for the app
 */
router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  await User.find({
    userName: `${user.userName}`
  }, async (err, user) => {
    if (!isEmpty(user)) {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(false);
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.header("Access-Control-Allow-Origin", "*");
      res.send(newUser._id);
    }
  });
});

/*
 * Updates a note from the DB
 */
router.post('/edit', async (req, res) => {
  const { id } = req.params;
  await Note.update({
    _id: id
  }, req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(true);
});

/*
 * Creates a new note
 */
router.post('/create', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.header("Access-Control-Allow-Origin", "*");
  res.send('Successfully created!');
});

/* Module exportation of the routes [Router] */
module.exports = router;
