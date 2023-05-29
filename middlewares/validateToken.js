const jwt = require('jsonwebtoken');
const { response } = require('express');

const validateToken = (req, res = response, next) => {
    const token = req.header('X-AUTH');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }


    next()
}

module.exports = {
    validateToken
}