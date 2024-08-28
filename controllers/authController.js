
const { response } = require('express'); 
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
   
const createUser = async (req, res =response) => {  

   const { name , email, password } = req.body; 

    try {

        let usuario = await Usuario.findOne({ email: email });

        if (usuario) {
          return  res.status(400).json({
                ok:false,
                message :'El correo ya existe'
            })            
        }

        usuario = new Usuario(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();

        // generar el JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok:true,
            uid : usuario.id,
            name : usuario.name,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            message : error
        })
    }

}


const loginUser = async (req, res =response ) => {

    const {  email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
          return  res.status(400).json({
                ok:false,
                message :'El usuario no existe con ese email'
            })            
        }

        const validPassword = bcrypt.compareSync(password, usuario.password );
        if (!validPassword) {   
            return  res.status(400).json({
                ok:false,
                message :'Contraseña incorrecta'
            })            
        }

        // generar el JWT
        const token = await generarJWT( usuario.id, usuario.name );


        res.status(201).json({
            ok:true,
            uid : usuario.id,
            name : usuario.name,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            message : error
        })
    }

 
}


const renewToken =async (req, res = response) => {

    const { uid, name } = req;

    // generar el JWT
    const token = await generarJWT( uid, name);


    res.json({
        ok:true,
        uid : uid,
        name : name,
        token
    });
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}
