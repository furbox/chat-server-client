const { Router } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isValidUser } = require('../helpers/db-validators');

const router = Router();

router.get('/:de', [
    validarJWT,    
    check('de', 'No existe Id').isMongoId(),
    check('de').custom(isValidUser),
    validarCampos
], obtenerChat);


module.exports = router;