const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
    try {
        const { email, nombre, password } = req.body;
        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                msg: 'El email ya existe!',
                ok:false
            });
        }

        const usuario = new Usuario(req.body);
        
        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        //guardar usuario
        await usuario.save();

        //generar token
        const token = await generarJWT(usuario.id);

        res.json({
            token,
            usuario,
            ok:true
        });

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error en el servidor. Contacte al Administrador",
            ok:false
        })
    }
}

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                msg: "El email no se existe",
                ok:false
            });
        }

        //validar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                msg: "Datos no validos",
                ok:false
            });
        }

        //generar token
        const token = await generarJWT(usuarioDB.id);
        
        res.json({
            token,
            ok:true,
            usuario:usuarioDB
        });

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error en el servidor. Contacte al Administrador",
            ok:false
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(404).json({
                msg: "El usuario no se existe",
                ok:false
            });
        }

    //generar un nuevo JWT
    const token = await generarJWT(uid);

    res.json({
        usuario,
        token,
        ok:true
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}