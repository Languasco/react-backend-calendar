/*
    Rutas de usuario / auth
    host + /api/auth
*/

const express = require('express'); 

 const { check } = require('express-validator');     

const { createUser, loginUser, renewToken } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email  es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], createUser );
 
router.post('/', [
    check('email', 'El email  es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],  loginUser );

router.get('/renew', validarJWT ,renewToken );

module.exports = router;