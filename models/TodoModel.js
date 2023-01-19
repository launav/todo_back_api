const { Schema, model } = require('mongoose');

//esqueleto del evento
const TodoSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
    date: {
        type: Date,
        required: true
    },
    user: {//referenciamos a un object id
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = model('Todo', TodoSchema)