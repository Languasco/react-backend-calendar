

const { response } = require('express'); 
const Evento = require('../models/Evento');

const getEvents = async (req, res =response) => {  

     try {
 
        const eventos = await Evento.find()
                                    .populate('user', 'name');

 
         res.status(201).json({
             ok:true,
             eventos
         })
 
     } catch (error) {
         res.status(400).json({
             ok:false,
             message : error
         })
     }
 
 }

 const createEvents = async (req, res =response) => {  

    const evento = new  Evento(req.body);

    try {

       evento.user = req.uid;
       const eventoGuardado =  await evento.save();

        res.status(201).json({
            ok:true,
            evento : eventoGuardado
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            message : error
        })
    }

}

const updateEvents = async (req, res =response) => {  

    const { id } = req.params; // Extrayendo el parámetro desde la URL
    const uid = req.uid;
 
    try {

        const evento = await Evento.findById(id);

        if(!evento){
            return res.status(404).json({
                ok:false,
                message : 'Event not found'
            })
        }

        if (evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                message : 'cant update event'
            })
        }

        const eventoNuevo  =  {
            ...req.body,
            user : uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(id, eventoNuevo, {new:true});

        res.status(201).json({
            ok:true,
            evento : eventoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            message : error
        })
    }

}

const deleteEvents = async (req, res =response) => {  
    
    const { id } = req.params; // Extrayendo el parámetro desde la URL
    const uid = req.uid;

    try {

        const evento = await Evento.findById(id);
        if(!evento){        
            return res.status(404).json({
                ok:false,
                message : 'Event not found'
            })
        }

        if (evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                message : 'cant delete event'
            })
        }

        const deletedEvent = await Evento.findByIdAndDelete(id);

        res.status(201).json({
            ok:true,
            message : "ok"
        })

    } catch (error) {

        console.log(error);

        res.status(400).json({
            ok:false,
            message : error
        })
    }

}

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}