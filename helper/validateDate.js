const moment = require('moment')

const validateDate = (value) => {
    if (!value) {
        return false
    };

    const validarFecha = moment(value);

    if (validarFecha.isValid()) {
        return true;
    } else {
        return false;
    };
};

module.exports = {
    validateDate
}