const moment = require('moment')

//le pasamos el arg value y le diremos que si no existe que retorne false
const validateDate = (value) => {
    if (!value) {
        return false
    };

    //variable que almacenará el valor de moment
    const validarFecha = moment(value);

    //como lo anterior devuelve la fecha hora le preguntamos si es valido que nos va a retornar o true o false
    if (validarFecha.isValid()) {
        return true;
    } else {
        return false;
    };
};

module.exports = {
    validateDate
}