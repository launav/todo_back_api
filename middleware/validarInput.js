const { validationResult } = require("express-validator");



const validarInput = (req, res, next) => {
    //next funcion callback que se ejecuta si todo ha ido bien y se ejecuta lo que hay a continuacion del middleware
    const errors = validationResult(req);

    //si hay error que me mapee los errores, ya que lo logico sería que no hubiese ninguno por lo que con el ! le decimos que si hay 
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    console.log(errors);
    next();
};

module.exports = {
    validarInput
}
