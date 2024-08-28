const { response } = require('express'); 

const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');    

    if (!token) {
        return res.status(401).json({
            ok:false,
            message :'No hay token en la petición'
        })
    }
    try {

        //---datos que vienen con el token----
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);             

        req.uid = uid;    
        req.name = name;

        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            message :'Token no valido'
        })
    }       
}

module.exports = {
    validarJWT
}