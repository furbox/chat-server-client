const { response } = require("express");
const Usuario = require('../models/usuario');

const crearUsuario = async (req, res = response) => {
    try {
        const { email, nombre, password } = req.body;
        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                msg: 'El email ya existe!'
            });
        }

        //guardar usuario
        const usuario = new Usuario(req.body);
        await usuario.save();

        res.json({
            usuario
        });

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error en el servidor. Contacte al Administrador"
        })
    }
}

const login = async (req, res = response) => {


    const { email, password } = req.body;
    res.json({
        ok: true,
        msg: 'login'
    });
}

const renewToken = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}