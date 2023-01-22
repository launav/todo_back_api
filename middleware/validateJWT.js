const jwt = require('jsonwebtoken');


const validateJWT = (req, res, next) => {

    const token = req.header('x-token');
//si no hay token 
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    };


    try {

        //le pasamos la var de llave que hemos hecho como segundo argumento para el verify
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(payload);
        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    //middleware que ejecuta la siguiente funcion
    next();

};


module.exports = {
    validateJWT
}