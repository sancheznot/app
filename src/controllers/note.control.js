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

noteCtls.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('./notes/edit-note', { note });
};

noteCtls.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title:title, description:description})
    res.redirect('/note/allnotes');
};

noteCtls.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/note/allnotes');
};

module.exports = noteCtls;