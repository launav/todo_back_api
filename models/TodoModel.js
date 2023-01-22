const { Schema, model } = require('mongoose');

//esqueleto del evento
const TodoSchema = new Schema({
//lo que nos va a entrar desde el form del front a la bbdd y como lo vamos a "pintar" ahi
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true
    },
    user: {//referenciamos a un object id de la bbdd de users
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = model('Todo', TodoSchema)