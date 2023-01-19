const Todo = require('../models/TodoModel');

//mostrar los Todos
const getTodos = async (req, res) => {

    //instanciamos el modelo todoModel
    const todos = await Todo.find().populate('user', 'name email')

    return res.status(200).json({
        ok: true,
        msg: 'recoger Todos',
        todos
    })
};


//Crear el todo
const createTodo = async (req, res) => {

    //instanciamos el todo
    const createTodo = new Todo(req.body);

    try {
        //requerimos del todo user el id del usuario
        createTodo.user = req.uid;

        const newTodo = await createTodo.save()

        return res.status(201).json({
            ok: true,
            msg: 'creando evento',
            newTodo
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });

    };

};


//Actualizar el complete del todo
const updateTodo = async (req, res) => {

    // console.log(req.params.id);//es un obj y nos devuelve el id

    const todoId = req.params.id;//id del todo, lo requerimos del cuerpo
    const uid = req.uid;//id del user

    try {

        const todo = await Todo.findById(todoId);//ver si está el id

        if (!todo) {
            return res.statuss(404).json({//not found porque no se ha encontrado
                ok: false,
                msg: 'No hay evento con ese id'
            });
        };

        if (todo.user.toString() !== uid) {
            return res.status(401).json({//no tienes privilegios
                ok: false,
                msg: 'No tienes privilegios para editar'
            });
        };

        const newTodo = {
            ...req.body,
            user: uid
        };

        const editedTodo = await Todo.findByIdAndUpdate(todoId, newTodo, { new: true });

        return res.status(200).json({
            ok: true,
            msg: 'Todo editado',
            editedTodo
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });

    };

};

//eliminar
const deleteTodo = async (req, res) => {
    const todoId = req.params.id;//id del todo, lo requerimos del cuerpo
    const uid = req.uid;//id del user

    try {

        const todo = await Todo.findById(todoId);//ver si está el id

        if (!todo) {
            return res.statuss(404).json({//not found porque no se ha encontrado
                ok: false,
                msg: 'No hay evento con ese id'
            });
        };

        if (todo.user.toString() !== uid) {
            return res.status(401).json({//no tienes privilegios
                ok: false,
                msg: 'No tienes privilegios para editar'
            });
        };

        const deletedTodo = await Todo.findByIdAndRemove(todoId, { new: true });

        return res.status(200).json({
            ok: true,
            msg: 'Todo eliminado',
            deletedTodo
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });

    };
};


module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};