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
   NewNote.user = req.user.id;
   await NewNote.save();

   req.flash('success_msg', 'Note added Successfully');
   res.redirect('/note/allnotes')
};
// se encarga de buscar notas en la base de datos
noteCtls.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).lean().sort({createdAt: 'desc'});
    res.render('./notes/allnotes', { notes });
};

noteCtls.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if(note.user != req.user.id){
        req.flash('error_msg', 'Not authorized')
        return res.redirect('/note/allnotes')
    }
    res.render('./notes/edit-note', { note });
};

noteCtls.updateNote = async (req, res) => {
    const { title, description } = req.body;
    const note = await Note.findById(req.params.id).lean();
     if(note.user != req.user.id){
        req.flash('error_msg', 'Not authorized')
        return res.redirect('/note/allnotes')
    }else{
        await Note.findByIdAndUpdate(req.params.id, {title:title, description:description});
        req.flash('success_msg', 'Note Updated Successfully');
        res.redirect('/note/allnotes');
    }
    
};

noteCtls.deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if(note.user != req.user.id){
        req.flash('error_msg', 'Not authorized')
        return res.redirect('/note/allnotes')
    }else{
        await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg' , 'Delete Successfully');
    res.redirect('/note/allnotes');
    }
    
};

module.exports = noteCtls;