const express = require('express'); 
const { getEvents,createEvents, updateEvents, deleteEvents } = require('../controllers/eventsController');
const { validarJWT } = require('../middlewares/validar-jwt');

const { check } = require('express-validator');  
const { validarCampos } = require('../middlewares/validar-campos');


const router = express.Router(); 

//--aplicando la validacion de token A Todas las peticioones
router.use( validarJWT );

router.get('/', [

], getEvents );

router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    validarCampos
],createEvents );

router.put('/:id',[
    
], updateEvents );

router.delete('/:id',[
    
], deleteEvents );

module.exports = router;
