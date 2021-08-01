const Usuario = require('../models/usuario');


const validEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email} ya existe`);
    }
}

const isValidUser = async (id) => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe`);
    }
}

module.exports = {
    validEmail,
    isValidUser
}