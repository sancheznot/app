const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({

    title:{
        type: 'string',
        require: true
    },
    decription:{
        type: 'string',
        require: true
    }

}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema);