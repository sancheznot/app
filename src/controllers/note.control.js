const noteCtls = {};

const Note = require('../models/Notes')

noteCtls.renderNoteForm = (req, res) => {
    res.render('./notes/new-notes');
};

noteCtls.createNewNote = (req, res) => {
   const { title, description } = req.body;
   new Note({title: title, description: description});
   
};

noteCtls.renderNotes = (req, res) => {
    res.send('holaa')
};

noteCtls.renderEditForm = (req, res) => {
    res.send('edit form')
};

noteCtls.updateNote = (req, res) => {
    res.send('update note')
};

noteCtls.deleteNote = (req, res) => {
    res.send('delete note')
};

module.exports = noteCtls;