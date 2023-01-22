const { Router } = require("express");
const { check } = require('express-validator');//nos va a hacer chequeos
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/authController');
const { validarInput } = require("../middleware/validarInput");
const { validateJWT } = require("../middleware/validateJWT");

//middleware
//REGISTER -> ruta que va a seguir cuando se registre
router.post('/new', [
    //chequea que el nombre/email/contraseña no estén vacios, campo y error
    check('name', 'Write a name').not().isEmpty(),
    check('email', 'Write a correct e-mail').isEmail(),
    check('password', 'The password must have more than 6 characters').isLength({ min: 6, max: 20 }),
    //comprueba todos los campos anteriores y comprueba los resultados, si todo va bien me muestra lo siquiente
    validarInput 
], createUser);


//LOGIN
router.post('/', [
    check('email', 'Write a correct e-mail').isEmail(),
    check('password', 'The password must have more than 6 characters').isLength({ min: 6, max: 20 }),
    validarInput
], loginUser);


//RENEW JWT
router.get('/renew', validateJWT, renewToken);

//EXPORTAMOS
module.exports = router;