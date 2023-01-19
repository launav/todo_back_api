const { Schema, model } = require('mongoose');

//va a ser lo que entre en la bbdd
//usuarios
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },


});

module.exports = model('User', UserSchema);