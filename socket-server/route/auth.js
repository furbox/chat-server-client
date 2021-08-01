const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('email', 'El email es Obligatorio').isEmail().not().isEmpty(),
    check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

//Login
router.post('/', [
    check('email', 'El email es Obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarCampos
], login);

//revalidar token
router.get('/renew', validarJWT, renewToken);

module.exports = router;