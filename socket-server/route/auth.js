const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/new', crearUsuario);

//Login
router.post('/', login);

//revalidar token
router.get('/renew', renewToken)

module.exports = router;