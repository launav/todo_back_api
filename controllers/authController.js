const bcript = require('bcryptjs');
const { JWTGenerator } = require('../helper/generateJwt');

const User = require('../models/UserModel');

//CREAR USER-> REGISTRO
const createUser = async (req, res) => {

    // console.log(req);

    const { name, email, password } = req.body;

    try {
        //comprobar que el usuario no exista aacediendo a la bbdd y ver si no hay ningun user con ese email
        //busca por el email
        let usuario = await User.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        };

        usuario = new User(req.body)
        //si el user no existe vamos a encriptar la contraseña

        const salt = bcript.genSaltSync();//si no tiene argumento es 10-> el salt es un num aleatorio
        //encripatcion de una sola via

        usuario.password = bcript.hashSync(password, salt);//req el password inicial y el salt para encriptarla
        // console.log(usuario.password);

        //subir el usuario a la bbdd
        await usuario.save();

        //crear el token 
        const token = await JWTGenerator(usuario.id, usuario.name);

        //devolvemos la respuesta
        res.status(201).json({
            ok: true,
            msg: 'registrando',
            token,
            user: {
                ...usuario
            }
        });

    } catch (error) {
        // console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        })
    };


};

//LOGIN USER-> LOGEARSE
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        const usuario = await User.findOne({ email });

        if (!usuario) {
            res.status(400).json({
                ok: false,
                msg: 'No hay usuario con ese e-mail'
            });
        };

        //Ahora vamos a comprobar la contraseña
        const passwordExist = bcript.compareSync(password, usuario.password);

        if (!passwordExist) {
            res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        };

        //Volvemos a generar el jwt
        const token = await JWTGenerator(usuario.id, usuario.name);

        const user = {
            name: usuario.name,
            email: usuario.email,
            uid: usuario._id
        };

        return res.status(200).json({
            ok: true,
            msg: 'Login correcto',
            user,
            token

        });



    } catch (error) {
        // console.log(error);

        //500->error del servidor
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

};

//RENEW TOKEN
const renewToken = async (req, res) => {
    // console.log(req);
    //valida si el token está y genera un nuevo token
    //es asincrona porque el jwt genera una promesa

    const { uid, name } = req;

    const token = await JWTGenerator(uid, name);//esta en jwtgenerator

    return res.json({
        ok: true,
        msg: 'renew token',
        user: { uid, name },
        token
    });
};

module.exports = {
    createUser,
    loginUser,
    renewToken
}