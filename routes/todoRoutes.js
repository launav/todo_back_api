const { Router } = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const { validateJWT } = require('../middleware/validateJWT');
const router = Router();
const { check } = require('express-validator');
const { validateDate } = require('../helper/validateDate');
const { validarInput } = require('../middleware/validarInput');


router.use(validateJWT);//se ejecutará para todas las rutas


//RUTA PARA RECOGER LOS EVENTOS
//utilizo la misma ruta para todo porq el método es distinto
router.get('/', getTodos);


//RUTAS PARA CREAR UN EVENTO
router.post('/', [
    check('title', "Debes escribir el título").not().isEmpty(),
    check('date', "Debes indicar la fecha").custom(validateDate),
    validarInput
], createTodo);


//ACTUALIZAR UN EVENTO -> actualizará el estado del evento, si está completo o no
router.put('/:id', updateTodo);


//ELIMINAR UN EVENTO
router.delete('/:id', deleteTodo);


module.exports = router;