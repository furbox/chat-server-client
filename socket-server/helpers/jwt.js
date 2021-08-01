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
            }else{
                resolve(token);
            }
        });
    })
}

module.exports = {
    generarJWT
}