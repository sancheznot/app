const noteCtls = {};

const Note = require('../models/Notes')

// se encarga de recibir los datos desde el formulario
noteCtls.renderNoteForm = (req, res) => {
    res.render('./notes/new-notes');
};
// se encarga de agg notas a la base de datos
noteCtls.createNewNote = async (req, res) => {
   const { title, description } = req.body;
   const NewNote = new Note({title: title, description: description});
   await NewNote.save();
   res.redirect('/note/allnotes')
};
// se encarga de buscar notas en la base de datos
noteCtls.renderNotes = async (req, res) => {
    const notes = await Note.find().lean()
    res.render('./notes/allnotes', { notes });
};

noteCtls.renderEditForm = (req, res) => {
    res.send('edit form')
};

noteCtls.updateNote = (req, res) => {
    res.send('update note')
};

noteCtls.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/note/allnotes');
};

module.exports = noteCtls;