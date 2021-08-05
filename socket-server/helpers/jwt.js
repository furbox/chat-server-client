const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {


        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_KEY_JWT, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log('[ERR-JWT]: ', err);
                reject('[ERR-JWT]: error al generar el token');
            } else {
                resolve(token);
            }
        });
    })
}

const comprobarJWT = (token = '') => {
    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY_JWT);
        return [true, uid];

    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}