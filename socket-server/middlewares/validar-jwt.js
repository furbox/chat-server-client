const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    try {

        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({
                msg: 'To existe token en la petición'
            });
        }

        const { uid } = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}