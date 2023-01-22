const mongoose = require('mongoose');


//es asincrona porq hace una solicitud al servidor
const dbConnect = async () => {
    try {

        mongoose.set('strictQuery', true);
        //espera la conexion a moongoaw, le pasamos la var entorno
        await mongoose.connect(process.env.DB_CNN);//requiere la uri
        console.log('conectado a la base de datos');

    } catch (error) {

        console.log(error);
        throw new Error('Error al conectar con la base de datos');

    }
};

module.exports = {
    dbConnect
}