const { Router }  = require('express');
const router = Router();

const { renderNoteForm, createNewNote, renderNotes , renderEditForm, updateNote, deleteNote } = require('../controllers/note.control');
const {isAuthenticated} = require('../helpers/auth');

// MEW NOTE
router.get('/note/add',isAuthenticated, renderNoteForm);
router.post('/note/new-note',isAuthenticated, createNewNote);

// GET ALL NOTE
router.get('/note/allnotes', isAuthenticated , renderNotes);

// EDIT NOTES
router.get('/note/edit/:id',isAuthenticated, renderEditForm);

// UPDATE NOTES
router.put('/note/edit/:id',isAuthenticated, updateNote);

// DELETE NOTES
router.delete('/note/delete/:id',isAuthenticated, deleteNote);

module.exports = router