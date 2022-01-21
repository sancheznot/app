const mongoose = require('mongoose');
// Variables usando process.env
const { NOTES_APP_HOST, NOTES_APP_DATABASE }  = process.env;
const MONGODB = `mongodb://${NOTES_APP_HOST}/${NOTES_APP_DATABASE}`;

mongoose.connect(MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connect'))
    .catch(err => console.log(err));