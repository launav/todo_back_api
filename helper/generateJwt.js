const jwt = require('jsonwebtoken');
//requerimos el jwt

const JWTGenerator = (uid, name, email) => {//recoge el payload
    //recoge lo que le queramos enviar en el payload
    return new Promise((resolve, reject) => {
        const payload = { uid, name, email };

        jwt, jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '20h' },//tiempo que tarda en expirar el token del user
            (error, token) => {
                if (error) {
                    // console.log(error)
                    reject('Error al generar el token');//hace directamente un return
                }
                resolve(token);
            }
        );
    });
};

module.exports = {
    JWTGenerator
}