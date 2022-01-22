const { Router }  = require('express');
const router = Router();

const { renderNoteForm, createNewNote, renderNotes , renderEditForm, updateNote, deleteNote } = require('../controllers/note.control');

// MEW NOTE
router.get('/note/add', renderNoteForm);
router.post('/note/new-note', createNewNote);

// GET ALL NOTE
router.get('/note/allnotes', renderNotes);

// EDIT NOTES
router.get('/note/edit/:id', renderEditForm);

// UPDATE NOTES
router.put('/note/edit/:id', updateNote);

// DELETE NOTES
router.delete('/note/delete/:id', deleteNote);

module.exports = router