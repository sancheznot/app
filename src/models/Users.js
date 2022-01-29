const {Schema, model} = require('mongoose');
const cryptPW = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    }
},{
    timestamps: true
});
// Aqui se hace el cifrado de la contrase;a
UserSchema.methods.encryptPassword = async password => {
   const salt = await cryptPW.genSalt(10);
   return await cryptPW.hash(password, salt);
};
// Aqui se hace comparacion con la contrase;a guardada en la base de datos, devuelve si es true o false
UserSchema.methods.matchPassword = async function(password){
    return await cryptPW.compare(password, this.password);
};

module.exports = model('User', UserSchema);